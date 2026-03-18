import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, Clock, CheckCircle, User, Phone, AlertCircle } from "lucide-react";

export default function CentrosPanel() {
  const citasHoy = [
    {
      id: "DON-2026-001234",
      hora: "10:00 AM",
      donante: "María Rodríguez",
      telefono: "+57 300 123 4567",
      estado: "Agendada",
      notas: "Primera donación, preguntar sobre largo final deseado"
    },
    {
      id: "DON-2026-001235",
      hora: "11:30 AM",
      donante: "Ana Martínez",
      telefono: "+57 301 234 5678",
      estado: "Confirmada",
      notas: ""
    },
    {
      id: "DON-2026-001236",
      hora: "02:00 PM",
      donante: "Camila López",
      telefono: "+57 302 345 6789",
      estado: "Agendada",
      notas: "Cabello rizado, 25 cm aproximadamente"
    }
  ];

  const citasSemana = [
    {
      fecha: "28 Feb",
      hora: "09:00 AM",
      donante: "Laura Gómez",
      estado: "Agendada"
    },
    {
      fecha: "28 Feb",
      hora: "03:00 PM",
      donante: "Sofía Castro",
      estado: "Agendada"
    },
    {
      fecha: "1 Mar",
      hora: "10:00 AM",
      donante: "Daniela Ruiz",
      estado: "Agendada"
    },
    {
      fecha: "1 Mar",
      hora: "11:00 AM",
      donante: "Valentina Pérez",
      estado: "Agendada"
    },
    {
      fecha: "3 Mar",
      hora: "02:00 PM",
      donante: "Isabella Torres",
      estado: "Agendada"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Panel de gestión</h1>
              <p className="text-gray-600">Estética Bella - Chapinero</p>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-2">
                ✓ Centro Verificado
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Hoy: Viernes, 27 de febrero 2026</p>
              <p className="text-sm text-gray-600">Hora: 9:45 AM</p>
            </div>
          </div>

          <PageInfo 
            title="Para Centros - Panel"
            description="Esta es tu herramienta de gestión diaria. Aquí puedes ver las citas programadas para hoy y la semana, confirmar donaciones completadas y añadir observaciones importantes. Recuerda que tu confirmación oficial es la que valida cada donación en el sistema y permite al donante ver el estado 'Confirmada'."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <Tabs defaultValue="hoy" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hoy">Citas de hoy (3)</TabsTrigger>
                  <TabsTrigger value="semana">Esta semana (5)</TabsTrigger>
                </TabsList>

                {/* Citas de hoy */}
                <TabsContent value="hoy" className="space-y-4 mt-6">
                  {citasHoy.map((cita, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Clock className="size-5 text-pink-600" />
                              <span className="font-semibold text-lg">{cita.hora}</span>
                              <Badge 
                                variant="outline"
                                className={
                                  cita.estado === "Confirmada" 
                                    ? "bg-green-100 text-green-700 border-green-300" 
                                    : "bg-blue-100 text-blue-700 border-blue-300"
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

                        {cita.estado === "Agendada" && (
                          <div className="space-y-3 pt-4 border-t">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Observaciones del corte</label>
                              <Textarea 
                                placeholder="Ej: Se cortaron 22 cm, cabello en excelente estado, sin puntas abiertas..."
                                rows={2}
                                className="text-sm"
                              />
                            </div>

                            <div className="flex gap-3">
                              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                <CheckCircle className="mr-2 size-4" />
                                Confirmar donación
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Cancelar cita
                              </Button>
                            </div>
                          </div>
                        )}

                        {cita.estado === "Confirmada" && (
                          <div className="pt-4 border-t">
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div className="text-sm text-green-900">
                                <strong>Donación confirmada</strong>
                                <p className="mt-1">Esta donación ya fue validada y el donante ha sido notificado.</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Citas de la semana */}
                <TabsContent value="semana" className="mt-6">
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donante</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {citasSemana.map((cita, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">{cita.fecha}</td>
                                <td className="px-6 py-4 text-sm">{cita.hora}</td>
                                <td className="px-6 py-4 text-sm">{cita.donante}</td>
                                <td className="px-6 py-4 text-sm">
                                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                                    {cita.estado}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  <Button size="sm" variant="outline">
                                    Ver detalles
                                  </Button>
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
                <CardHeader>
                  <CardTitle className="text-lg">Cómo confirmar una donación</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>Recibe al donante y verifica que cumpla con los requisitos del checklist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>Realiza el corte siguiendo la guía estandarizada de DonaCabello</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Empaca el cabello correctamente (trenza firme, bolsa sellada, etiqueta con datos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">4.</span>
                      <span>Añade observaciones importantes en el campo de texto (largo cortado, estado del cabello)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">5.</span>
                      <span>Haz clic en <strong>"Confirmar donación"</strong> - esto notificará al donante y actualizará el sistema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">6.</span>
                      <span>Almacena el cabello en el lugar designado hasta la recolección programada</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estadísticas del mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Donaciones confirmadas</p>
                      <p className="text-3xl font-bold text-pink-600">24</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Citas pendientes</p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total febrero 2026</p>
                      <p className="text-2xl font-bold">32</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pink-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="text-lg">Próxima recolección</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Lunes, 2 de marzo</p>
                      <p className="text-sm text-gray-600 mt-1">10:00 AM - 11:00 AM</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Donaciones listas: 18 paquetes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recordatorios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-pink-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Verifica el inventario de bolsas de empaque</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-pink-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Confirma todas las donaciones del día antes de las 6 PM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-pink-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Contacta donantes 24h antes de su cita</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">
                    ¿Tienes problemas técnicos o dudas?
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Email: centros@donacabello.co</p>
                    <p className="font-medium">WhatsApp: +57 300 123 4567</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Ver guía completa
                  </Button>
                </CardContent>
              </Card>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-purple-900 leading-relaxed">
                  <strong>Recordatorio de privacidad:</strong> No recolectamos datos de salud. 
                  Solo registra información relacionada con el estado del cabello donado, nunca 
                  información médica de los donantes.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
