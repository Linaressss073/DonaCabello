"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Loader2, AlertCircle } from "lucide-react";
import { register as registerUser } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  role: z.enum(["donor", "center"]),
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "donor" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await registerUser(data);
      signIn(res.access_token, res.user);
      router.push(res.user.role === "center" ? "/centros/registro" : "/");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-rose-600 font-bold text-xl">
            <Heart className="h-6 w-6 fill-rose-600" /> DonaCabello
          </Link>
          <h1 className="text-2xl font-bold mt-4 text-gray-900">Crea tu cuenta</h1>
          <p className="text-gray-500 mt-1">¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-rose-600 hover:underline font-medium">Inicia sesión</Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role selector */}
            <div className="space-y-2">
              <Label>Tipo de cuenta</Label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: "donor", label: "Donante", icon: "💇", desc: "Quiero donar mi cabello" },
                  { value: "center", label: "Centro aliado", icon: "🏠", desc: "Soy un centro estético" },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={`relative flex flex-col items-center gap-1 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      selectedRole === opt.value
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input type="radio" value={opt.value} {...register("role")} className="sr-only" />
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-medium text-sm">{opt.label}</span>
                    <span className="text-xs text-gray-500 text-center">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Tu nombre" {...register("name")} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Mínimo 6 caracteres" {...register("password")} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Crear cuenta
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/" className="hover:text-gray-700">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
