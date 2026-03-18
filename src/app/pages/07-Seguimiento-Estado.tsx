import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, FileCheck } from "lucide-react";

export default function SeguimientoEstado() {
  const cita = {
    id: "DON-2026-001234",
    fecha: "5 de marzo, 2026",
    hora: "10:00 AM",
    centro: "Estética Bella",
    direccion: "Cra 7 #63-44, Chapinero",
    telefono: "+57 300 123 4567",
    estado: "Realizada" // Agendada, Realizada, Confirmada
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Seguimiento de mi donación</h1>
          <p className="text-gray-600 mb-8">
            Consulta el estado actual de tu cita y donación en tiempo real.
          </p>

          <PageInfo 
            title="Seguimiento"
            description="Aquí puedes ver el estado de tus citas en tiempo real siguiendo tres fases: Agendada (cita reservada), Realizada (asististe y completaste el corte) y Confirmada (el centro aliado validó oficialmente tu donación). No recolectamos datos de salud."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timeline de estados */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado de tu donación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Línea de conexión */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200"></div>

                    {/* Estados */}
                    <div className="space-y-8">
                      {/* Agendada */}
                      <div className="relative flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 border-4 border-white rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                          <CheckCircle className="size-6 text-green-600" />
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-semibold text-lg mb-1">Agendada</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Tu cita ha sido reservada exitosamente
                          </p>
                          <p className="text-xs text-gray-500">
                            Completado el 25 de febrero, 2026 a las 3:45 PM
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Completado
                        </Badge>
                      </div>

                      {/* Realizada */}
                      <div className="relative flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 border-4 border-white rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                          <CheckCircle className="size-6 text-green-600" />
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-semibold text-lg mb-1">Realizada</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Asististe a tu cita y completaste la donación
                          </p>
                          <p className="text-xs text-gray-500">
                            Completado el 5 de marzo, 2026 a las 10:30 AM
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Completado
                        </Badge>
                      </div>

                      {/* Confirmada */}
                      <div className="relative flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-100 border-4 border-white rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                          <Clock className="size-6 text-yellow-600" />
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-semibold text-lg mb-1">Confirmada</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            El centro aliado valida oficialmente tu donación
                          </p>
                          <p className="text-xs text-gray-500">
                            En proceso - Validación en curso
                          </p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          Pendiente
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-900">
                        <strong>Estado actual: Realizada</strong>
                        <p className="mt-1">
                          El centro aliado está validando tu donación. Este proceso puede tomar hasta 24-48 horas. 
                          Una vez confirmada, recibirás una notificación por email.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Datos de la cita */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalles de tu cita</CardTitle>
                </CardHeader>
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
                        <p className="font-medium">{cita.centro}</p>
                        <p className="text-sm text-gray-600">{cita.direccion}</p>
                        <p className="text-sm text-gray-600">{cita.telefono}</p>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-2">
                          ✓ Verificado
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Aviso privacidad */}
              <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <AlertCircle className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-purple-900">
                  <strong>Privacidad y datos de salud:</strong>
                  <p className="mt-1">
                    No recolectamos datos de salud de los donantes. La información que almacenamos se limita 
                    a datos de contacto y estado de la cita. Los centros aliados no comparten información médica 
                    con DonaCabello.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximos pasos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        1
                      </div>
                      <span className="text-gray-600">
                        El centro aliado valida tu donación (24-48h)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        2
                      </div>
                      <span className="text-gray-600">
                        Recibes confirmación por email
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        3
                      </div>
                      <span className="text-gray-600">
                        Tu donación queda registrada en el sistema
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        4
                      </div>
                      <span className="text-gray-600">
                        Puedes descargar tu certificado (si aplica)
                      </span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-pink-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="text-lg">¿Necesitas ayuda?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Si tienes preguntas sobre el estado de tu donación, contáctanos:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Email: info@donacabello.co</p>
                    <p className="font-medium">WhatsApp: +57 300 123 4567</p>
                    <p className="text-xs text-gray-600 mt-3">
                      Horario de atención: Lun-Vie 9AM-6PM
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historial</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Esta es tu primera donación
                  </p>
                  <div className="text-xs text-gray-500">
                    <p>Total de donaciones: 1</p>
                    <p>En proceso de confirmación: 1</p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
