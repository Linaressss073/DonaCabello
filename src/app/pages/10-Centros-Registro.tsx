import { useState } from "react";
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
import { Building2, Upload, CheckCircle } from "lucide-react";
import { registerCenter } from "../../api";
import type { RegisterCenterDto } from "../../types";

const CIUDADES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'];

const SERVICIOS_DISPONIBLES = [
  { key: 'corte',       label: 'Corte especializado para donación' },
  { key: 'asesoria',    label: 'Asesoría gratuita pre-donación' },
  { key: 'empaque',     label: 'Empaque profesional del cabello' },
  { key: 'certificado', label: 'Certificado de donación' },
  { key: 'grupal',      label: 'Atención de donaciones grupales' },
  { key: 'parking',     label: 'Parking disponible' },
];

type FormData = RegisterCenterDto & { servicioKeys: string[]; terminos: boolean };

export default function CentrosRegistro() {
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { servicioKeys: [] } });

  async function onSubmit({ servicioKeys, terminos: _t, ...data }: FormData) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await registerCenter({ ...data, servicios: servicioKeys });
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Error al enviar la solicitud.');
    } finally {
      setSubmitting(false);
    }
  }

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
            description="Formulario para registrarse como centro aliado. Una vez enviada la solicitud, nuestro equipo la revisará y asignará la verificación tras validar la documentación."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <div className="mb-8 space-y-4">
                <AlertBanner variant="info">
                  <strong>Proceso de verificación:</strong>
                  <p className="mt-1">
                    Una vez envíes este formulario, nuestro equipo revisará tu solicitud en 3-5 días hábiles.
                    El badge "Verificado" lo asigna el administrador de DonaCabello.
                  </p>
                </AlertBanner>
                <AlertBanner variant="success">
                  <strong>Beneficios de ser centro aliado:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Apareces en nuestra plataforma y mapa de centros</li>
                    <li>Recibes capacitación en la guía estandarizada de corte</li>
                    <li>Acceso al panel para gestionar citas y confirmar donaciones</li>
                    <li>Visibilidad en campañas y redes sociales</li>
                  </ul>
                </AlertBanner>
              </div>

              {submitted ? (
                <SuccessState
                  title="¡Solicitud enviada!"
                  description="Nuestro equipo revisará tu información en 3-5 días hábiles y te contactará para coordinar la visita de inspección inicial."
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="size-6 text-pink-600" />
                      Formulario de registro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                      {/* Info del centro */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Información del centro</h3>

                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre del centro *</Label>
                          <Input id="nombre" placeholder="Ej: Estética Bella" {...register('nombre', { required: 'Obligatorio' })} />
                          {errors.nombre && <p className="text-xs text-red-600">{errors.nombre.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nit">NIT o RUT *</Label>
                          <Input id="nit" placeholder="Ej: 900123456-7" {...register('nit', { required: 'Obligatorio' })} />
                          {errors.nit && <p className="text-xs text-red-600">{errors.nit.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Ciudad *</Label>
                            <Controller
                              name="ciudad"
                              control={control}
                              rules={{ required: 'Selecciona una ciudad' }}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger><SelectValue placeholder="Selecciona ciudad" /></SelectTrigger>
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
                          <div className="space-y-2">
                            <Label htmlFor="zona">Zona *</Label>
                            <Input id="zona" placeholder="Ej: Chapinero, Usaquén" {...register('zona', { required: 'Obligatorio' })} />
                            {errors.zona && <p className="text-xs text-red-600">{errors.zona.message}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="direccion">Dirección completa *</Label>
                          <Input id="direccion" placeholder="Ej: Cra 7 #63-44" {...register('direccion', { required: 'Obligatorio' })} />
                          {errors.direccion && <p className="text-xs text-red-600">{errors.direccion.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="barrio">Barrio</Label>
                          <Input id="barrio" placeholder="Ej: Chapinero Central" {...register('barrio')} />
                        </div>
                      </div>

                      {/* Horarios */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-semibold text-lg">Horarios de atención</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="horarioSemana">Lunes a Viernes *</Label>
                            <Input id="horarioSemana" placeholder="Ej: 9:00 AM - 6:00 PM" {...register('horarioSemana', { required: 'Obligatorio' })} />
                            {errors.horarioSemana && <p className="text-xs text-red-600">{errors.horarioSemana.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="horarioSabado">Sábado</Label>
                            <Input id="horarioSabado" placeholder="Ej: 10:00 AM - 4:00 PM" {...register('horarioSabado')} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="horarioDomingo">Domingo</Label>
                          <Input id="horarioDomingo" placeholder="Cerrado o ingrese horario" {...register('horarioDomingo')} />
                        </div>
                      </div>

                      {/* Servicios */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-semibold text-lg">Servicios ofrecidos</h3>
                        <p className="text-sm text-gray-600">Selecciona todos los que apliquen</p>
                        <Controller
                          name="servicioKeys"
                          control={control}
                          render={({ field }) => (
                            <div className="space-y-2">
                              {SERVICIOS_DISPONIBLES.map(({ key, label }) => (
                                <label key={key} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={(field.value ?? []).includes(key)}
                                    onChange={(e) => {
                                      const current = field.value ?? [];
                                      field.onChange(
                                        e.target.checked
                                          ? [...current, key]
                                          : current.filter((k) => k !== key)
                                      );
                                    }}
                                  />
                                  <span className="text-sm">{label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        />
                      </div>

                      {/* Contacto */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-semibold text-lg">Información de contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono principal *</Label>
                            <Input id="telefono" type="tel" placeholder="+57 300 123 4567" {...register('telefono', { required: 'Obligatorio' })} />
                            {errors.telefono && <p className="text-xs text-red-600">{errors.telefono.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" type="email" placeholder="info@tucentro.com" {...register('email', { required: 'Obligatorio' })} />
                            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responsable">Nombre del responsable *</Label>
                          <Input id="responsable" placeholder="Persona de contacto principal" {...register('responsable', { required: 'Obligatorio' })} />
                          {errors.responsable && <p className="text-xs text-red-600">{errors.responsable.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cargo">Cargo del responsable</Label>
                          <Input id="cargo" placeholder="Ej: Gerente, Propietario/a" {...register('cargo')} />
                        </div>
                      </div>

                      {/* Documentos */}
                      <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-semibold text-lg">Documentación</h3>
                        <p className="text-sm text-gray-600">Sube los documentos requeridos para el proceso de verificación</p>
                        {[
                          { id: 'doc-rut',       label: 'RUT o Cámara de Comercio *', accept: '.pdf,.jpg,.png', note: 'PDF, JPG o PNG — Máx 5MB', required: true },
                          { id: 'doc-sanitario', label: 'Registro sanitario (si aplica)', accept: '.pdf,.jpg,.png', note: 'PDF, JPG o PNG — Máx 5MB', required: false },
                          { id: 'doc-fotos',     label: 'Fotos del establecimiento',  accept: '.jpg,.png',       note: 'JPG o PNG — 2-5 fotos del interior/exterior', required: false },
                        ].map(({ id, label, accept, note }) => (
                          <div key={id} className="space-y-2">
                            <Label htmlFor={id}>{label}</Label>
                            <div className="flex items-center gap-3">
                              <Input id={id} type="file" accept={accept} className="flex-1" />
                              <Button type="button" variant="outline" size="sm"><Upload className="size-4" /></Button>
                            </div>
                            <p className="text-xs text-gray-500">{note}</p>
                          </div>
                        ))}
                      </div>

                      {/* Notas */}
                      <div className="space-y-4 pt-6 border-t">
                        <div className="space-y-2">
                          <Label htmlFor="descripcion">Información adicional</Label>
                          <Textarea
                            id="descripcion"
                            placeholder="Cuéntanos por qué quieres ser parte de DonaCabello..."
                            rows={4}
                            {...register('descripcion')}
                          />
                        </div>
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
                              id="terminos-centro"
                              className="mt-1"
                              checked={field.value ?? false}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        <label htmlFor="terminos-centro" className="text-sm text-gray-700">
                          Acepto los términos y condiciones para centros aliados. Me comprometo a seguir la{' '}
                          <strong>guía estandarizada</strong> de DonaCabello para el corte y empaque de donaciones.
                        </label>
                      </div>
                      {errors.terminos && <p className="text-xs text-red-600">{errors.terminos.message}</p>}

                      {submitError && (
                        <AlertBanner variant="error">{submitError}</AlertBanner>
                      )}

                      {/* Botones */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700" disabled={submitting}>
                          <Building2 className="mr-2 size-5" />
                          {submitting ? 'Enviando...' : 'Enviar solicitud'}
                        </Button>
                        <Button type="button" variant="outline" className="flex-1">Cancelar</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Proceso de verificación</CardTitle></CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    {[
                      'Envías el formulario con tu documentación',
                      'Nuestro equipo revisa tu solicitud (3-5 días hábiles)',
                      'Coordinamos una visita de inspección inicial',
                      'Recibes capacitación en la guía estandarizada',
                      'El admin asigna el badge "Verificado"',
                      'Apareces en la plataforma y recibes acceso al panel',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader><CardTitle className="text-lg">Requisitos mínimos</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {[
                      'Establecimiento físico legal',
                      'Estilistas capacitados',
                      'Compromiso con la causa social',
                      'Disponibilidad para atender donantes',
                      'Cumplir guía estandarizada',
                    ].map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">¿Necesitas ayuda?</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">Si tienes dudas sobre el proceso de registro:</p>
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
