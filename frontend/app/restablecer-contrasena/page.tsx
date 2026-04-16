"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    newPassword: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof schema>;

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    if (!token) {
      setError("Enlace inválido. Solicita uno nuevo.");
      return;
    }
    try {
      await api.post("/auth/reset-password", { token, newPassword: data.newPassword });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "El enlace es inválido o ha expirado.");
    }
  };

  if (!token) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">Enlace inválido</h3>
        <p className="text-sm text-gray-500 mb-4">Este enlace de recuperación no es válido.</p>
        <Button asChild><Link href="/olvide-contrasena">Solicitar nuevo enlace</Link></Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-4">
        <CheckCircle className="h-14 w-14 text-green-500 mx-auto" />
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">¡Contraseña actualizada!</h3>
          <p className="text-sm text-gray-600 mt-1">Tu contraseña fue restablecida exitosamente. Redirigiendo al inicio de sesión…</p>
        </div>
        <Button asChild className="w-full"><Link href="/login">Ir a iniciar sesión</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      {error && (
        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="newPassword">Nueva contraseña</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPwd ? "text" : "password"}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              className="pr-10"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            type={showPwd ? "text" : "password"}
            placeholder="Repite la nueva contraseña"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Restablecer contraseña
        </Button>
      </form>
    </div>
  );
}

export default function RestablecerContrasenaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-rose-600 font-bold text-xl">
            <Heart className="h-6 w-6 fill-rose-600" /> DonaCabello
          </Link>
          <h1 className="text-2xl font-bold mt-4 text-gray-900">Restablecer contraseña</h1>
          <p className="text-gray-500 mt-1 text-sm">Ingresa tu nueva contraseña.</p>
        </div>

        <Suspense fallback={
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
          </div>
        }>
          <ResetForm />
        </Suspense>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/login" className="hover:text-gray-700">← Volver a iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
