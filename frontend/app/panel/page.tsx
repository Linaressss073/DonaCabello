"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyCenters, getCenterAppointments } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Center, Appointment } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Plus, Loader2, MapPin, Phone, Mail, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function PanelPage() {
  const { user, isLoading: authLoading } = useAuth();

  const { data: centers, isLoading } = useQuery<Center[]>({
    queryKey: ["centers", "my"],
    queryFn: getMyCenters,
    enabled: !!user && user.role === "center",
  });

  const { data: appointments, isLoading: apptLoading } = useQuery<Appointment[]>({
    queryKey: ["appointments", "center"],
    queryFn: getCenterAppointments,
    enabled: !!user && user.role === "center",
  });

  const STATUS_APPT: Record<Appointment["status"], { label: string; variant: "default" | "success" | "warning" | "error" | "outline" }> = {
    pending: { label: "Pendiente", variant: "warning" },
    confirmed: { label: "Confirmada", variant: "success" },
    cancelled: { label: "Cancelada", variant: "error" },
    completed: { label: "Completada", variant: "success" },
  };

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

  if (!user || user.role !== "center") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Acceso restringido</h2>
            <p className="text-gray-600 mb-6">Este panel es solo para centros aliados registrados.</p>
            {!user && <Button asChild><Link href="/login">Ingresar</Link></Button>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const STATUS_MAP: Record<Center["status"], { label: string; variant: "success" | "warning" | "error" }> = {
    verified: { label: "Verificado", variant: "success" },
    pending: { label: "En revisión", variant: "warning" },
    rejected: { label: "Rechazado", variant: "error" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de control</h1>
              <p className="text-gray-600 mt-1">Hola, {user.name.split(" ")[0]}. Gestiona tu centro aliado.</p>
            </div>
            <Button asChild>
              <Link href="/centros/registro">
                <Plus className="h-4 w-4 mr-2" /> Registrar centro
              </Link>
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis centros</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)}
            </div>
          ) : centers && centers.length > 0 ? (
            <div className="space-y-4">
              {centers.map((center) => {
                const { label, variant } = STATUS_MAP[center.status];
                return (
                  <Card key={center.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{center.name}</CardTitle>
                        <Badge variant={variant}>{label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{center.address}, {center.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{center.email}</span>
                      </div>
                      {center.description && (
                        <p className="text-gray-500 pt-1">{center.description}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <MapPin className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Aún no tienes centros registrados.</p>
              <Button asChild>
                <Link href="/centros/registro">Registrar mi centro</Link>
              </Button>
            </div>
          )}

          {/* Citas recibidas */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Citas recibidas</h2>
            {apptLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
              </div>
            ) : appointments && appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((appt) => {
                  const { label, variant } = STATUS_APPT[appt.status];
                  return (
                    <Card key={appt.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{format(new Date(appt.scheduledAt), "EEEE, d 'de' MMMM yyyy", { locale: es })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{format(new Date(appt.scheduledAt), "HH:mm", { locale: es })} hrs</span>
                            </div>
                            {appt.notes && <p className="text-xs text-gray-500">{appt.notes}</p>}
                          </div>
                          <Badge variant={variant}>{label}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <Calendar className="h-10 w-10 mx-auto mb-3 text-gray-200" />
                <p>Aún no hay citas para tus centros.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
