"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/lib/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignCard } from "@/components/CampaignCard";
import { Heart, MapPin, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { Campaign } from "@/types";

const STEPS = [
  { n: 1, title: "Prepara tu cabello", desc: "Asegúrate de cumplir los requisitos: cabello limpio, seco, trenza firme y mínimo 20 cm de largo." },
  { n: 2, title: "Elige y agenda", desc: "Busca un centro aliado verificado cerca de ti y agenda tu cita fácilmente." },
  { n: 3, title: "Dona y confirma", desc: "Asiste a tu cita, realiza la donación y el centro confirmará que se completó." },
];

const QUICK = [
  { icon: Heart, color: "text-rose-600 bg-rose-50", href: "/donar/guia", title: "Cómo donar", desc: "Guía paso a paso para realizar tu donación" },
  { icon: CheckCircle, color: "text-green-600 bg-green-50", href: "/donar/guia#requisitos", title: "Requisitos", desc: "Conoce los requisitos mínimos" },
  { icon: MapPin, color: "text-blue-600 bg-blue-50", href: "/centros", title: "Centros aliados", desc: "Encuentra centros verificados cerca de ti" },
  { icon: Calendar, color: "text-purple-600 bg-purple-50", href: "/donar/agendar", title: "Agendar cita", desc: "Programa tu visita a un centro aliado" },
];

export default function Home() {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-rose-600 to-rose-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-48 h-48 bg-white rounded-full translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-rose-200 text-sm font-medium mb-4">
                <Heart className="h-4 w-4 fill-rose-200" /> Plataforma de donación de cabello
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Dona cabello,<br />regala confianza
              </h1>
              <p className="text-lg text-rose-100 mb-8">
                Conectamos donantes con centros estéticos aliados verificados para apoyar a pacientes oncológicos en Colombia.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 shadow-md" asChild>
                  <Link href="/donar/guia">
                    <Heart className="mr-2 h-5 w-5" /> Quiero donar
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-rose-700/50" asChild>
                  <Link href="/centros">
                    <MapPin className="mr-2 h-5 w-5" /> Encontrar un centro
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
          {/* Quick access */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">¿Por dónde empiezo?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK.map(({ icon: Icon, color, href, title, desc }) => (
                <Link key={href} href={href}>
                  <Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-base">{title}</CardTitle>
                      <CardDescription>{desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold mb-10 text-center">¿Cómo funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} className="text-center">
                  <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl font-bold text-white">{n}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/donar/guia">
                  Ver guía completa <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Campaigns */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Campañas activas</h2>
              <Button variant="outline" asChild>
                <Link href="/campanas">Ver todas</Link>
              </Button>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : campaigns && campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {campaigns.slice(0, 3).map((c) => (
                  <CampaignCard key={c.id} campaign={c} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <Heart className="h-12 w-12 mx-auto mb-3 text-rose-200" />
                <p>No hay campañas activas en este momento.</p>
              </div>
            )}
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Historias de impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "María C., Bogotá", quote: "Llevaba años queriendo cortarme el cabello. No sabía que podía convertir esa decisión en un acto de amor. Doné 25 cm y el proceso fue súper fácil gracias a los centros aliados de DonaCabello." },
                { name: "Ana P., Medellín", quote: "Mi hija de 10 años quiso donar su cabello después de que una amiga de la familia empezó su tratamiento oncológico. DonaCabello nos ayudó a encontrar un centro cerca de casa y nos explicaron todo." },
              ].map(({ name, quote }) => (
                <Card key={name} className="bg-rose-50 border-rose-100">
                  <CardHeader>
                    <div className="text-3xl text-rose-300 font-serif">&ldquo;</div>
                    <p className="text-gray-700 leading-relaxed italic">{quote}</p>
                    <p className="text-sm font-semibold text-rose-700 mt-2">— {name}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
