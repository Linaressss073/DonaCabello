import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, MapPin, Clock, Star, Phone, Calendar, Map } from "lucide-react";

export default function CentrosBuscar() {
  const centros = [
    {
      nombre: "Estética Bella",
      zona: "Chapinero",
      ciudad: "Bogotá",
      direccion: "Cra 7 #63-44",
      horarios: "Lun-Vie 9AM-6PM, Sáb 10AM-4PM",
      rating: 4.8,
      reviews: 127,
      verificado: true,
      servicios: ["Corte especializado", "Asesoría gratuita"],
      telefono: "+57 300 123 4567"
    },
    {
      nombre: "Salón Esperanza",
      zona: "Usaquén",
      ciudad: "Bogotá",
      direccion: "Calle 116 #15-08",
      horarios: "Lun-Sáb 8AM-7PM",
      rating: 4.9,
      reviews: 98,
      verificado: true,
      servicios: ["Corte especializado", "Empaque profesional", "Donación grupal"],
      telefono: "+57 301 234 5678"
    },
    {
      nombre: "Corte con Causa",
      zona: "Centro",
      ciudad: "Bogotá",
      direccion: "Calle 19 #5-14",
      horarios: "Lun-Vie 10AM-5PM",
      rating: 4.7,
      reviews: 84,
      verificado: true,
      servicios: ["Corte especializado", "Certificado de donación"],
      telefono: "+57 302 345 6789"
    },
    {
      nombre: "Belleza Solidaria",
      zona: "Suba",
      ciudad: "Bogotá",
      direccion: "Cra 91 #145-32",
      horarios: "Mar-Sáb 9AM-6PM",
      rating: 4.6,
      reviews: 56,
      verificado: true,
      servicios: ["Corte especializado", "Parking gratuito"],
      telefono: "+57 303 456 7890"
    },
  ];

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
            description="Esta sección te permite buscar y elegir centros estéticos aliados cercanos a tu ubicación. Todos los centros mostrados están verificados y siguen nuestra guía estandarizada. Puedes filtrar por ciudad, zona, horarios y servicios específicos."
          />

          <div className="flex gap-8">
            {/* Filtros sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Filtros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Buscador */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input 
                        placeholder="Nombre del centro..."
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Ciudad */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ciudad</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Todas las ciudades</option>
                      <option>Bogotá</option>
                      <option>Medellín</option>
                      <option>Cali</option>
                      <option>Barranquilla</option>
                    </select>
                  </div>

                  {/* Zona */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zona</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Todas las zonas</option>
                      <option>Norte</option>
                      <option>Sur</option>
                      <option>Centro</option>
                      <option>Oriente</option>
                      <option>Occidente</option>
                    </select>
                  </div>

                  {/* Horarios */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Horarios</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Abierto fines de semana</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Horario extendido</span>
                      </label>
                    </div>
                  </div>

                  {/* Servicios */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Servicios</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Asesoría gratuita</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Certificado</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Donación grupal</span>
                      </label>
                    </div>
                  </div>

                  {/* Solo verificados */}
                  <div className="pt-4 border-t">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Solo centros verificados</span>
                    </label>
                  </div>

                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    Aplicar filtros
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Resultados */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  Mostrando <strong>{centros.length} centros</strong> en Bogotá
                </p>
                <Link to="/centros/mapa">
                  <Button variant="outline" size="sm">
                    <Map className="mr-2 size-4" />
                    Ver en mapa
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {centros.map((centro, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{centro.nombre}</h3>
                                {centro.verificado && (
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    ✓ Verificado
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {centro.zona} • {centro.ciudad}
                              </p>
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
                            {centro.servicios.map((servicio, sidx) => (
                              <Badge key={sidx} variant="outline" className="text-xs">
                                {servicio}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2 lg:w-40">
                          <Button className="flex-1 lg:w-full bg-pink-600 hover:bg-pink-700">
                            Ver perfil
                          </Button>
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

              {/* Info adicional */}
              <Card className="mt-8 bg-pink-50 border-pink-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Sobre los centros verificados</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Todos han sido evaluados y aprobados por DonaCabello</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Siguen nuestra guía estandarizada de corte y empaque</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Confirman cada donación en el sistema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Reciben auditorías periódicas de calidad</span>
                    </li>
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
