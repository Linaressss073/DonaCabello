"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Loader2, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Email inválido"),
});
type FormData = z.infer<typeof schema>;

export default function OlvideContrasenaPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await api.post("/auth/forgot-password", data);
      setSent(true);
    } catch {
      setError("Ocurrió un error. Intenta de nuevo más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-rose-600 font-bold text-xl">
            <Heart className="h-6 w-6 fill-rose-600" /> DonaCabello
          </Link>
          <h1 className="text-2xl font-bold mt-4 text-gray-900">¿Olvidaste tu contraseña?</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Ingresa tu correo y te enviaremos un enlace para restablecerla.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">¡Correo enviado!</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Si <strong>{getValues("email")}</strong> está registrado, recibirás un enlace de recuperación en los próximos minutos.
                </p>
                <p className="text-xs text-gray-400 mt-2">Revisa también tu carpeta de spam.</p>
              </div>
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/login">Volver a iniciar sesión</Link>
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Enviar enlace de recuperación
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/login" className="inline-flex items-center gap-1 hover:text-gray-700 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
