"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCenters, updateCenterStatus } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Center } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Loader2, MapPin, Phone, Mail, CheckCircle, XCircle, Clock } from "lucide-react";

const STATUS_MAP: Record<Center["status"], { label: string; variant: "success" | "warning" | "error" }> = {
  verified: { label: "Verificado", variant: "success" },
  pending:  { label: "En revisión", variant: "warning" },
  rejected: { label: "Rechazado",  variant: "error" },
};

const TABS: { key: Center["status"] | "all"; label: string }[] = [
  { key: "all",      label: "Todos" },
  { key: "pending",  label: "Pendientes" },
  { key: "verified", label: "Verificados" },
  { key: "rejected", label: "Rechazados" },
];

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Center["status"] | "all">("pending");

  const { data: centers, isLoading } = useQuery<Center[]>({
    queryKey: ["centers", "all"],
    queryFn: getCenters,
    enabled: !!user && user.role === "admin",
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Center["status"] }) =>
      updateCenterStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["centers"] }),
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

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Acceso restringido</h2>
            <p className="text-gray-600 mb-6">Este panel es exclusivo para administradores.</p>
            {!user && <Button asChild><Link href="/login">Ingresar</Link></Button>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filtered = tab === "all" ? centers : centers?.filter((c) => c.status === tab);

  const counts = {
    all:      centers?.length ?? 0,
    pending:  centers?.filter((c) => c.status === "pending").length  ?? 0,
    verified: centers?.filter((c) => c.status === "verified").length ?? 0,
    rejected: centers?.filter((c) => c.status === "rejected").length ?? 0,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
            <p className="text-gray-600 mt-1">Gestiona la verificación de centros aliados.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  tab === key
                    ? "border-rose-600 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                <span className="ml-1.5 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Lista */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((center) => {
                const { label, variant } = STATUS_MAP[center.status];
                const isPending = mutation.isPending && (mutation.variables as any)?.id === center.id;
                return (
                  <Card key={center.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{center.name}</CardTitle>
                        <Badge variant={variant}>{label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5 text-sm text-gray-600 mb-4">
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
                      </div>

                      {/* Acciones */}
                      <div className="flex gap-2">
                        {center.status !== "verified" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-600 hover:bg-green-50 hover:text-green-700"
                            disabled={isPending}
                            onClick={() => mutation.mutate({ id: center.id, status: "verified" })}
                          >
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-1" />
                            )}
                            Aprobar
                          </Button>
                        )}
                        {center.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            disabled={isPending}
                            onClick={() => mutation.mutate({ id: center.id, status: "rejected" })}
                          >
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-1" />
                            )}
                            Rechazar
                          </Button>
                        )}
                        {center.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                            disabled={isPending}
                            onClick={() => mutation.mutate({ id: center.id, status: "pending" })}
                          >
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            ) : (
                              <Clock className="h-4 w-4 mr-1" />
                            )}
                            Poner en revisión
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <CheckCircle className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">No hay centros en este estado.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
