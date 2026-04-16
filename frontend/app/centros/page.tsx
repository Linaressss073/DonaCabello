"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getCenters } from "@/lib/api";
import { Center } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CenterCard } from "@/components/CenterCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { MapPin, List, Map, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const CentersMap = dynamic(() => import("@/components/CentersMap").then((m) => m.CentersMap), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />,
});

export default function CentrosPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [search, setSearch] = useState("");

  const { data: centers, isLoading } = useQuery<Center[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const filtered = (centers ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header section */}
        <section className="bg-gradient-to-br from-blue-50 to-white border-b border-blue-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Centros aliados</h1>
            <p className="text-gray-600">Encuentra el centro estético verificado más cercano a ti.</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o ciudad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4 mr-1.5" /> Lista
              </Button>
              <Button
                variant={view === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("map")}
              >
                <Map className="h-4 w-4 mr-1.5" /> Mapa
              </Button>
            </div>
          </div>

          {/* Map view */}
          {view === "map" && (
            <div className="h-[500px] mb-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <CentersMap centers={filtered} />
              )}
            </div>
          )}

          {/* List view */}
          {view === "list" && (
            <>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-3 p-6 border border-gray-200 rounded-xl">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    {filtered.length} centro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((center) => (
                      <CenterCard key={center.id} center={center} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <MapPin className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500">No se encontraron centros{search ? ` para "${search}"` : ""}.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
