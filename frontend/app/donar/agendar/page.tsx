"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCenters, createAppointment } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Center } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, CheckCircle, Loader2, AlertCircle, Lock } from "lucide-react";

const schema = z.object({
  centerId: z.string().min(1, "Selecciona un centro"),
  scheduledAt: z.string().min(1, "Selecciona una fecha y hora"),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

function AgendarForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { data: centers, isLoading: centersLoading } = useQuery<Center[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const centerId = searchParams.get("centerId");
    if (centerId) setValue("centerId", centerId);
  }, [searchParams, setValue]);

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await createAppointment(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al agendar la cita");
    }
  };

  if (authLoading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Inicia sesión para continuar</h2>
          <p className="text-gray-600 mb-6">Necesitas una cuenta para agendar tu cita de donación.</p>
          <div className="flex gap-3 justify-center">
            <Button asChild><Link href="/login">Ingresar</Link></Button>
            <Button variant="outline" asChild><Link href="/registro">Registrarse</Link></Button>
          </div>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Cita agendada!</h2>
          <p className="text-gray-600 mb-6">Tu cita fue registrada exitosamente. El centro se pondrá en contacto contigo para confirmar.</p>
          <div className="flex gap-3 justify-center">
            <Button asChild><Link href="/mis-citas">Ver mis citas</Link></Button>
            <Button variant="outline" asChild><Link href="/">Volver al inicio</Link></Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Agendar cita de donación</h1>
          <p className="text-gray-600 mt-1">Elige un centro aliado y selecciona tu fecha preferida.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Centro aliado</CardTitle></CardHeader>
            <CardContent>
              {centersLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="space-y-2">
                  {(centers ?? []).filter((c) => c.status === "verified").map((center) => (
                    <label key={center.id} className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-rose-300 transition-colors has-[:checked]:border-rose-600 has-[:checked]:bg-rose-50">
                      <input type="radio" value={center.id} {...register("centerId")} className="mt-1 accent-rose-600" />
                      <div>
                        <p className="font-medium text-sm">{center.name}</p>
                        <p className="text-xs text-gray-500">{center.address}, {center.city}</p>
                      </div>
                    </label>
                  ))}
                  {(centers ?? []).filter((c) => c.status === "verified").length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No hay centros verificados disponibles aún.</p>
                  )}
                </div>
              )}
              {errors.centerId && <p className="text-xs text-red-500 mt-2">{errors.centerId.message}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Fecha y hora</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="scheduledAt">Fecha y hora de la cita</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  {...register("scheduledAt")}
                  min={new Date().toISOString().slice(0, 16)}
                />
                {errors.scheduledAt && <p className="text-xs text-red-500">{errors.scheduledAt.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="¿Tienes alguna pregunta o comentario para el centro?"
                  {...register("notes")}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Calendar className="mr-2 h-4 w-4" />}
            Confirmar cita
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function AgendarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
        </main>
      }>
        <AgendarForm />
      </Suspense>
      <Footer />
    </div>
  );
}
