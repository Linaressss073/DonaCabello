"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCenters, getCampaigns, getMyAppointments, cancelAppointment } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Center, Campaign, Appointment } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar, Clock, Scissors, Heart, MapPin, ArrowRight,
  CheckCircle, XCircle, Users, Loader2, Plus, ChevronRight,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

const IMPACT_STATS = [
  { value: "1,247", label: "Donaciones realizadas", icon: Heart },
  { value: "8,734 cm", label: "Cabello recolectado", icon: Scissors },
  { value: "312", label: "Pelucas entregadas", icon: Users },
  { value: "85", label: "Centros aliados", icon: MapPin },
];

const HOW_STEPS = [
  { n: 1, icon: "💧", title: "Lava y seca tu cabello", desc: "Limpio y completamente seco antes de ir al centro." },
  { n: 2, icon: "💇", title: "Forma la trenza", desc: "El profesional forma una o más trenzas firmes." },
  { n: 3, icon: "✂️", title: "El corte", desc: "Corte por encima de la ligadura, mínimo 20 cm." },
  { n: 4, icon: "📦", title: "Registro", desc: "La trenza se empaca y recibirás tu confirmación." },
];

const STATUS_CONFIG: Record<Appointment["status"], { label: string; variant: "default" | "success" | "warning" | "error" | "outline" }> = {
  pending: { label: "Pendiente", variant: "warning" },
  confirmed: { label: "Confirmada", variant: "success" },
  cancelled: { label: "Cancelada", variant: "error" },
  completed: { label: "Completada", variant: "success" },
};

const MOCK_APPOINTMENTS: (Appointment & { centerName: string })[] = [
  {
    id: "mock-1",
    donorId: "demo",
    centerId: "c1",
    centerName: "Salón Esperanza Bogotá",
    scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "confirmed",
    notes: "Primera donación, muy emocionada",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-2",
    donorId: "demo",
    centerId: "c2",
    centerName: "Centro Capilar Medellín",
    scheduledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed",
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-3",
    donorId: "demo",
    centerId: "c3",
    centerName: "Peluquería Solidaria Cali",
    scheduledAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    notes: "Prefiero la tarde",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function AppointmentCard({
  appt,
  centerName,
  onCancel,
  isCancelling,
}: {
  appt: Appointment;
  centerName: string;
  onCancel?: () => void;
  isCancelling?: boolean;
}) {
  const { label, variant } = STATUS_CONFIG[appt.status];
  const canCancel = appt.status === "pending" || appt.status === "confirmed";

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <p className="font-medium text-sm text-gray-900 truncate">{centerName || "Centro aliado"}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(appt.scheduledAt), "EEEE, d 'de' MMMM yyyy", { locale: es })}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{format(new Date(appt.scheduledAt), "HH:mm", { locale: es })} hrs</span>
            </div>
            {appt.notes && <p className="text-xs text-gray-500 italic mt-1">"{appt.notes}"</p>}
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge variant={variant}>{label}</Badge>
            {canCancel && onCancel && (
              <button
                onClick={onCancel}
                disabled={isCancelling}
                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 flex items-center gap-1"
              >
                {isCancelling ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3 w-3" />}
                Cancelar
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignMiniCard({ campaign }: { campaign: Campaign }) {
  const pct = campaign.goal > 0 ? Math.min(100, Math.round((campaign.current / campaign.goal) * 100)) : 0;
  return (
    <Card className="overflow-hidden">
      {campaign.imageUrl && (
        <div className="h-32 bg-rose-100 overflow-hidden">
          <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-full object-cover" />
        </div>
      )}
      {!campaign.imageUrl && <div className="h-32 bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center"><Heart className="h-10 w-10 text-rose-300" /></div>}
      <CardContent className="p-4 space-y-2">
        <p className="font-semibold text-sm text-gray-900 line-clamp-1">{campaign.title}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{campaign.description}</p>
        <div className="space-y-1">
          <Progress value={pct} className="h-1.5" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{campaign.current} de {campaign.goal} donaciones</span>
            <span className="font-medium text-rose-600">{pct}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DonarPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState("");

  const { data: appointments, isLoading: apptLoading } = useQuery<Appointment[]>({
    queryKey: ["appointments", "my"],
    queryFn: getMyAppointments,
    enabled: !!user && user.role === "donor",
  });

  const { data: centers } = useQuery<Center[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => cancelAppointment(id),
    onMutate: (id) => {
      setCancellingId(id);
      setCancelError("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments", "my"] });
      setCancellingId(null);
    },
    onError: (err: any) => {
      setCancelError(err?.response?.data?.message ?? "Error al cancelar la cita");
      setCancellingId(null);
    },
  });

  const centersMap = Object.fromEntries((centers ?? []).map((c) => [c.id, c.name]));
  const activeCampaigns = (campaigns ?? []).filter((c) => c.active).slice(0, 3);
  const upcomingAppts = (appointments ?? [])
    .filter((a) => a.status !== "cancelled")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5);

  const showMockData = !user;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-600 to-rose-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-rose-200 text-sm font-semibold uppercase tracking-wide">Donación de cabello</span>
              <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
                Tu cabello puede cambiar una vida
              </h1>
              <p className="text-rose-100 text-lg mb-8">
                Cada trenza donada se convierte en una peluca para personas con alopecia o en tratamiento oncológico. Un gesto pequeño, un impacto enorme.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-white text-rose-600 hover:bg-rose-50" size="lg" asChild>
                  <Link href="/donar/agendar">
                    <Calendar className="mr-2 h-4 w-4" /> Agendar mi cita
                  </Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg" asChild>
                  <Link href="/donar/guia">Cómo funciona</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact stats */}
        <section className="border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {IMPACT_STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-5 w-5 text-rose-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Mis donaciones (solo donors autenticados) */}
          {user && user.role === "donor" && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Mis donaciones</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Hola, {user.name.split(" ")[0]}. Aquí están tus citas.</p>
                </div>
                <Button size="sm" asChild>
                  <Link href="/donar/agendar">
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Nueva cita
                  </Link>
                </Button>
              </div>

              {cancelError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {cancelError}
                </div>
              )}

              {apptLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
                </div>
              ) : upcomingAppts.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppts.map((appt) => (
                    <AppointmentCard
                      key={appt.id}
                      appt={appt}
                      centerName={centersMap[appt.centerId] ?? "Centro aliado"}
                      onCancel={() => cancelMutation.mutate(appt.id)}
                      isCancelling={cancellingId === appt.id}
                    />
                  ))}
                  <div className="text-center pt-2">
                    <Link href="/mis-citas" className="text-sm text-rose-600 hover:underline flex items-center justify-center gap-1">
                      Ver todas mis citas <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No tienes citas agendadas aún.</p>
                    <Button asChild size="sm">
                      <Link href="/donar/agendar">Agendar mi primera cita</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          )}

          {/* Ejemplo de citas (usuarios no autenticados) */}
          {showMockData && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ejemplo: historial de donaciones</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Inicia sesión para ver y gestionar tus citas reales.</p>
                </div>
                <Button size="sm" asChild variant="outline">
                  <Link href="/login">Ingresar</Link>
                </Button>
              </div>
              <div className="space-y-3 opacity-80">
                {MOCK_APPOINTMENTS.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appt={appt}
                    centerName={appt.centerName}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Campañas activas */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Campañas activas</h2>
              <Link href="/campanas" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
                Ver todas <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {campaignsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-52 w-full rounded-xl" />)}
              </div>
            ) : activeCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeCampaigns.map((c) => <CampaignMiniCard key={c.id} campaign={c} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: "m1", title: "Campaña Primavera 2025", description: "Ayúdanos a reunir 50 donaciones antes del 30 de mayo. Las pelucas se entregarán a niños en tratamiento.", imageUrl: "", centerId: "", startDate: "", endDate: "", goal: 50, current: 34, active: true, createdAt: "", updatedAt: "" },
                  { id: "m2", title: "100 Pelucas para Colombia", description: "Meta nacional: 100 pelucas para pacientes oncológicos en hospitales públicos.", imageUrl: "", centerId: "", startDate: "", endDate: "", goal: 100, current: 67, active: true, createdAt: "", updatedAt: "" },
                  { id: "m3", title: "Donación Día de la Mujer", description: "Campaña especial conmemorando el Día Internacional de la Mujer. ¡Únete!", imageUrl: "", centerId: "", startDate: "", endDate: "", goal: 30, current: 28, active: true, createdAt: "", updatedAt: "" },
                ].map((c) => <CampaignMiniCard key={c.id} campaign={c as Campaign} />)}
              </div>
            )}
          </section>

          {/* Cómo funciona (condensado) */}
          <section className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">¿Cómo donar?</h2>
              <Link href="/donar/guia" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
                Guía completa <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HOW_STEPS.map(({ n, icon, title, desc }) => (
                <div key={n} className="text-center">
                  <div className="w-12 h-12 bg-white border border-rose-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-sm">
                    {icon}
                  </div>
                  <div className="text-xs text-rose-600 font-semibold mb-1">Paso {n}</div>
                  <p className="font-semibold text-sm text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Se acepta
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>Mínimo 20 cm en trenza</li>
                  <li>Cabello limpio y seco</li>
                  <li>Sin decoloración severa</li>
                  <li>Sin tratamientos dañinos</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5" /> No se acepta
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>Menos de 20 cm</li>
                  <li>Cabello húmedo o sucio</li>
                  <li>Permanente reciente</li>
                  <li>Más del 25% de canas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Centros verificados cerca */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Centros aliados verificados</h2>
              <Link href="/centros" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
                Ver mapa <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(centers ?? []).filter((c) => c.status === "verified").slice(0, 3).length > 0
                ? (centers ?? []).filter((c) => c.status === "verified").slice(0, 3).map((center) => (
                    <Card key={center.id} className="hover:border-rose-200 transition-colors">
                      <CardContent className="p-5">
                        <p className="font-semibold text-sm text-gray-900 mb-1">{center.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{center.address}, {center.city}</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full text-xs" asChild>
                          <Link href={`/donar/agendar?centerId=${center.id}`}>
                            Agendar aquí
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                : [
                    { id: "mc1", name: "Salón Esperanza", address: "Cra 15 #45-20", city: "Bogotá" },
                    { id: "mc2", name: "Centro Capilar Medellín", address: "Av. El Poblado #5-60", city: "Medellín" },
                    { id: "mc3", name: "Peluquería Solidaria", address: "Calle 5 #30-10", city: "Cali" },
                  ].map((c) => (
                    <Card key={c.id} className="hover:border-rose-200 transition-colors">
                      <CardContent className="p-5">
                        <p className="font-semibold text-sm text-gray-900 mb-1">{c.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{c.address}, {c.city}</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full text-xs" asChild>
                          <Link href="/donar/agendar">Agendar aquí</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
              }
            </div>
          </section>

          {/* CTA final */}
          <section className="bg-rose-600 text-white rounded-2xl p-10 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-80 fill-white" />
            <h2 className="text-2xl font-bold mb-2">¿Lista para donar?</h2>
            <p className="text-rose-100 mb-6 max-w-md mx-auto">
              Elige un centro aliado verificado, agenda tu cita y transforma tu cabello en esperanza para alguien que lo necesita.
            </p>
            <Button className="bg-white text-rose-600 hover:bg-rose-50" size="lg" asChild>
              <Link href="/donar/agendar">
                Agendar mi cita <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
