"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/lib/api";
import { Campaign } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Megaphone, Target } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: campaign, isLoading, isError } = useQuery<Campaign>({
    queryKey: ["campaigns", id],
    queryFn: () => getCampaignById(id),
    enabled: !!id,
  });

  const pct = campaign && campaign.goal > 0
    ? Math.min((campaign.current / campaign.goal) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/campanas"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a campañas
          </Link>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : isError || !campaign ? (
            <div className="text-center py-20">
              <Megaphone className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Campaña no encontrada.</p>
              <Button asChild variant="outline">
                <Link href="/campanas">Ver todas las campañas</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Image */}
              {campaign.imageUrl ? (
                <div className="h-56 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-56 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center border border-rose-200">
                  <span className="text-6xl">💇</span>
                </div>
              )}

              {/* Title & status */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 flex-1">{campaign.title}</h1>
                <Badge variant={campaign.active ? "success" : "outline"}>
                  {campaign.active ? "Activa" : "Finalizada"}
                </Badge>
              </div>

              {/* Description */}
              {campaign.description && (
                <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
              )}

              {/* Progress */}
              {campaign.goal > 0 && (
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Target className="h-5 w-5 text-rose-500" />
                    Progreso de la campaña
                  </div>
                  <Progress value={pct} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span><span className="font-semibold text-gray-800">{campaign.current}</span> donaciones recibidas</span>
                    <span>Meta: <span className="font-semibold text-gray-800">{campaign.goal}</span></span>
                  </div>
                  <p className="text-xs text-gray-400">{Math.round(pct)}% completado</p>
                </div>
              )}

              {/* Dates */}
              {(campaign.startDate || campaign.endDate) && (
                <div className="flex flex-wrap gap-4">
                  {campaign.startDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>
                        Inicio: <span className="font-medium">{format(new Date(campaign.startDate), "d 'de' MMMM, yyyy", { locale: es })}</span>
                      </span>
                    </div>
                  )}
                  {campaign.endDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>
                        Cierre: <span className="font-medium">{format(new Date(campaign.endDate), "d 'de' MMMM, yyyy", { locale: es })}</span>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              {campaign.active && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">¡Únete a esta campaña!</h3>
                    <p className="text-sm text-gray-600 mt-0.5">Agenda tu cita en un centro aliado y sé parte del cambio.</p>
                  </div>
                  <Button asChild>
                    <Link href="/centros">Ver centros aliados</Link>
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
