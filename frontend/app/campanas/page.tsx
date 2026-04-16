"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/lib/api";
import { Campaign } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Megaphone, Search } from "lucide-react";

export default function CampanasPage() {
  const [search, setSearch] = useState("");

  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  const filtered = (campaigns ?? []).filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const active = filtered.filter((c) => c.active);
  const inactive = filtered.filter((c) => !c.active);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campañas de donación</h1>
            <p className="text-gray-600">Conoce las campañas activas y únete a la causa.</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar campañas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <>
              {active.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Campañas activas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {active.map((c) => <CampaignCard key={c.id} campaign={c} />)}
                  </div>
                </section>
              )}
              {inactive.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-gray-500">Campañas finalizadas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-70">
                    {inactive.map((c) => <CampaignCard key={c.id} campaign={c} />)}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Megaphone className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">No hay campañas disponibles en este momento.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
