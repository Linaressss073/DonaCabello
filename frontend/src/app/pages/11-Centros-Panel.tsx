import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { AlertBanner } from "../components/AlertBanner";
import { LoadingCards } from "../components/LoadingCards";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, Clock, CheckCircle, User, Phone, AlertCircle } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getCenterPanel, confirmAppointment, cancelAppointment } from "../../api";
import type { PanelAppointment, AppointmentStatus } from "../../types";

function CitaCard({
  cita,
  onConfirm,
  onCancel,
  confirming,
}: {
  cita: PanelAppointment;
  onConfirm: (id: string, observaciones: string) => void;
  onCancel: (id: string) => void;
  confirming: string | null;
}) {
  const [observaciones, setObservaciones] = useState('');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="size-5 text-pink-600" />
              <span className="font-semibold text-lg">{cita.hora}</span>
              <Badge
                variant="outline"
                className={
                  cita.estado === 'Confirmada'
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-blue-100 text-blue-700 border-blue-300'
                }
              >
                {cita.estado}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">ID: {cita.id}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <User className="size-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Donante</p>
              <p className="font-medium">{cita.donante}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="size-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono</p>
              <p className="font-medium">{cita.telefono}</p>
            </div>
          </div>
          {cita.notas && (
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Notas</p>
                <p className="text-sm text-gray-700">{cita.notas}</p>
              </div>
            </div>
          )}
        </div>

        {cita.estado === 'Agendada' && (
          <div className="space-y-3 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Observaciones del corte</label>
              <Textarea
                placeholder="Ej: Se cortaron 22 cm, cabello en excelente estado..."
                rows={2}
                className="text-sm"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={confirming === cita.id}
                onClick={() => onConfirm(cita.id, observaciones)}
              >
                <CheckCircle className="mr-2 size-4" />
                {confirming === cita.id ? 'Confirmando...' : 'Confirmar donación'}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onCancel(cita.id)}
              >
                Cancelar cita
              </Button>
            </div>
          </div>
        )}

        {cita.estado === 'Confirmada' && (
          <div className="pt-4 border-t">
            <AlertBanner variant="success">
              <strong>Donación confirmada</strong>
              <p className="mt-1">Esta donación ya fue validada y el donante ha sido notificado.</p>
            </AlertBanner>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function CentrosPanel() {
  const { data: panel, loading, error } = useApi(() => getCenterPanel(), []);
  const [citasHoy, setCitasHoy] = useState<PanelAppointment[] | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  const displayCitas = citasHoy ?? panel?.citasHoy ?? [];

  async function handleConfirm(id: string, observaciones: string) {
    setConfirming(id);
    try {
      await confirmAppointment(id, { observacionesCorte: observaciones });
      setCitasHoy(
        displayCitas.map((c) =>
          c.id === id ? { ...c, estado: 'Confirmada' as AppointmentStatus } : c
        )
      );
    } finally {
      setConfirming(null);
    }
  }

  async function handleCancel(id: string) {
    await cancelAppointment(id);
    setCitasHoy(displayCitas.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Panel de gestión</h1>
              {panel && (
                <>
                  <p className="text-gray-600">{panel.centro.nombre} — {panel.centro.zona}</p>
                  <VerifiedBadge className="mt-2" />
                </>
              )}
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Hoy: {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <PageInfo
            title="Para Centros - Panel"
            description="Herramienta de gestión diaria. Visualiza citas, confirma donaciones completadas y añade observaciones. Tu confirmación oficial valida cada donación en el sistema."
          />

          {error && (
            <AlertBanner variant="error" className="mb-6">
              Error al cargar el panel: {error}
            </AlertBanner>
          )}

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LoadingCards count={3} variant="list" />
              </div>
            </div>
          ) : panel && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenido principal */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="hoy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="hoy">Citas de hoy ({displayCitas.length})</TabsTrigger>
                    <TabsTrigger value="semana">Esta semana ({panel.citasSemana.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hoy" className="space-y-4 mt-6">
                    {displayCitas.map((cita) => (
                      <CitaCard
                        key={cita.id}
                        cita={cita}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        confirming={confirming}
                      />
                    ))}
                  </TabsContent>

                  <TabsContent value="semana" className="mt-6">
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                              <tr>
                                {['Fecha', 'Hora', 'Donante', 'Estado', 'Acciones'].map((h) => (
                                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {panel.citasSemana.map((cita) => (
                                <tr key={cita.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 text-sm font-medium">{cita.fecha}</td>
                                  <td className="px-6 py-4 text-sm">{cita.hora}</td>
                                  <td className="px-6 py-4 text-sm">{cita.donante}</td>
                                  <td className="px-6 py-4 text-sm">
                                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                                      {cita.estado}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 text-sm">
                                    <Button size="sm" variant="outline">Ver detalles</Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Instrucciones */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader><CardTitle className="text-lg">Cómo confirmar una donación</CardTitle></CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-sm text-gray-700">
                      {[
                        'Recibe al donante y verifica que cumpla con los requisitos del checklist',
                        'Realiza el corte siguiendo la guía estandarizada de DonaCabello',
                        'Empaca el cabello correctamente (trenza firme, bolsa sellada, etiqueta con datos)',
                        'Añade observaciones importantes en el campo de texto',
                        'Haz clic en "Confirmar donación" — esto notificará al donante y actualizará el sistema',
                        'Almacena el cabello en el lugar designado hasta la recolección programada',
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold text-blue-600">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Estadísticas del mes</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Donaciones confirmadas</p>
                        <p className="text-3xl font-bold text-pink-600">{panel.estadisticas.confirmadas}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Citas pendientes</p>
                        <p className="text-2xl font-bold text-blue-600">{panel.estadisticas.pendientes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total del mes</p>
                        <p className="text-2xl font-bold">{panel.estadisticas.totalMes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {panel.proximaRecoleccion && (
                  <Card className="bg-pink-50 border-pink-200">
                    <CardHeader><CardTitle className="text-lg">Próxima recolección</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <Calendar className="size-5 text-pink-600 mt-0.5" />
                        <div>
                          <p className="font-medium">{panel.proximaRecoleccion.fecha}</p>
                          <p className="text-sm text-gray-600 mt-1">{panel.proximaRecoleccion.hora}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Donaciones listas: {panel.proximaRecoleccion.paquetes} paquetes
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader><CardTitle className="text-lg">Recordatorios</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      {[
                        'Verifica el inventario de bolsas de empaque',
                        'Confirma todas las donaciones del día antes de las 6 PM',
                        'Contacta donantes 24h antes de su cita',
                      ].map((r) => (
                        <li key={r} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-pink-600 rounded-full mt-1.5 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Soporte</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">¿Tienes problemas técnicos o dudas?</p>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Email: centros@donacabello.co</p>
                      <p className="font-medium">WhatsApp: +57 300 123 4567</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">Ver guía completa</Button>
                  </CardContent>
                </Card>

                <AlertBanner variant="privacy">
                  <strong>Recordatorio de privacidad:</strong> No recolectamos datos de salud.
                  Solo registra información relacionada con el estado del cabello donado.
                </AlertBanner>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
