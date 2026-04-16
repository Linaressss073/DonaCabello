import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Scissors, Calendar, ArrowRight } from "lucide-react";

const REQUIREMENTS = [
  "Largo mínimo de 20 cm (medido desde el cuero cabelludo, en trenza)",
  "Cabello limpio y completamente seco",
  "Trenza firme y uniforme",
  "Sin decoloración química severa ni permanente reciente",
  "Sin canas excesivas (más del 25%)",
  "Sin hongos ni enfermedades del cuero cabelludo",
];

const NOT_ALLOWED = [
  "Cabello decolorado o con permanente reciente",
  "Menos de 20 cm de largo",
  "Cabello húmedo o sucio",
  "Cabello con tratamientos dañinos recientes",
];

const STEPS = [
  {
    n: 1, icon: "💧",
    title: "Lava y seca tu cabello",
    desc: "El día de la donación, lava bien tu cabello con shampú suave y asegúrate de que esté completamente seco antes de ir al centro.",
  },
  {
    n: 2, icon: "💇",
    title: "Forma la trenza",
    desc: "El profesional del centro aliado formará una o más trenzas firmes, bien definidas, listas para cortar.",
  },
  {
    n: 3, icon: "✂️",
    title: "El corte",
    desc: "Se realizará el corte por encima de la ligadura, respetando la longitud mínima de 20 cm. El proceso es rápido e indoloro.",
  },
  {
    n: 4, icon: "📦",
    title: "Empaque y registro",
    desc: "La trenza se empaca en una bolsa sellada y se registra en la plataforma. Recibirás una confirmación de tu donación.",
  },
];

export default function DonarGuiaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-50 to-white border-b border-rose-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-rose-600 text-sm font-semibold uppercase tracking-wide">Guía de donación</span>
              <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-gray-900">
                ¿Cómo donar cabello?
              </h1>
              <p className="text-lg text-gray-600">
                Donar cabello es un acto de amor que cambia vidas. Sigue estos pasos para hacerlo de forma segura y efectiva.
              </p>
              <div className="flex gap-3 mt-6">
                <Button asChild>
                  <Link href="/donar/agendar">
                    <Calendar className="mr-2 h-4 w-4" /> Agendar mi cita
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/centros">Ver centros aliados</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Steps */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Proceso de donación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STEPS.map(({ n, icon, title, desc }) => (
                <Card key={n} className="flex gap-4 p-6 items-start">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-rose-600 font-semibold uppercase mb-1">Paso {n}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section id="requisitos" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-8">Requisitos del cabello</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" /> Sí se acepta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {REQUIREMENTS.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <XCircle className="h-5 w-5" /> No se acepta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {NOT_ALLOWED.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                        <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-rose-600 text-white rounded-2xl p-10 text-center">
            <Scissors className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">¿Listo para donar?</h2>
            <p className="text-rose-100 mb-6">Agenda tu cita en un centro aliado verificado y transforma tu cabello en esperanza.</p>
            <Button className="bg-white text-rose-600 hover:bg-rose-50" size="lg" asChild>
              <Link href="/donar/agendar">
                Agendar mi cita <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
