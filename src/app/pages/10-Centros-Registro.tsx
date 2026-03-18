import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Building2, AlertCircle, Upload, CheckCircle } from "lucide-react";

export default function CentrosRegistro() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Registrar mi centro</h1>
          <p className="text-gray-600 mb-8">
            Únete a nuestra red de centros aliados verificados y ayuda a más personas a donar cabello.
          </p>

          <PageInfo 
            title="Para Centros - Registro"
            description="Este formulario permite a centros estéticos y salones de belleza registrarse para formar parte de la red de centros aliados de DonaCabello. Una vez enviada la solicitud, nuestro equipo la revisará y asignará la verificación oficial tras validar la documentación y realizar una auditoría inicial."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              {/* Información importante */}
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <strong>Proceso de verificación:</strong>
                    <p className="mt-1">
                      Una vez envíes este formulario, nuestro equipo revisará tu solicitud en un plazo de 3-5 días hábiles. 
                      El badge "Verificado" lo asigna el administrador de DonaCabello después de validar tu documentación 
                      y realizar una visita de inspección inicial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-900">
                    <strong>Beneficios de ser centro aliado:</strong>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      <li>Apareces en nuestra plataforma y mapa de centros</li>
                      <li>Recibes capacitación en la guía estandarizada de corte</li>
                      <li>Acceso al panel para gestionar citas y confirmar donaciones</li>
                      <li>Material de comunicación y señalización oficial</li>
                      <li>Visibilidad en campañas y redes sociales</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="size-6 text-pink-600" />
                    Formulario de registro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    {/* Información del centro */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Información del centro</h3>

                      <div className="space-y-2">
                        <Label htmlFor="nombre-centro">Nombre del centro *</Label>
                        <Input 
                          id="nombre-centro" 
                          placeholder="Ej: Estética Bella"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nit">NIT o RUT *</Label>
                        <Input 
                          id="nit" 
                          placeholder="Ej: 900123456-7"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ciudad-registro">Ciudad *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona ciudad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bogota">Bogotá</SelectItem>
                              <SelectItem value="medellin">Medellín</SelectItem>
                              <SelectItem value="cali">Cali</SelectItem>
                              <SelectItem value="barranquilla">Barranquilla</SelectItem>
                              <SelectItem value="cartagena">Cartagena</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zona-registro">Zona *</Label>
                          <Input 
                            id="zona-registro" 
                            placeholder="Ej: Chapinero, Usaquén"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="direccion-registro">Dirección completa *</Label>
                        <Input 
                          id="direccion-registro" 
                          placeholder="Ej: Cra 7 #63-44"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="barrio">Barrio</Label>
                        <Input 
                          id="barrio" 
                          placeholder="Ej: Chapinero Central"
                        />
                      </div>
                    </div>

                    {/* Horarios */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="font-semibold text-lg">Horarios de atención</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="horario-semana">Lunes a Viernes *</Label>
                          <Input 
                            id="horario-semana" 
                            placeholder="Ej: 9:00 AM - 6:00 PM"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="horario-sabado">Sábado</Label>
                          <Input 
                            id="horario-sabado" 
                            placeholder="Ej: 10:00 AM - 4:00 PM"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="horario-domingo">Domingo</Label>
                        <Input 
                          id="horario-domingo" 
                          placeholder="Cerrado o ingrese horario"
                        />
                      </div>
                    </div>

                    {/* Servicios */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="font-semibold text-lg">Servicios ofrecidos</h3>
                      <p className="text-sm text-gray-600">Selecciona todos los que apliquen</p>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Corte especializado para donación</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Asesoría gratuita pre-donación</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Empaque profesional del cabello</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Certificado de donación</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Atención de donaciones grupales</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Parking disponible</span>
                        </label>
                      </div>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="font-semibold text-lg">Información de contacto</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefono-centro">Teléfono principal *</Label>
                          <Input 
                            id="telefono-centro" 
                            type="tel"
                            placeholder="+57 300 123 4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email-centro">Email *</Label>
                          <Input 
                            id="email-centro" 
                            type="email"
                            placeholder="info@tucentro.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nombre-responsable">Nombre del responsable *</Label>
                        <Input 
                          id="nombre-responsable" 
                          placeholder="Persona de contacto principal"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo del responsable</Label>
                        <Input 
                          id="cargo" 
                          placeholder="Ej: Gerente, Propietario/a"
                        />
                      </div>
                    </div>

                    {/* Documentos */}
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="font-semibold text-lg">Documentación</h3>
                      <p className="text-sm text-gray-600">
                        Sube los documentos requeridos para iniciar el proceso de verificación
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="doc-rut">RUT o Cámara de Comercio *</Label>
                          <div className="flex items-center gap-3">
                            <Input 
                              id="doc-rut" 
                              type="file"
                              accept=".pdf,.jpg,.png"
                              className="flex-1"
                            />
                            <Button type="button" variant="outline" size="sm">
                              <Upload className="size-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">PDF, JPG o PNG - Máx 5MB</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="doc-sanitario">Registro sanitario (si aplica)</Label>
                          <div className="flex items-center gap-3">
                            <Input 
                              id="doc-sanitario" 
                              type="file"
                              accept=".pdf,.jpg,.png"
                              className="flex-1"
                            />
                            <Button type="button" variant="outline" size="sm">
                              <Upload className="size-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">PDF, JPG o PNG - Máx 5MB</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="doc-fotos">Fotos del establecimiento</Label>
                          <div className="flex items-center gap-3">
                            <Input 
                              id="doc-fotos" 
                              type="file"
                              accept=".jpg,.png"
                              multiple
                              className="flex-1"
                            />
                            <Button type="button" variant="outline" size="sm">
                              <Upload className="size-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">JPG o PNG - 2-5 fotos del interior/exterior</p>
                        </div>
                      </div>
                    </div>

                    {/* Notas adicionales */}
                    <div className="space-y-4 pt-6 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="notas-registro">Información adicional</Label>
                        <Textarea 
                          id="notas-registro"
                          placeholder="Cuéntanos por qué quieres ser parte de DonaCabello, experiencia previa con donaciones, o cualquier otra información relevante..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Términos */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <input 
                        type="checkbox" 
                        id="terminos-centro"
                        className="mt-1"
                      />
                      <label htmlFor="terminos-centro" className="text-sm text-gray-700">
                        Acepto los términos y condiciones para centros aliados. Entiendo que 
                        <strong> el badge "Verificado" lo asigna el administrador</strong> después de validar 
                        mi documentación y realizar una auditoría inicial. Me comprometo a seguir la 
                        <strong> guía estandarizada</strong> de DonaCabello para el corte y empaque de donaciones.
                      </label>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
                        <Building2 className="mr-2 size-5" />
                        Enviar solicitud
                      </Button>
                      <Button type="button" variant="outline" className="flex-1">
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Proceso de verificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        1
                      </div>
                      <span className="text-gray-700">
                        Envías el formulario con tu documentación
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        2
                      </div>
                      <span className="text-gray-700">
                        Nuestro equipo revisa tu solicitud (3-5 días hábiles)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        3
                      </div>
                      <span className="text-gray-700">
                        Coordinamos una visita de inspección inicial
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        4
                      </div>
                      <span className="text-gray-700">
                        Recibes capacitación en la guía estandarizada
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        5
                      </div>
                      <span className="text-gray-700">
                        El admin asigna el badge "Verificado"
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        6
                      </div>
                      <span className="text-gray-700">
                        Apareces en la plataforma y recibes acceso al panel
                      </span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Requisitos mínimos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Establecimiento físico legal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Estilistas capacitados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Compromiso con la causa social</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Disponibilidad para atender donantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Cumplir guía estandarizada</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Necesitas ayuda?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">
                    Si tienes dudas sobre el proceso de registro:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Email: centros@donacabello.co</p>
                    <p className="font-medium">Tel: +57 300 123 4567</p>
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
