"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyAppointments, confirmAppointment, cancelAppointment } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Appointment } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Lock, Loader2, Plus, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const STATUS_LABELS: Record<Appointment["status"], { label: string; variant: "default" | "success" | "warning" | "error" | "outline" }> = {
  pending: { label: "Pendiente", variant: "warning" },
  confirmed: { label: "Confirmada", variant: "success" },
  cancelled: { label: "Cancelada", variant: "error" },
  completed: { label: "Completada", variant: "success" },
};

export default function MisCitasPage() {
  const { user, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ["appointments", "my"],
    queryFn: getMyAppointments,
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "confirm" | "cancel" }) =>
      action === "confirm" ? confirmAppointment(id) : cancelAppointment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments", "my"] }),
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Inicia sesión</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para ver tus citas.</p>
            <Button asChild><Link href="/login">Ingresar</Link></Button>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis citas</h1>
              <p className="text-gray-600 mt-1">Hola, {user.name.split(" ")[0]}. Aquí están tus citas de donación.</p>
            </div>
            <Button asChild>
              <Link href="/donar/agendar">
                <Plus className="h-4 w-4 mr-2" /> Nueva cita
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </div>
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appt) => {
                const { label, variant } = STATUS_LABELS[appt.status];
                return (
                  <Card key={appt.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(appt.scheduledAt), "EEEE, d 'de' MMMM yyyy", { locale: es })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{format(new Date(appt.scheduledAt), "HH:mm", { locale: es })} hrs</span>
                          </div>
                          {appt.notes && <p className="text-sm text-gray-600 mt-1">{appt.notes}</p>}
                        </div>
                        <Badge variant={variant}>{label}</Badge>
                      </div>
                      {appt.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-600 hover:bg-green-50"
                            disabled={mutation.isPending}
                            onClick={() => mutation.mutate({ id: appt.id, action: "confirm" })}
                          >
                            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                            Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            disabled={mutation.isPending}
                            onClick={() => mutation.mutate({ id: appt.id, action: "cancel" })}
                          >
                            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">No tienes citas agendadas aún.</p>
              <Button asChild>
                <Link href="/donar/agendar">Agendar mi primera cita</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
