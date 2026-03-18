import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { MapPin, Star, Calendar, List, Phone } from "lucide-react";

export default function CentrosMapa() {
  const centros = [
    {
      nombre: "Estética Bella",
      zona: "Chapinero",
      direccion: "Cra 7 #63-44",
      rating: 4.8,
      verificado: true,
      telefono: "+57 300 123 4567"
    },
    {
      nombre: "Salón Esperanza",
      zona: "Usaquén",
      direccion: "Calle 116 #15-08",
      rating: 4.9,
      verificado: true,
      telefono: "+57 301 234 5678"
    },
    {
      nombre: "Corte con Causa",
      zona: "Centro",
      direccion: "Calle 19 #5-14",
      rating: 4.7,
      verificado: true,
      telefono: "+57 302 345 6789"
    },
    {
      nombre: "Belleza Solidaria",
      zona: "Suba",
      direccion: "Cra 91 #145-32",
      rating: 4.6,
      verificado: true,
      telefono: "+57 303 456 7890"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
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
          </div>

          <PageInfo 
            title="Centros Aliados - Mapa"
            description="La vista de mapa te permite encontrar visualmente los centros aliados verificados más cercanos a tu ubicación. Haz clic en cada pin para ver información detallada y agendar directamente desde el mapa."
          />

          <div className="flex gap-6">
            {/* Mapa (simulado) */}
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative" style={{ minHeight: "600px" }}>
              {/* Simulación de mapa */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center p-8">
                  <MapPin className="size-16 text-pink-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Mapa interactivo de Bogotá
                  </p>
                  <p className="text-sm text-gray-500">
                    Vista de prototipo estático - En producción mostraría un mapa real con pines interactivos
                  </p>
                </div>
              </div>

              {/* Pines simulados en el mapa */}
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-pink-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <MapPin className="size-4 text-white" />
              </div>
              <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-pink-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <MapPin className="size-4 text-white" />
              </div>
              <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-pink-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <MapPin className="size-4 text-white" />
              </div>
              <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-pink-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <MapPin className="size-4 text-white" />
              </div>

              {/* Controles del mapa */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">+</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">−</button>
              </div>

              {/* Leyenda */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                  <span>Centro verificado</span>
                </div>
              </div>
            </div>

            {/* Panel lateral con resultados */}
            <aside className="w-80 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Centros cercanos</h3>
                    <p className="text-sm text-gray-600">
                      {centros.length} centros verificados en Bogotá
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {centros.map((centro, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors border border-transparent hover:border-pink-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{centro.nombre}</h4>
                              {centro.verificado && (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-1.5 py-0">
                                  ✓
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{centro.zona}</p>
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
                          <Button size="sm" className="flex-1 h-8 text-xs bg-pink-600 hover:bg-pink-700">
                            Ver
                          </Button>
                          <Link to="/donar/agendar" className="flex-1">
                            <Button size="sm" variant="outline" className="w-full h-8 text-xs">
                              <Calendar className="mr-1 size-3" />
                              Agendar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Link to="/centros/buscar">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver todos en lista
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* Info adicional */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Cómo usar el mapa</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">1.</span>
                  <span>Haz clic en los pines rosados para ver información del centro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">2.</span>
                  <span>Usa el panel lateral para ver la lista completa de centros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">3.</span>
                  <span>Haz zoom con los botones + y - para explorar diferentes zonas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">4.</span>
                  <span>Agenda directamente desde el mapa o desde el panel lateral</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
