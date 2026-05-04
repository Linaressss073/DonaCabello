"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Calendar, CheckCircle, Loader2, AlertCircle, Lock,
  MapPin, Phone, Search, Clock, StickyNote, ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// ── Time slots ───────────────────────────────────────────────
const TIME_SLOTS: string[] = [];
for (let h = 8; h <= 17; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 17) TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

// ── Schema ───────────────────────────────────────────────────
const schema = z.object({
  centerId: z.string().min(1, "Selecciona un centro aliado"),
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.string().min(1, "Selecciona una hora"),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

// ── Helpers ──────────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Centro" },
    { n: 2, label: "Fecha" },
    { n: 3, label: "Confirmar" },
  ];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                s.n < step
                  ? "bg-rose-600 text-white"
                  : s.n === step
                  ? "bg-rose-600 text-white ring-4 ring-rose-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {s.n < step ? <CheckCircle className="h-4 w-4" /> : s.n}
            </div>
            <span className={`text-xs mt-1 font-medium ${s.n === step ? "text-rose-600" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-16 sm:w-24 mx-1 mb-4 transition-colors ${s.n < step ? "bg-rose-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main form ────────────────────────────────────────────────
function AgendarForm() {
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [search, setSearch] = useState("");

  const { data: centers, isLoading: centersLoading } = useQuery<Center[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [watchCenterId, watchDate, watchTime, watchNotes] = useWatch({
    control,
    name: ["centerId", "date", "time", "notes"],
  });

  useEffect(() => {
    const centerId = searchParams.get("centerId");
    if (centerId) setValue("centerId", centerId);
  }, [searchParams, setValue]);

  const verified = (centers ?? []).filter((c) => c.status === "verified");
  const filtered = verified.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );
  const selectedCenter = verified.find((c) => c.id === watchCenterId);

  // derive current step for indicator
  const step: 1 | 2 | 3 = !watchCenterId ? 1 : !watchDate || !watchTime ? 2 : 3;

  const onSubmit = async (data: FormData) => {
    setSubmitError("");
    try {
      await createAppointment({
        centerId: data.centerId,
        scheduledAt: `${data.date}T${data.time}:00`,
        notes: data.notes,
      });
      setSuccess(true);
    } catch (err: any) {
      setSubmitError(err?.response?.data?.message ?? "Error al agendar la cita. Inténtalo de nuevo.");
    }
  };

  // ── Auth states ──
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
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
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

  // ── Success ──
  if (success) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">¡Cita agendada!</h2>
          <p className="text-gray-600 mb-2">
            Tu cita fue registrada exitosamente.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            El centro se pondrá en contacto contigo para confirmar la cita.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/mis-citas">Ver mis citas</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // ── Form ──
  return (
    <main className="flex-1 bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Agendar cita de donación</h1>
          <p className="text-gray-500 mt-1 text-sm">Completa los pasos para reservar tu lugar.</p>
        </div>

        <StepIndicator step={step} />

        {submitError && (
          <div className="flex items-start gap-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* ── Step 1: Centro ── */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
                <MapPin className="h-3.5 w-3.5 text-rose-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Centro aliado</h2>
              {selectedCenter && (
                <Badge variant="success" className="ml-auto text-xs">Seleccionado</Badge>
              )}
            </div>

            <div className="p-4">
              {centersLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                </div>
              ) : verified.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">No hay centros disponibles</p>
                  <p className="text-xs text-gray-400 mb-4">Aún no hay centros aliados verificados en la plataforma.</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/centros">Ver todos los centros</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {verified.length > 3 && (
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por nombre o ciudad..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 text-sm"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    {filtered.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">Sin resultados para &ldquo;{search}&rdquo;</p>
                    ) : (
                      filtered.map((center) => (
                        <label
                          key={center.id}
                          className="flex items-start gap-3 p-3.5 border-2 rounded-xl cursor-pointer hover:border-rose-300 hover:bg-rose-50/50 transition-all has-[:checked]:border-rose-600 has-[:checked]:bg-rose-50"
                        >
                          <input
                            type="radio"
                            value={center.id}
                            {...register("centerId")}
                            className="mt-1 accent-rose-600 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-sm text-gray-900">{center.name}</p>
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                              <p className="text-xs text-gray-500 truncate">{center.address}, {center.city}</p>
                            </div>
                            {center.phone && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <Phone className="h-3 w-3 text-gray-400 shrink-0" />
                                <p className="text-xs text-gray-500">{center.phone}</p>
                              </div>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-300 mt-1 shrink-0" />
                        </label>
                      ))
                    )}
                  </div>
                </>
              )}

              {errors.centerId && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.centerId.message}
                </p>
              )}
            </div>
          </section>

          {/* ── Step 2: Fecha y hora ── */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Fecha y hora</h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-sm">Fecha de la cita</Label>
                  <Input
                    id="date"
                    type="date"
                    min={today}
                    {...register("date")}
                    className="text-sm"
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="time" className="text-sm">Hora de la cita</Label>
                  <select
                    id="time"
                    {...register("time")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Selecciona una hora</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t} hrs</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2.5">
                <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-700">Los centros atienden de lunes a sábado, de 8:00 a 17:30 hrs.</p>
              </div>
            </div>
          </section>

          {/* ── Step 3: Notas ── */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                <StickyNote className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Notas adicionales</h2>
              <span className="ml-auto text-xs text-gray-400">Opcional</span>
            </div>
            <div className="p-4">
              <Textarea
                id="notes"
                placeholder="¿Tienes alguna pregunta, condición de salud o comentario para el centro?"
                {...register("notes")}
                rows={3}
                className="text-sm resize-none"
              />
            </div>
          </section>

          {/* ── Summary ── */}
          {selectedCenter && watchDate && watchTime && (
            <section className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3">
              <p className="text-sm font-semibold text-rose-800">Resumen de tu cita</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
                  <span className="font-medium">{selectedCenter.name}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-xs">{selectedCenter.city}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>
                    {format(new Date(`${watchDate}T${watchTime}`), "EEEE d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{watchTime} hrs</span>
                </div>
                {watchNotes && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <StickyNote className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-xs italic">{watchNotes}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || verified.length === 0}
          >
            {isSubmitting
              ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Agendando...</>
              : <><Calendar className="mr-2 h-4 w-4" /> Confirmar cita</>
            }
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
