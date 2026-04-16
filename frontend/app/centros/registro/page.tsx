"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerCenter } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, AlertCircle, Lock } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  address: z.string().min(5, "Dirección requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  phone: z.string().min(7, "Teléfono requerido"),
  email: z.string().email("Email inválido"),
  description: z.string().min(20, "Descripción mínimo 20 caracteres"),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

export default function CentrosRegistroPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await registerCenter(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al registrar el centro");
    }
  };

  if (!authLoading && (!user || user.role !== "center")) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Acceso restringido</h2>
            <p className="text-gray-600 mb-6">
              {!user ? "Inicia sesión con una cuenta de centro aliado." : "Esta sección es solo para cuentas de tipo Centro aliado."}
            </p>
            {!user && <Button asChild><Link href="/login">Ingresar</Link></Button>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Centro registrado!</h2>
            <p className="text-gray-600 mb-6">Tu solicitud fue enviada. El equipo de DonaCabello verificará tu centro y te notificará pronto.</p>
            <Button asChild><Link href="/panel">Ver mi panel</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Registrar centro aliado</h1>
            <p className="text-gray-600 mt-1">Completa la información de tu centro. Será revisado antes de publicarse.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Información del centro</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nombre del centro</Label>
                  <Input id="name" placeholder="Ej: Estudio de belleza María" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" placeholder="Bogotá" {...register("city")} />
                    {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+57 300 000 0000" {...register("phone")} />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" placeholder="Calle 10 # 20-30" {...register("address")} />
                  {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Correo electrónico del centro</Label>
                  <Input id="email" type="email" placeholder="centro@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Cuéntanos sobre tu centro..." rows={4} {...register("description")} />
                  {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Ubicación en mapa (opcional)</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="latitude">Latitud</Label>
                  <Input id="latitude" type="number" step="any" placeholder="4.7110" {...register("latitude")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="longitude">Longitud</Label>
                  <Input id="longitude" type="number" step="any" placeholder="-74.0721" {...register("longitude")} />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Enviar solicitud de registro
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
