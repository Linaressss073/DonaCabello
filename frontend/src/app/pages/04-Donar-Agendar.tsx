import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { SuccessState } from "../components/SuccessState";
import { AlertBanner } from "../components/AlertBanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "lucide-react";
import { getCenters, createAppointment } from "../../api";
import type { Center, CreateAppointmentDto } from "../../types";

const CIUDADES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'];
const HORAS    = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
const HORA_LABELS: Record<string, string> = {
  '09:00': '09:00 AM', '10:00': '10:00 AM', '11:00': '11:00 AM',
  '14:00': '02:00 PM', '15:00': '03:00 PM', '16:00': '04:00 PM',
};

type FormData = CreateAppointmentDto & { terminos: boolean };

export default function DonarAgendar() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [centersError, setCentersError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getCenters({ soloVerificados: true })
      .then(setCenters)
      .catch(() => setCentersError(true));
  }, []);

  async function onSubmit({ terminos: _t, ...dto }: FormData) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await createAppointment(dto);
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Error al agendar. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4 text-sm uppercase text-gray-600">Donar Cabello</h3>
                <nav className="space-y-1">
                  <Link to="/donar/guia"    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Guía paso a paso</Link>
                  <Link to="/donar/guia"    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Checklist</Link>
                  <Link to="/donar/agendar" className="block px-3 py-2 text-sm bg-pink-100 text-pink-700 rounded-lg font-medium">Agendar</Link>
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
                description="Este formulario te permite reservar tu cita de donación. La validación final la realiza el centro aliado después del corte."
              />

              {submitted ? (
                <SuccessState
                  title="¡Cita agendada exitosamente!"
                  description="Recibirás un email de confirmación. El centro aliado te contactará 24h antes para confirmar."
                >
                  <Link to="/seguimiento">
                    <Button className="bg-pink-600 hover:bg-pink-700">Ver mi seguimiento</Button>
                  </Link>
                  <Button variant="outline" onClick={() => { setSubmitted(false); reset(); }}>Agendar otra cita</Button>
                </SuccessState>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    <AlertBanner variant="info">
                      <strong>Importante:</strong> La validación final de tu donación la realiza el centro aliado
                      después de que asistas a tu cita y se complete el corte.
                    </AlertBanner>
                    <AlertBanner variant="success">
                      Todos los centros son <strong>centros aliados verificados</strong> que siguen nuestra guía estandarizada.
                    </AlertBanner>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="size-6 text-pink-600" />
                        Formulario de agendamiento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Nombre */}
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre completo *</Label>
                          <Input
                            id="nombre"
                            placeholder="Ej: María Rodríguez"
                            {...register('nombre', { required: 'El nombre es obligatorio' })}
                          />
                          {errors.nombre && <p className="text-xs text-red-600">{errors.nombre.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu.email@ejemplo.com"
                            {...register('email', {
                              required: 'El email es obligatorio',
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' },
                            })}
                          />
                          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            type="tel"
                            placeholder="+57 300 123 4567"
                            {...register('telefono', { required: 'El teléfono es obligatorio' })}
                          />
                          {errors.telefono && <p className="text-xs text-red-600">{errors.telefono.message}</p>}
                        </div>

                        {/* Ciudad */}
                        <div className="space-y-2">
                          <Label>Ciudad *</Label>
                          <Controller
                            name="ciudad"
                            control={control}
                            rules={{ required: 'Selecciona una ciudad' }}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Selecciona tu ciudad" /></SelectTrigger>
                                <SelectContent>
                                  {CIUDADES.map((c) => (
                                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.ciudad && <p className="text-xs text-red-600">{errors.ciudad.message}</p>}
                        </div>

                        {/* Centro */}
                        <div className="space-y-2">
                          <Label>Centro aliado *</Label>
                          {centersError ? (
                            <p className="text-sm text-red-600">No se pudieron cargar los centros. Verifica tu conexión y recarga la página.</p>
                          ) : centers.length === 0 ? (
                            <p className="text-sm text-amber-600">No hay centros disponibles en este momento.</p>
                          ) : (
                            <Controller
                              name="centroId"
                              control={control}
                              rules={{ required: 'Selecciona un centro' }}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger><SelectValue placeholder="Selecciona un centro verificado" /></SelectTrigger>
                                  <SelectContent>
                                    {centers.map((c) => (
                                      <SelectItem key={c.id} value={c.id}>
                                        {c.nombre} — {c.zona}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          )}
                          {errors.centroId && <p className="text-xs text-red-600">{errors.centroId.message}</p>}
                        </div>

                        {/* Fecha y Hora */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fecha">Fecha preferida *</Label>
                            <Input
                              id="fecha"
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              {...register('fecha', { required: 'Selecciona una fecha' })}
                            />
                            {errors.fecha && <p className="text-xs text-red-600">{errors.fecha.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label>Hora preferida *</Label>
                            <Controller
                              name="hora"
                              control={control}
                              rules={{ required: 'Selecciona una hora' }}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger><SelectValue placeholder="Selecciona hora" /></SelectTrigger>
                                  <SelectContent>
                                    {HORAS.map((h) => (
                                      <SelectItem key={h} value={h}>{HORA_LABELS[h]}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.hora && <p className="text-xs text-red-600">{errors.hora.message}</p>}
                          </div>
                        </div>

                        {/* Notas */}
                        <div className="space-y-2">
                          <Label htmlFor="notas">Notas adicionales (opcional)</Label>
                          <Textarea
                            id="notas"
                            placeholder="Ej: Prefiero estilista con experiencia en cortes largos..."
                            rows={4}
                            {...register('notas', { maxLength: { value: 200, message: 'Máximo 200 caracteres' } })}
                          />
                          {errors.notas
                            ? <p className="text-xs text-red-600">{errors.notas.message}</p>
                            : <p className="text-xs text-gray-500">Máximo 200 caracteres</p>
                          }
                        </div>

                        {/* Términos */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <Controller
                            name="terminos"
                            control={control}
                            rules={{ required: 'Debes aceptar los términos' }}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                id="terminos"
                                className="mt-1"
                                checked={field.value ?? false}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <label htmlFor="terminos" className="text-sm text-gray-700">
                            Acepto que <strong>no recolectamos datos de salud</strong> y que la{' '}
                            <strong>validación final la realiza el centro aliado</strong>. He leído y acepto los términos.
                          </label>
                        </div>
                        {errors.terminos && <p className="text-xs text-red-600">{errors.terminos.message}</p>}

                        {submitError && (
                          <AlertBanner variant="error">{submitError}</AlertBanner>
                        )}

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button
                            type="submit"
                            className="flex-1 bg-pink-600 hover:bg-pink-700"
                            disabled={submitting}
                          >
                            <Calendar className="mr-2 size-5" />
                            {submitting ? 'Agendando...' : 'Confirmar agendamiento'}
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
