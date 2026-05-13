"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCampaigns, getMyCenters, createCampaign, updateCampaign, deleteCampaign } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Campaign, Center } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Megaphone, Search, Plus, X, Loader2, Pencil, Trash2,
  AlertCircle, CheckCircle, Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "mock-1",
    title: "Campaña Primavera 2025",
    description: "Ayúdanos a reunir 50 donaciones antes del 30 de mayo. Las pelucas se entregarán a niñas en tratamiento oncológico del Hospital Nacional.",
    imageUrl: "",
    centerId: "c1",
    startDate: "2025-03-01",
    endDate: "2025-05-30",
    goal: 50,
    current: 34,
    active: true,
    createdAt: "2025-03-01",
    updatedAt: "2025-05-01",
  },
  {
    id: "mock-2",
    title: "100 Pelucas para Colombia",
    description: "Meta nacional: reunir cabello para fabricar 100 pelucas para pacientes oncológicos en hospitales públicos de todo el país.",
    imageUrl: "",
    centerId: "c2",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    goal: 100,
    current: 67,
    active: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-04-20",
  },
  {
    id: "mock-3",
    title: "Día de la Mujer — Edición Especial",
    description: "Campaña especial del 8 de marzo. Cada donación en este mes va directamente a mujeres en recuperación postoperatoria.",
    imageUrl: "",
    centerId: "c3",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    goal: 30,
    current: 28,
    active: false,
    createdAt: "2025-02-20",
    updatedAt: "2025-03-31",
  },
  {
    id: "mock-4",
    title: "Cabello para Bogotá",
    description: "Campaña regional para abastecer los centros aliados de Bogotá. Busca apoyar a más de 40 beneficiarias este semestre.",
    imageUrl: "",
    centerId: "c4",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    goal: 40,
    current: 12,
    active: true,
    createdAt: "2025-04-01",
    updatedAt: "2025-05-10",
  },
];

const createSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().optional(),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  centerId: z.string().min(1, "Selecciona un centro"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  goal: z.coerce.number().min(0).optional(),
});
type CreateForm = z.infer<typeof createSchema>;

const editSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().optional(),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  goal: z.coerce.number().min(0).optional(),
  current: z.coerce.number().min(0).optional(),
  active: z.boolean().optional(),
});
type EditForm = z.infer<typeof editSchema>;

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CreateCampaignForm({ centers, onClose, onSuccess }: { centers: Center[]; onClose: () => void; onSuccess: () => void }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateForm>({
    resolver: zodResolver(createSchema),
  });

  const onSubmit = async (data: CreateForm) => {
    setError("");
    try {
      await createCampaign({ ...data, imageUrl: data.imageUrl || undefined, startDate: data.startDate || undefined, endDate: data.endDate || undefined });
      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al crear la campaña");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      {error && <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"><AlertCircle className="h-4 w-4 shrink-0" /> {error}</div>}
      <div className="space-y-1.5">
        <Label>Título *</Label>
        <Input {...register("title")} placeholder="Ej: Campaña Primavera 2025" />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Descripción</Label>
        <Textarea {...register("description")} rows={3} placeholder="Describe el objetivo de la campaña..." />
      </div>
      <div className="space-y-1.5">
        <Label>URL de imagen (opcional)</Label>
        <Input {...register("imageUrl")} placeholder="https://..." />
        {errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Centro aliado *</Label>
        <select {...register("centerId")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500">
          <option value="">Selecciona un centro</option>
          {centers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {errors.centerId && <p className="text-xs text-red-500">{errors.centerId.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5"><Label>Fecha inicio</Label><Input type="date" {...register("startDate")} /></div>
        <div className="space-y-1.5"><Label>Fecha fin</Label><Input type="date" {...register("endDate")} /></div>
      </div>
      <div className="space-y-1.5">
        <Label>Meta (donaciones)</Label>
        <Input type="number" min={0} {...register("goal")} placeholder="0" />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Crear campaña
        </Button>
      </div>
    </form>
  );
}

function EditCampaignForm({ campaign, onClose, onSuccess }: { campaign: Campaign; onClose: () => void; onSuccess: () => void }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: campaign.title,
      description: campaign.description ?? "",
      imageUrl: campaign.imageUrl ?? "",
      startDate: campaign.startDate ? campaign.startDate.slice(0, 10) : "",
      endDate: campaign.endDate ? campaign.endDate.slice(0, 10) : "",
      goal: campaign.goal,
      current: campaign.current,
      active: campaign.active,
    },
  });

  const onSubmit = async (data: EditForm) => {
    setError("");
    try {
      await updateCampaign(campaign.id, { ...data, imageUrl: data.imageUrl || undefined, startDate: data.startDate || undefined, endDate: data.endDate || undefined });
      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al guardar los cambios");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      {error && <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"><AlertCircle className="h-4 w-4 shrink-0" /> {error}</div>}
      <div className="space-y-1.5">
        <Label>Título *</Label>
        <Input {...register("title")} />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Descripción</Label>
        <Textarea {...register("description")} rows={3} />
      </div>
      <div className="space-y-1.5">
        <Label>URL de imagen (opcional)</Label>
        <Input {...register("imageUrl")} placeholder="https://..." />
        {errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5"><Label>Fecha inicio</Label><Input type="date" {...register("startDate")} /></div>
        <div className="space-y-1.5"><Label>Fecha fin</Label><Input type="date" {...register("endDate")} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5"><Label>Meta</Label><Input type="number" min={0} {...register("goal")} /></div>
        <div className="space-y-1.5"><Label>Donaciones actuales</Label><Input type="number" min={0} {...register("current")} /></div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="active" {...register("active")} className="accent-rose-600" />
        <Label htmlFor="active">Campaña activa</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Guardar cambios
        </Button>
      </div>
    </form>
  );
}

export default function CampanasPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Campaign | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  const { data: myCenters } = useQuery<Center[]>({
    queryKey: ["centers", "my"],
    queryFn: getMyCenters,
    enabled: !!user && user.role === "center",
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      setDeleteConfirm(null);
      setDeleteError("");
    },
    onError: (err: any) => {
      setDeleteError(err?.response?.data?.message ?? "Error al eliminar");
    },
  });

  const displayCampaigns = (campaigns && campaigns.length > 0) ? campaigns : MOCK_CAMPAIGNS;
  const isMock = !campaigns || campaigns.length === 0;

  const filtered = displayCampaigns.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const active = filtered.filter((c) => c.active);
  const inactive = filtered.filter((c) => !c.active);

  const isCenter = !!user && user.role === "center";
  const myCenterIds = new Set((myCenters ?? []).map((c) => c.id));

  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    setShowForm(false);
    setEditing(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {showForm && (
        <ModalShell title="Nueva campaña" onClose={() => setShowForm(false)}>
          <CreateCampaignForm
            centers={myCenters ?? []}
            onClose={() => setShowForm(false)}
            onSuccess={handleFormSuccess}
          />
        </ModalShell>
      )}

      {editing && (
        <ModalShell title="Editar campaña" onClose={() => setEditing(undefined)}>
          <EditCampaignForm
            campaign={editing}
            onClose={() => setEditing(undefined)}
            onSuccess={handleFormSuccess}
          />
        </ModalShell>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <Trash2 className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">¿Eliminar campaña?</h3>
            <p className="text-sm text-gray-500 mb-4">Esta acción no se puede deshacer.</p>
            {deleteError && (
              <p className="text-xs text-red-500 mb-3">{deleteError}</p>
            )}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setDeleteConfirm(null); setDeleteError(""); }}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteMutation.mutate(deleteConfirm)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Campañas de donación</h1>
                <p className="text-gray-600">Conoce las campañas activas y súmate a la causa. Cada donación cuenta.</p>
              </div>
              {isCenter && (myCenters ?? []).length > 0 && (
                <Button onClick={() => setShowForm(true)} className="shrink-0">
                  <Plus className="h-4 w-4 mr-2" /> Nueva campaña
                </Button>
              )}
            </div>

            {/* Stats rápidas */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <span className="text-2xl font-bold text-orange-600">{active.length}</span>
                <span className="text-sm text-gray-500 ml-1.5">campañas activas</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800">
                  {displayCampaigns.reduce((s, c) => s + c.current, 0)}
                </span>
                <span className="text-sm text-gray-500 ml-1.5">donaciones totales</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800">
                  {displayCampaigns.reduce((s, c) => s + c.goal, 0)}
                </span>
                <span className="text-sm text-gray-500 ml-1.5">meta total</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isMock && (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Mostrando campañas de ejemplo. Los datos reales aparecerán cuando haya campañas registradas.
            </div>
          )}

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
                  <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    Campañas activas
                    <Badge variant="success">{active.length}</Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {active.map((c) => (
                      <div key={c.id} className="relative group">
                        <CampaignCard campaign={c} />
                        {isCenter && myCenterIds.has(c.centerId) && !isMock && (
                          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditing(c)}
                              className="p-1.5 bg-white rounded-lg shadow border text-gray-600 hover:text-rose-600"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => { setDeleteConfirm(c.id); setDeleteError(""); }}
                              className="p-1.5 bg-white rounded-lg shadow border text-gray-600 hover:text-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {inactive.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-gray-400 flex items-center gap-2">
                    Campañas finalizadas
                    <Badge variant="outline">{inactive.length}</Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-70">
                    {inactive.map((c) => (
                      <div key={c.id} className="relative group">
                        <CampaignCard campaign={c} />
                        {isCenter && myCenterIds.has(c.centerId) && !isMock && (
                          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditing(c)}
                              className="p-1.5 bg-white rounded-lg shadow border text-gray-600 hover:text-rose-600"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => { setDeleteConfirm(c.id); setDeleteError(""); }}
                              className="p-1.5 bg-white rounded-lg shadow border text-gray-600 hover:text-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Megaphone className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No se encontraron campañas.</p>
              {isCenter && (myCenters ?? []).length > 0 && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Crear primera campaña
                </Button>
              )}
            </div>
          )}

          {/* CTA para centros sin campañas */}
          {isCenter && (myCenters ?? []).length > 0 && !isMock && (campaigns ?? []).length === 0 && (
            <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
              <Megaphone className="h-10 w-10 text-orange-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Crea tu primera campaña</h3>
              <p className="text-sm text-gray-600 mb-4">Las campañas te ayudan a impulsar la recolección de cabello en tu centro.</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" /> Nueva campaña
              </Button>
            </div>
          )}

          {/* CTA público */}
          {!user && (
            <div className="mt-12 bg-rose-600 text-white rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">¿Quieres participar?</h3>
              <p className="text-rose-100 mb-6">Agenda tu cita en un centro aliado y contribuye a una campaña activa.</p>
              <Button className="bg-white text-rose-600 hover:bg-rose-50" asChild>
                <Link href="/donar/agendar">Agendar donación</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
