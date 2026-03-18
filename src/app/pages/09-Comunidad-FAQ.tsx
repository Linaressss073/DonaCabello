import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { HelpCircle, CheckCircle, XCircle, Mail } from "lucide-react";

export default function ComunidadFAQ() {
  const faqs = [
    {
      pregunta: "¿Puedo donar cabello teñido o con mechas?",
      respuesta: "Sí, en la mayoría de los casos el cabello teñido es aceptado siempre que esté en buen estado. Sin embargo, te recomendamos consultar directamente con el centro aliado al momento de agendar, ya que algunos tratamientos químicos muy fuertes pueden afectar la calidad del cabello. Los centros aliados verificados te orientarán según tu caso específico."
    },
    {
      pregunta: "¿Cuál es el largo mínimo de cabello para donar?",
      respuesta: "El largo mínimo sugerido es de 20 cm, medidos desde la raíz hasta las puntas. Este largo puede variar según la campaña o el destino final del cabello. Algunos programas aceptan desde 15 cm. Verifica con el centro aliado al agendar tu cita para confirmar el largo exacto requerido."
    },
    {
      pregunta: "¿Cómo debo amarrar mi cabello antes del corte?",
      respuesta: "Debes hacer una trenza firme o una coleta bien amarrada con una banda elástica. Evita usar clips metálicos. La idea es que el cabello se mantenga unido durante el corte para facilitar el proceso. El centro aliado puede ayudarte a preparar tu cabello si tienes dudas al llegar."
    },
    {
      pregunta: "¿Dónde puedo donar mi cabello de forma segura?",
      respuesta: "Solo debes donar en centros aliados verificados que aparecen en nuestra plataforma. Estos centros han sido evaluados por DonaCabello y siguen nuestra guía estandarizada. Usa nuestro buscador o mapa para encontrar el centro más cercano a tu ubicación. Todos los centros verificados tienen un badge de validación."
    },
    {
      pregunta: "¿Qué pasa con mi cabello después de donarlo?",
      respuesta: "Después de la donación, el centro aliado empaca tu cabello según el protocolo establecido y lo envía a fundaciones o talleres especializados en la elaboración de pelucas oncológicas. El centro confirma la donación en nuestro sistema para que puedas hacer seguimiento. El cabello se procesa y se transforma en pelucas de alta calidad para pacientes que lo necesitan."
    },
    {
      pregunta: "¿La donación tiene algún costo?",
      respuesta: "No, la donación de cabello es completamente gratuita. Los centros aliados no cobran por el corte de donación. Si deseas un corte o peinado adicional después de la donación, eso puede tener un costo, pero el acto de donar en sí mismo no tiene cargo alguno."
    },
    {
      pregunta: "¿Puedo donar si tengo el cabello corto?",
      respuesta: "Si actualmente tienes el cabello corto pero quieres donar en el futuro, puedes dejarlo crecer hasta alcanzar el largo mínimo de 20 cm. No hay límite de edad ni de género para donar. Lo importante es cumplir con los requisitos de largo y calidad del cabello."
    },
    {
      pregunta: "¿Cómo sé que mi donación realmente llegó a alguien?",
      respuesta: "Una vez que el centro aliado confirma tu donación en el sistema, queda registrada oficialmente. DonaCabello trabaja con fundaciones verificadas que entregan las pelucas a pacientes oncológicos. Si bien por temas de privacidad no compartimos datos específicos de beneficiarios, puedes confiar en que tu cabello está siendo usado para ayudar a quien lo necesita."
    }
  ];

  const mitos = [
    {
      mito: "Solo las mujeres pueden donar cabello",
      verdad: "Falso. Cualquier persona, sin importar su género, puede donar cabello siempre que cumpla con los requisitos de largo y calidad.",
      tipo: "falso"
    },
    {
      mito: "Donar cabello es doloroso o dañino",
      verdad: "Falso. Donar cabello es simplemente un corte de cabello normal. No hay dolor ni riesgo alguno para tu salud capilar.",
      tipo: "falso"
    },
    {
      mito: "El cabello debe ser virgen (sin químicos)",
      verdad: "Parcialmente falso. Aunque el cabello sin tratamientos es ideal, muchas veces se acepta cabello teñido o con mechas en buen estado. Consulta con el centro aliado.",
      tipo: "parcial"
    },
    {
      mito: "No puedo donar si tengo canas",
      verdad: "Falso. El cabello con canas es perfectamente aceptable para donar. Lo importante es que esté en buen estado general.",
      tipo: "falso"
    },
    {
      mito: "Tengo que cortarme todo el cabello",
      verdad: "Falso. Solo se corta la cantidad necesaria para cumplir con el largo mínimo de donación. Puedes conservar el largo que desees después del corte.",
      tipo: "falso"
    },
    {
      mito: "Las pelucas se venden con fines lucrativos",
      verdad: "Falso. Los centros aliados y fundaciones asociadas a DonaCabello trabajan sin fines de lucro. Las pelucas se entregan gratuitamente a pacientes oncológicos.",
      tipo: "falso"
    }
  ];

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
            description="Esta sección te ayuda a resolver todas tus dudas sobre la donación de cabello mediante preguntas frecuentes, información verificada que combate mitos comunes y acceso directo a nuestros canales de contacto para consultas personalizadas."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* FAQ Accordion */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <HelpCircle className="size-6 text-pink-600" />
                    Preguntas frecuentes (FAQ)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`}>
                        <AccordionTrigger className="text-left">
                          {faq.pregunta}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-700 leading-relaxed">
                          {faq.respuesta}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
                  <div className="space-y-4">
                    {mitos.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-l-4 ${
                          item.tipo === "falso"
                            ? "bg-red-50 border-red-500"
                            : "bg-yellow-50 border-yellow-500"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {item.tipo === "falso" ? (
                            <XCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-2">
                              <span className={item.tipo === "falso" ? "text-red-900" : "text-yellow-900"}>
                                MITO:
                              </span>{" "}
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
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre *</Label>
                        <Input id="nombre" placeholder="Tu nombre completo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-contact">Email *</Label>
                        <Input id="email-contact" type="email" placeholder="tu.email@ejemplo.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="asunto">Asunto *</Label>
                      <Input id="asunto" placeholder="¿Sobre qué necesitas ayuda?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje *</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Describe tu consulta o comentario..."
                        rows={5}
                      />
                    </div>

                    <Button className="bg-pink-600 hover:bg-pink-700">
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Canales de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <a href="mailto:info@donacabello.co" className="text-sm text-pink-600 hover:underline">
                      info@donacabello.co
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">WhatsApp</p>
                    <a href="tel:+573001234567" className="text-sm text-pink-600 hover:underline">
                      +57 300 123 4567
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Horario de atención</p>
                    <p className="text-sm text-gray-600">Lun-Vie: 9AM - 6PM</p>
                    <p className="text-sm text-gray-600">Sáb: 10AM - 2PM</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Tiempo de respuesta promedio: menos de 24 horas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pink-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="text-lg">Recursos útiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-pink-700 hover:underline">
                        Guía completa de donación (PDF)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-pink-700 hover:underline">
                        Video tutorial: Preparando tu cabello
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-pink-700 hover:underline">
                        Checklist para donar (descargable)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-pink-700 hover:underline">
                        Historias de impacto
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Temas más consultados</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li className="text-gray-700">Largo mínimo requerido</li>
                    <li className="text-gray-700">Cabello teñido o con mechas</li>
                    <li className="text-gray-700">Proceso de confirmación</li>
                    <li className="text-gray-700">Centros verificados</li>
                    <li className="text-gray-700">Costo de la donación</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-xs text-blue-900 leading-relaxed">
                    <strong>Recordatorio:</strong> No recolectamos datos de salud. 
                    Toda información médica es manejada exclusivamente por los centros de salud 
                    y fundaciones que trabajan directamente con los pacientes.
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
