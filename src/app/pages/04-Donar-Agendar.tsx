import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";

export default function DonarAgendar() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4 text-sm uppercase text-gray-600">
                  Donar Cabello
                </h3>
                <nav className="space-y-1">
                  <Link
                    to="/donar/guia"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Guía paso a paso
                  </Link>
                  <Link
                    to="/donar/guia"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Checklist
                  </Link>
                  <Link
                    to="/donar/agendar"
                    className="block px-3 py-2 text-sm bg-pink-100 text-pink-700 rounded-lg font-medium"
                  >
                    Agendar
                  </Link>
                </nav>
              </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1 max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Agendar donación</h1>
              <p className="text-gray-600 mb-8">
                Completa el formulario para reservar tu cita en un centro aliado verificado.
              </p>

              <PageInfo 
                title="Agendar"
                description="Este formulario te permite reservar tu cita de donación seleccionando el centro, fecha y hora que mejor te convenga. Recuerda que la validación final de la donación la realiza el centro aliado después del corte."
              />

              {/* Avisos importantes */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <strong>Importante:</strong> La validación final de tu donación la realiza el centro aliado 
                    después de que asistas a tu cita y se complete el corte.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-900">
                    Todos los centros en esta lista son <strong>centros aliados verificados</strong> que siguen 
                    nuestra guía estandarizada de donación.
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="size-6 text-pink-600" />
                    Formulario de agendamiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input 
                        id="nombre" 
                        placeholder="Ej: María Rodríguez"
                        className="w-full"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="tu.email@ejemplo.com"
                        className="w-full"
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input 
                        id="telefono" 
                        type="tel"
                        placeholder="+57 300 123 4567"
                        className="w-full"
                      />
                    </div>

                    {/* Ciudad */}
                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bogota">Bogotá</SelectItem>
                          <SelectItem value="medellin">Medellín</SelectItem>
                          <SelectItem value="cali">Cali</SelectItem>
                          <SelectItem value="barranquilla">Barranquilla</SelectItem>
                          <SelectItem value="cartagena">Cartagena</SelectItem>
                          <SelectItem value="bucaramanga">Bucaramanga</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Centro */}
                    <div className="space-y-2">
                      <Label htmlFor="centro">Centro aliado *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un centro verificado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="centro1">Estética Bella - Chapinero (Verificado)</SelectItem>
                          <SelectItem value="centro2">Salón Esperanza - Usaquén (Verificado)</SelectItem>
                          <SelectItem value="centro3">Corte con Causa - Centro (Verificado)</SelectItem>
                          <SelectItem value="centro4">Belleza Solidaria - Suba (Verificado)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Solo mostramos centros aliados verificados
                      </p>
                    </div>

                    {/* Fecha y Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fecha">Fecha preferida *</Label>
                        <Input 
                          id="fecha" 
                          type="date"
                          className="w-full"
                          min="2026-02-28"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hora">Hora preferida *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona hora" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="14:00">02:00 PM</SelectItem>
                            <SelectItem value="15:00">03:00 PM</SelectItem>
                            <SelectItem value="16:00">04:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Notas */}
                    <div className="space-y-2">
                      <Label htmlFor="notas">Notas adicionales (opcional)</Label>
                      <Textarea 
                        id="notas"
                        placeholder="Ej: Prefiero estilista con experiencia en cortes largos, tengo cabello rizado, etc."
                        rows={4}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Máximo 200 caracteres
                      </p>
                    </div>

                    {/* Checkbox de términos */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <input 
                        type="checkbox" 
                        id="terminos"
                        className="mt-1"
                      />
                      <label htmlFor="terminos" className="text-sm text-gray-700">
                        Acepto que <strong>no recolectamos datos de salud</strong> y que la 
                        <strong> validación final la realiza el centro aliado</strong> después de completar 
                        mi donación. He leído y acepto los términos y condiciones.
                      </label>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
                        <Calendar className="mr-2 size-5" />
                        Confirmar agendamiento
                      </Button>
                      <Link to="/donar/guia" className="flex-1">
                        <Button type="button" variant="outline" className="w-full">
                          Volver a la guía
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Siguiente paso */}
              <Card className="mt-8 bg-pink-50 border-pink-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">¿Qué sigue después de agendar?</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Recibirás un email de confirmación con los detalles de tu cita</li>
                    <li>El centro aliado te contactará 24h antes para confirmar</li>
                    <li>Asiste con tu cabello preparado según el checklist</li>
                    <li>Después del corte, el centro confirmará tu donación</li>
                    <li>Podrás ver el estado en tu panel de seguimiento</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
