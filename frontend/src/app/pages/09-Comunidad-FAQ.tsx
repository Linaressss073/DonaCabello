import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { AlertBanner } from "../components/AlertBanner";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { HelpCircle, CheckCircle, XCircle, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getFaqs, getMyths, sendContactMessage } from "../../api";
import type { ContactDto } from "../../types";

export default function ComunidadFAQ() {
  const { data: faqs,  loading: loadingFaqs  } = useApi(() => getFaqs(),   []);
  const { data: myths, loading: loadingMyths } = useApi(() => getMyths(),  []);

  const [contactSent, setContactSent]   = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [sending, setSending]           = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactDto>();

  async function onSubmit(data: ContactDto) {
    setSending(true);
    setContactError(null);
    try {
      await sendContactMessage(data);
      setContactSent(true);
      reset();
    } catch (e) {
      setContactError(e instanceof Error ? e.message : 'Error al enviar el mensaje.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Comunidad y apoyo</h1>
          <p className="text-gray-600 mb-8">
            Encuentra respuestas a tus dudas y combate la desinformación sobre la donación de cabello.
          </p>

          <PageInfo
            title="Comunidad y Apoyo"
            description="Resuelve tus dudas mediante preguntas frecuentes, información verificada que combate mitos y acceso a nuestros canales de contacto."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <HelpCircle className="size-6 text-pink-600" />
                    Preguntas frecuentes (FAQ)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingFaqs ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {(faqs ?? []).map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">{faq.pregunta}</AccordionTrigger>
                          <AccordionContent className="text-sm text-gray-700 leading-relaxed">
                            {faq.respuesta}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>

              {/* Mitos y verdades */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Mitos y verdades</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Información verificada para combatir la desinformación sobre la donación de cabello
                  </p>
                </CardHeader>
                <CardContent>
                  {loadingMyths ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />)}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(myths ?? []).map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border-l-4 ${
                            item.tipo === 'falso' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {item.tipo === 'falso'
                              ? <XCircle    className="size-5 text-red-600    mt-0.5 flex-shrink-0" />
                              : <CheckCircle className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            }
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-2">
                                <span className={item.tipo === 'falso' ? 'text-red-900' : 'text-yellow-900'}>
                                  MITO:
                                </span>{' '}
                                {item.mito}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">VERDAD:</span> {item.verdad}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Formulario de contacto */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Mail className="size-6 text-pink-600" />
                    ¿No encontraste tu respuesta?
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Escríbenos y nuestro equipo te responderá en menos de 24 horas
                  </p>
                </CardHeader>
                <CardContent>
                  {contactSent ? (
                    <AlertBanner variant="success">
                      <strong>Mensaje enviado.</strong> Te responderemos en menos de 24 horas.
                      <button className="block mt-2 text-green-700 underline" onClick={() => setContactSent(false)}>
                        Enviar otro mensaje
                      </button>
                    </AlertBanner>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre *</Label>
                          <Input
                            id="nombre"
                            placeholder="Tu nombre completo"
                            {...register('nombre', { required: 'El nombre es obligatorio' })}
                          />
                          {errors.nombre && <p className="text-xs text-red-600">{errors.nombre.message}</p>}
                        </div>
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="asunto">Asunto *</Label>
                        <Input
                          id="asunto"
                          placeholder="¿Sobre qué necesitas ayuda?"
                          {...register('asunto', { required: 'El asunto es obligatorio' })}
                        />
                        {errors.asunto && <p className="text-xs text-red-600">{errors.asunto.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Mensaje *</Label>
                        <Textarea
                          id="mensaje"
                          placeholder="Describe tu consulta o comentario..."
                          rows={5}
                          {...register('mensaje', { required: 'El mensaje es obligatorio' })}
                        />
                        {errors.mensaje && <p className="text-xs text-red-600">{errors.mensaje.message}</p>}
                      </div>

                      {contactError && (
                        <AlertBanner variant="error">{contactError}</AlertBanner>
                      )}

                      <Button
                        type="submit"
                        className="bg-pink-600 hover:bg-pink-700"
                        disabled={sending}
                      >
                        {sending ? 'Enviando...' : 'Enviar mensaje'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Canales de contacto</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <a href="mailto:info@donacabello.co" className="text-sm text-pink-600 hover:underline">info@donacabello.co</a>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">WhatsApp</p>
                    <a href="tel:+573001234567" className="text-sm text-pink-600 hover:underline">+57 300 123 4567</a>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Horario de atención</p>
                    <p className="text-sm text-gray-600">Lun-Vie: 9AM - 6PM</p>
                    <p className="text-sm text-gray-600">Sáb: 10AM - 2PM</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">Tiempo de respuesta promedio: menos de 24 horas</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pink-50 border-pink-200">
                <CardHeader><CardTitle className="text-lg">Recursos útiles</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Guía completa de donación (PDF)',
                      'Video tutorial: Preparando tu cabello',
                      'Checklist para donar (descargable)',
                      'Historias de impacto',
                    ].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-pink-700 hover:underline">{item}</a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Temas más consultados</CardTitle></CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    {['Largo mínimo requerido', 'Cabello teñido o con mechas', 'Proceso de confirmación', 'Centros verificados', 'Costo de la donación'].map((t) => (
                      <li key={t} className="text-gray-700">{t}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-xs text-blue-900 leading-relaxed">
                    <strong>Recordatorio:</strong> No recolectamos datos de salud. Toda información médica es
                    manejada exclusivamente por los centros de salud y fundaciones.
                  </p>
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
