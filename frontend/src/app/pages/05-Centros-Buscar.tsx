import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { LoadingCards } from "../components/LoadingCards";
import { AlertBanner } from "../components/AlertBanner";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, MapPin, Clock, Star, Phone, Calendar, Map } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getCenters } from "../../api";
import type { CenterFilters } from "../../types";

export default function CentrosBuscar() {
  const [filters, setFilters] = useState<CenterFilters>({ soloVerificados: true });
  const [pendingFilters, setPendingFilters] = useState<CenterFilters>({ soloVerificados: true });

  const { data: centros, loading, error } = useApi(() => getCenters(filters), [filters]);

  function applyFilters() {
    setFilters({ ...pendingFilters });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Centros aliados verificados</h1>
            <p className="text-gray-600">
              Encuentra un centro cercano para realizar tu donación de forma segura y confiable.
            </p>
          </div>

          <PageInfo
            title="Centros Aliados"
            description="Busca y elige centros estéticos aliados cercanos. Todos los centros mostrados están verificados y siguen nuestra guía estandarizada."
          />

          <div className="flex gap-8">
            {/* Filtros sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Filtros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        placeholder="Nombre del centro..."
                        className="pl-9"
                        value={pendingFilters.nombre ?? ''}
                        onChange={(e) => setPendingFilters((p) => ({ ...p, nombre: e.target.value || undefined }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ciudad</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={pendingFilters.ciudad ?? ''}
                      onChange={(e) => setPendingFilters((p) => ({ ...p, ciudad: e.target.value || undefined }))}
                    >
                      <option value="">Todas las ciudades</option>
                      <option value="bogota">Bogotá</option>
                      <option value="medellin">Medellín</option>
                      <option value="cali">Cali</option>
                      <option value="barranquilla">Barranquilla</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zona</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={pendingFilters.zona ?? ''}
                      onChange={(e) => setPendingFilters((p) => ({ ...p, zona: e.target.value || undefined }))}
                    >
                      <option value="">Todas las zonas</option>
                      <option value="norte">Norte</option>
                      <option value="sur">Sur</option>
                      <option value="centro">Centro</option>
                      <option value="oriente">Oriente</option>
                      <option value="occidente">Occidente</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Horarios</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={pendingFilters.finDeSemana ?? false}
                          onChange={(e) => setPendingFilters((p) => ({ ...p, finDeSemana: e.target.checked || undefined }))}
                        />
                        <span>Abierto fines de semana</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={pendingFilters.horarioExtendido ?? false}
                          onChange={(e) => setPendingFilters((p) => ({ ...p, horarioExtendido: e.target.checked || undefined }))}
                        />
                        <span>Horario extendido</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={pendingFilters.soloVerificados ?? true}
                        onChange={(e) => setPendingFilters((p) => ({ ...p, soloVerificados: e.target.checked }))}
                      />
                      <span>Solo centros verificados</span>
                    </label>
                  </div>

                  <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={applyFilters}>
                    Aplicar filtros
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Resultados */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  {loading
                    ? 'Buscando centros...'
                    : <span>Mostrando <strong>{centros?.length ?? 0} centros</strong></span>
                  }
                </p>
                <Link to="/centros/mapa">
                  <Button variant="outline" size="sm">
                    <Map className="mr-2 size-4" />
                    Ver en mapa
                  </Button>
                </Link>
              </div>

              {error && (
                <AlertBanner variant="error" className="mb-4">
                  Error al cargar los centros: {error}
                </AlertBanner>
              )}

              {loading ? (
                <LoadingCards count={3} variant="list" />
              ) : (
                <div className="space-y-4">
                  {(centros ?? []).map((centro) => (
                    <Card key={centro.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold">{centro.nombre}</h3>
                                  {centro.verificado && <VerifiedBadge />}
                                </div>
                                <p className="text-sm text-gray-600">{centro.zona} • {centro.ciudad}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{centro.rating}</span>
                                <span className="text-sm text-gray-500">({centro.reviews})</span>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-start gap-2 text-sm text-gray-700">
                                <MapPin className="size-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                <span>{centro.direccion}</span>
                              </div>
                              <div className="flex items-start gap-2 text-sm text-gray-700">
                                <Clock className="size-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                <span>{centro.horarios}</span>
                              </div>
                              <div className="flex items-start gap-2 text-sm text-gray-700">
                                <Phone className="size-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                <span>{centro.telefono}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {centro.servicios.map((s) => (
                                <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex lg:flex-col gap-2 lg:w-40">
                            <Button className="flex-1 lg:w-full bg-pink-600 hover:bg-pink-700">Ver perfil</Button>
                            <Link to="/donar/agendar" className="flex-1">
                              <Button variant="outline" className="w-full">
                                <Calendar className="mr-2 size-4" />
                                Agendar
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Card className="mt-8 bg-pink-50 border-pink-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Sobre los centros verificados</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {[
                      'Todos han sido evaluados y aprobados por DonaCabello',
                      'Siguen nuestra guía estandarizada de corte y empaque',
                      'Confirman cada donación en el sistema',
                      'Reciben auditorías periódicas de calidad',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-pink-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
