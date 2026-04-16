"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyCenters } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Center } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Plus, Loader2, MapPin, Phone, Mail } from "lucide-react";

export default function PanelPage() {
  const { user, isLoading: authLoading } = useAuth();

  const { data: centers, isLoading } = useQuery<Center[]>({
    queryKey: ["centers", "my"],
    queryFn: getMyCenters,
    enabled: !!user && user.role === "center",
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || user.role !== "center") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Acceso restringido</h2>
            <p className="text-gray-600 mb-6">Este panel es solo para centros aliados registrados.</p>
            {!user && <Button asChild><Link href="/login">Ingresar</Link></Button>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const STATUS_MAP: Record<Center["status"], { label: string; variant: "success" | "warning" | "error" }> = {
    verified: { label: "Verificado", variant: "success" },
    pending: { label: "En revisión", variant: "warning" },
    rejected: { label: "Rechazado", variant: "error" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de control</h1>
              <p className="text-gray-600 mt-1">Hola, {user.name.split(" ")[0]}. Gestiona tu centro aliado.</p>
            </div>
            <Button asChild>
              <Link href="/centros/registro">
                <Plus className="h-4 w-4 mr-2" /> Registrar centro
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)}
            </div>
          ) : centers && centers.length > 0 ? (
            <div className="space-y-4">
              {centers.map((center) => {
                const { label, variant } = STATUS_MAP[center.status];
                return (
                  <Card key={center.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{center.name}</CardTitle>
                        <Badge variant={variant}>{label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{center.address}, {center.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{center.email}</span>
                      </div>
                      {center.description && (
                        <p className="text-gray-500 pt-1">{center.description}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <MapPin className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Aún no tienes centros registrados.</p>
              <Button asChild>
                <Link href="/centros/registro">Registrar mi centro</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
