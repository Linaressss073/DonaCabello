import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, Heart, MapPin, Calendar, Scissors, FileCheck } from "lucide-react";

export default function DonarGuia() {
  const steps = [
    {
      number: 1,
      title: "Preparar",
      icon: Heart,
      description: "Asegúrate de que tu cabello cumpla con los requisitos mínimos para la donación.",
      details: [
        "Cabello limpio y seco",
        "Sin tratamientos químicos recientes",
        "Largo mínimo de 20 cm (según campaña)",
        "Cabello en buen estado"
      ]
    },
    {
      number: 2,
      title: "Elegir centro",
      icon: MapPin,
      description: "Busca un centro aliado verificado cerca de tu ubicación.",
      details: [
        "Usa el buscador con filtros",
        "Verifica el badge 'Verificado'",
        "Revisa horarios disponibles",
        "Lee reseñas de otros donantes"
      ]
    },
    {
      number: 3,
      title: "Agendar",
      icon: Calendar,
      description: "Reserva tu cita seleccionando fecha, hora y centro de tu preferencia.",
      details: [
        "Completa el formulario de agendamiento",
        "Selecciona fecha y hora conveniente",
        "Añade notas especiales si las tienes",
        "Recibe confirmación por email"
      ]
    },
    {
      number: 4,
      title: "Corte",
      icon: Scissors,
      description: "Asiste a tu cita con el cabello preparado según las indicaciones.",
      details: [
        "Llega puntual a tu cita",
        "Cabello en trenza o coleta firme",
        "Evita aceites/cremas antes del corte",
        "El estilista cortará según protocolo"
      ]
    },
    {
      number: 5,
      title: "Confirmación",
      icon: FileCheck,
      description: "El centro aliado confirma que tu donación fue exitosa.",
      details: [
        "El centro valida la donación",
        "Recibes confirmación en tu panel",
        "Puedes descargar certificado (si aplica)",
        "Tu donación queda registrada"
      ]
    }
  ];

  const checklist = [
    "Cabello limpio y seco",
    "Trenza o coleta firme",
    "Largo mínimo sugerido: 20 cm (según campaña)",
    "Evita aceites/cremas antes del corte",
    "Sin tintes o tratamientos químicos recientes (consultar con el centro)",
    "Cabello en buenas condiciones (sin puntas abiertas excesivas)"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Sidebar de submenú */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4 text-sm uppercase text-gray-600">
                  Donar Cabello
                </h3>
                <nav className="space-y-1">
                  <Link
                    to="/donar/guia"
                    className="block px-3 py-2 text-sm bg-pink-100 text-pink-700 rounded-lg font-medium"
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
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Agendar
                  </Link>
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-3">
                    <strong>Microcopy importante:</strong>
                  </p>
                  <ul className="text-xs text-gray-500 space-y-2">
                    <li>• Centros aliados verificados</li>
                    <li>• Guía estandarizada</li>
                    <li>• Validación final por el centro</li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">Guía paso a paso para donar</h1>
              <p className="text-gray-600 mb-8">
                Sigue estos cinco pasos para completar tu donación de cabello de forma segura y efectiva.
              </p>

              <PageInfo 
                title="Donar Cabello"
                description="Esta sección te guía a través del proceso completo de donación, desde la preparación inicial hasta la confirmación final. Incluye un checklist de requisitos y acceso directo al sistema de agendamiento con centros aliados verificados."
              />

              {/* Pasos */}
              <div className="space-y-6 mb-12">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <Card key={step.number}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-bold text-pink-600">{step.number}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="size-6 text-pink-600" />
                              <CardTitle className="text-2xl">{step.title}</CardTitle>
                            </div>
                            <CardDescription className="text-base">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Checklist */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <CheckCircle className="size-6 text-green-600" />
                    Checklist de requisitos
                  </CardTitle>
                  <CardDescription>
                    Verifica que cumples con todos estos requisitos antes de agendar tu cita
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-3">
                  ¿Lista/o para agendar tu donación?
                </h2>
                <p className="mb-6 text-pink-100">
                  Encuentra un centro aliado verificado cerca de ti y reserva tu cita ahora mismo
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/donar/agendar">
                    <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                      <Calendar className="mr-2 size-5" />
                      Agendar ahora
                    </Button>
                  </Link>
                  <Link to="/centros/buscar">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-pink-800">
                      <MapPin className="mr-2 size-5" />
                      Ver centros
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
