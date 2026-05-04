"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCenterById } from "@/lib/api";
import { Center } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Mail, CheckCircle, ArrowLeft, Calendar } from "lucide-react";

const CentersMap = dynamic(() => import("@/components/CentersMap").then((m) => m.CentersMap), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />,
});

export default function CenterDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: center, isLoading, isError } = useQuery<Center>({
    queryKey: ["centers", id],
    queryFn: () => getCenterById(id),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/centros"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a centros
          </Link>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          ) : isError || !center ? (
            <div className="text-center py-20">
              <MapPin className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Centro no encontrado.</p>
              <Button asChild variant="outline">
                <Link href="/centros">Ver todos los centros</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {center.status === "verified" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <h1 className="text-2xl font-bold text-gray-900">{center.name}</h1>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{center.address}, {center.city}</span>
                  </div>
                </div>
                <Badge
                  variant={
                    center.status === "verified" ? "success" :
                    center.status === "pending" ? "warning" : "error"
                  }
                >
                  {center.status === "verified" ? "Verificado" :
                   center.status === "pending" ? "En revisión" : "Rechazado"}
                </Badge>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {center.phone && (
                  <a
                    href={`tel:${center.phone}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Teléfono</p>
                      <p className="text-sm font-medium text-gray-800">{center.phone}</p>
                    </div>
                  </a>
                )}
                {center.email && (
                  <a
                    href={`mailto:${center.email}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Correo electrónico</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{center.email}</p>
                    </div>
                  </a>
                )}
              </div>

              {/* Description */}
              {center.description && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Sobre el centro</h2>
                  <p className="text-gray-600 leading-relaxed">{center.description}</p>
                </div>
              )}

              {/* Map */}
              {center.latitude && center.longitude && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Ubicación</h2>
                  <div className="h-[300px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <CentersMap centers={[center]} />
                  </div>
                </div>
              )}

              {/* CTA */}
              {center.status === "verified" && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">¿Listo para donar?</h3>
                    <p className="text-sm text-gray-600 mt-0.5">Agenda una cita en este centro ahora mismo.</p>
                  </div>
                  <Button asChild>
                    <Link href={`/donar/agendar?centerId=${center.id}`}>
                      <Calendar className="h-4 w-4 mr-2" /> Agendar cita
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
