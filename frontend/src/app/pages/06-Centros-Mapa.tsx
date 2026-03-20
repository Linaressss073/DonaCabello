import { useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PageInfo } from '../components/PageInfo';
import { CentersMap } from '../components/CentersMap';
import { LoadingCards } from '../components/LoadingCards';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Star, Calendar, List, Phone } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getCenters } from '../../api';
import type { Center } from '../../types';

export default function CentrosMapa() {
  const { data: centros, loading } = useApi(() => getCenters({ soloVerificados: true }), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectCenter = (center: Center) => setSelectedId(center.id);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Mapa de centros aliados</h1>
              <p className="text-gray-600">
                Visualiza todos los centros verificados en tu ciudad y encuentra el más cercano.
              </p>
            </div>
            <Link to="/centros/buscar">
              <Button variant="outline">
                <List className="mr-2 size-4" />
                Vista de lista
              </Button>
            </Link>
          </div>

          <PageInfo
            title="Centros Aliados - Mapa"
            description="La vista de mapa te permite encontrar visualmente los centros aliados verificados más cercanos. Haz clic en cada pin para ver información detallada y agendar directamente."
          />

          <div className="flex gap-6">
            {/* Google Map */}
            <div className="flex-1 rounded-lg overflow-hidden" style={{ minHeight: '600px' }}>
              <CentersMap
                centers={centros ?? []}
                selectedId={selectedId}
                onSelectCenter={handleSelectCenter}
              />
            </div>

            {/* Panel lateral */}
            <aside className="w-80 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Centros cercanos</h3>
                    <p className="text-sm text-gray-600">
                      {loading ? 'Cargando...' : `${centros?.length ?? 0} centros verificados`}
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {loading ? (
                      <LoadingCards count={3} variant="sidebar" />
                    ) : (
                      (centros ?? []).map((centro) => (
                        <button
                          key={centro.id}
                          type="button"
                          onClick={() => handleSelectCenter(centro)}
                          className={`w-full text-left p-3 rounded-lg transition-colors border ${
                            centro.id === selectedId
                              ? 'bg-pink-50 border-pink-300'
                              : 'bg-gray-50 hover:bg-pink-50 border-transparent hover:border-pink-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{centro.nombre}</h4>
                                {centro.verificado && <VerifiedBadge compact />}
                              </div>
                              <p className="text-xs text-gray-600">{centro.zona}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="size-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{centro.rating}</span>
                            </div>
                          </div>

                          <div className="space-y-1 mb-3">
                            <div className="flex items-start gap-1 text-xs text-gray-600">
                              <MapPin className="size-3 mt-0.5 flex-shrink-0" />
                              <span>{centro.direccion}</span>
                            </div>
                            <div className="flex items-start gap-1 text-xs text-gray-600">
                              <Phone className="size-3 mt-0.5 flex-shrink-0" />
                              <span>{centro.telefono}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link to="/donar/agendar" className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <Button size="sm" className="w-full h-8 text-xs bg-pink-600 hover:bg-pink-700">
                                <Calendar className="mr-1 size-3" />
                                Agendar
                              </Button>
                            </Link>
                          </div>
                        </button>
                      ))
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Link to="/centros/buscar">
                      <Button variant="outline" size="sm" className="w-full">Ver todos en lista</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Cómo usar el mapa</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Haz clic en los pines rosados para ver información del centro',
                  'Usa el panel lateral para ver la lista completa de centros',
                  'Usa los controles del mapa para hacer zoom y explorar zonas',
                  'Agenda directamente desde el panel lateral',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
