import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { LoadingCards } from "../components/LoadingCards";
import { AlertBanner } from "../components/AlertBanner";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Clock, CheckCircle, FileCheck } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getMyAppointments } from "../../api";
import type { Appointment } from "../../types";

const STATUS_TIMELINE = [
  { key: 'Agendada',   label: 'Agendada',   desc: 'Tu cita ha sido reservada exitosamente' },
  { key: 'Realizada',  label: 'Realizada',  desc: 'Asististe a tu cita y completaste la donación' },
  { key: 'Confirmada', label: 'Confirmada', desc: 'El centro aliado valida oficialmente tu donación' },
] as const;

const STATUS_ORDER = ['Agendada', 'Realizada', 'Confirmada'];

function getStepState(step: string, currentStatus: string) {
  const stepIdx    = STATUS_ORDER.indexOf(step);
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  if (stepIdx < currentIdx)  return 'done';
  if (stepIdx === currentIdx) return 'current';
  return 'pending';
}

function AppointmentView({ cita }: { cita: Appointment }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Timeline */}
        <Card>
          <CardHeader><CardTitle>Estado de tu donación</CardTitle></CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />
              <div className="space-y-8">
                {STATUS_TIMELINE.map(({ key, label, desc }) => {
                  const state = getStepState(key, cita.estado);
                  const isDone    = state === 'done';
                  const isCurrent = state === 'current';
                  const isPending = state === 'pending';
                  return (
                    <div key={key} className="relative flex items-start gap-4">
                      <div className={`w-12 h-12 border-4 border-white rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                        isDone || isCurrent ? 'bg-green-100' : isPending && key === 'Confirmada' && cita.estado === 'Realizada' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {isDone || isCurrent
                          ? <CheckCircle className="size-6 text-green-600" />
                          : <Clock className={`size-6 ${key === 'Confirmada' && cita.estado === 'Realizada' ? 'text-yellow-600' : 'text-gray-400'}`} />
                        }
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="font-semibold text-lg mb-1">{label}</h3>
                        <p className="text-sm text-gray-600 mb-2">{desc}</p>
                        {(isDone || isCurrent) && (
                          <p className="text-xs text-gray-500">Completado</p>
                        )}
                        {isPending && key === 'Confirmada' && cita.estado === 'Realizada' && (
                          <p className="text-xs text-gray-500">En proceso — Validación en curso</p>
                        )}
                      </div>
                      <Badge className={
                        isDone || isCurrent
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                      }>
                        {isDone || isCurrent ? 'Completado' : 'Pendiente'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {cita.estado === 'Realizada' && (
              <div className="mt-6 pt-6 border-t">
                <AlertBanner variant="info">
                  <strong>Estado actual: Realizada</strong>
                  <p className="mt-1">
                    El centro aliado está validando tu donación. Este proceso puede tomar hasta 24-48 horas.
                    Una vez confirmada, recibirás una notificación por email.
                  </p>
                </AlertBanner>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detalles */}
        <Card>
          <CardHeader><CardTitle>Detalles de tu cita</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileCheck className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">ID de donación</p>
                  <p className="font-medium">{cita.id}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha y hora</p>
                  <p className="font-medium">{cita.fecha} a las {cita.hora}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Centro aliado</p>
                  <p className="font-medium">{cita.centro.nombre}</p>
                  <p className="text-sm text-gray-600">{cita.centro.direccion}</p>
                  <p className="text-sm text-gray-600">{cita.centro.telefono}</p>
                  <VerifiedBadge className="mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertBanner variant="privacy">
          <strong>Privacidad y datos de salud:</strong>
          <p className="mt-1">
            No recolectamos datos de salud de los donantes. La información se limita a datos de contacto
            y estado de la cita.
          </p>
        </AlertBanner>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Próximos pasos</CardTitle></CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              {[
                'El centro aliado valida tu donación (24-48h)',
                'Recibes confirmación por email',
                'Tu donación queda registrada en el sistema',
                'Puedes descargar tu certificado (si aplica)',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="bg-pink-50 border-pink-200">
          <CardHeader><CardTitle className="text-lg">¿Necesitas ayuda?</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">Si tienes preguntas sobre el estado de tu donación:</p>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Email: info@donacabello.co</p>
              <p className="font-medium">WhatsApp: +57 300 123 4567</p>
              <p className="text-xs text-gray-600 mt-3">Horario: Lun-Vie 9AM-6PM</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Historial</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Esta es tu primera donación</p>
            <div className="text-xs text-gray-500">
              <p>Total de donaciones: 1</p>
              <p>En proceso de confirmación: 1</p>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

export default function SeguimientoEstado() {
  const { data: appointments, loading, error } = useApi(() => getMyAppointments(), []);

  const cita = appointments?.[0] ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Seguimiento de mi donación</h1>
          <p className="text-gray-600 mb-8">Consulta el estado actual de tu cita y donación en tiempo real.</p>

          <PageInfo
            title="Seguimiento"
            description="Aquí puedes ver el estado de tus citas: Agendada → Realizada → Confirmada. No recolectamos datos de salud."
          />

          {loading && <LoadingCards count={2} variant="list" />}

          {error && (
            <AlertBanner variant="error">
              Error al cargar tu seguimiento: {error}
            </AlertBanner>
          )}

          {!loading && !error && !cita && (
            <Card className="bg-gray-50">
              <CardContent className="p-12 text-center">
                <Calendar className="size-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Sin donaciones registradas</h3>
                <p className="text-sm text-gray-600">Aún no tienes citas agendadas.</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && cita && <AppointmentView cita={cita} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
