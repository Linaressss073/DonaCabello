import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Megaphone, Users, Heart, Calendar, Share2, Download, Image as ImageIcon } from "lucide-react";

export default function CampanasActivas() {
  const campanas = [
    {
      titulo: "Marzo Rosa 2026",
      descripcion: "Únete a nuestra campaña especial del mes de la mujer. Convoca a tus amigas, familiares y compañeras de trabajo para donar juntas y generar un impacto colectivo.",
      objetivo: "500 donaciones",
      progreso: 327,
      total: 500,
      fechaInicio: "1 de marzo",
      fechaFin: "31 de marzo",
      participantes: 327,
      estado: "Activa",
      icon: Heart
    },
    {
      titulo: "Empresas Solidarias",
      descripcion: "Empresas colombianas se unen para organizar jornadas de donación corporativas. Inscribe a tu empresa y coordina una jornada en tus oficinas.",
      objetivo: "15 empresas participando",
      empresas: 15,
      fechaInicio: "Febrero 2026",
      fechaFin: "Diciembre 2026",
      participantes: 243,
      estado: "Activa",
      icon: Users
    },
    {
      titulo: "Universidades con Causa",
      descripcion: "Estudiantes universitarios lideran la donación solidaria en sus campus. Inscribe a tu universidad y organiza jornadas con tus compañeros.",
      objetivo: "200 estudiantes donantes",
      progreso: 147,
      total: 200,
      fechaInicio: "Enero 2026",
      fechaFin: "Junio 2026",
      participantes: 147,
      estado: "Activa",
      icon: Megaphone
    }
  ];

  const materiales = [
    { tipo: "Poster A3", formato: "PDF", peso: "2.3 MB" },
    { tipo: "Banner redes sociales", formato: "PNG", peso: "890 KB" },
    { tipo: "Stories Instagram", formato: "PNG", peso: "450 KB" },
    { tipo: "Email signature", formato: "HTML", peso: "120 KB" },
    { tipo: "Volante digital", formato: "PDF", peso: "1.8 MB" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Campañas activas</h1>
          <p className="text-gray-600 mb-8">
            Únete a nuestras iniciativas colectivas y ayuda a sumar más donantes a la causa.
          </p>

          <PageInfo 
            title="Campañas"
            description="En esta sección encontrarás todas las campañas activas de DonaCabello. Puedes participar, difundir en tus redes y descargar material gráfico para compartir. Las campañas son una forma poderosa de sumar más donantes y generar impacto colectivo."
          />

          {/* Grid de campañas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {campanas.map((campana, idx) => {
              const Icon = campana.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="size-10 text-pink-600" />
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {campana.estado}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{campana.titulo}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {campana.descripcion}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {campana.progreso && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progreso</span>
                          <span className="font-medium">{campana.progreso}/{campana.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-pink-600 h-2 rounded-full transition-all" 
                            style={{ width: `${(campana.progreso / campana.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <span>{campana.fechaInicio} - {campana.fechaFin}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="size-4" />
                        <span>{campana.participantes} participantes</span>
                      </div>
                    </div>

                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Participar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Cómo participar */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">¿Cómo participar en una campaña?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-pink-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">Elige una campaña</h3>
                  <p className="text-xs text-gray-600">
                    Selecciona la campaña que más te interese o se alinee con tu comunidad
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-pink-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">Agenda tu donación</h3>
                  <p className="text-xs text-gray-600">
                    Reserva tu cita en un centro aliado y menciona la campaña al agendar
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-pink-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">Comparte</h3>
                  <p className="text-xs text-gray-600">
                    Descarga material de la campaña y difúndelo en tus redes sociales
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-pink-600">4</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">Suma donantes</h3>
                  <p className="text-xs text-gray-600">
                    Invita a amigos, familiares o compañeros a unirse a la causa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Material para compartir */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Share2 className="size-6 text-pink-600" />
                    Material para compartir
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Descarga recursos gráficos para difundir las campañas en redes sociales, email y medios impresos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materiales.map((material, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors border border-gray-200 hover:border-pink-200">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                      <ImageIcon className="size-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{material.tipo}</h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {material.formato} • {material.peso}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="mr-2 size-3" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Más materiales */}
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Más materiales próximamente</p>
                    <p className="text-xs text-gray-500">
                      Estamos creando nuevos recursos para compartir
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-blue-900">
                  Guía para compartir en redes
                </h4>
                <ul className="space-y-1 text-xs text-blue-800">
                  <li>• Usa el hashtag <strong>#DonaCabello</strong> y <strong>#DonaConfianza</strong></li>
                  <li>• Menciona a @donacabello en tus publicaciones</li>
                  <li>• Comparte tu experiencia personal para inspirar a otros</li>
                  <li>• Etiqueta al centro aliado donde donaste</li>
                  <li>• Respeta siempre la privacidad de los beneficiarios</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* CTA final */}
          <div className="mt-12 bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              ¿Quieres organizar tu propia campaña?
            </h2>
            <p className="mb-6 text-pink-100 max-w-2xl mx-auto">
              Si representas a una empresa, universidad u organización y quieres liderar una jornada 
              de donación colectiva, contáctanos para recibir apoyo y materiales personalizados.
            </p>
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
              Contactar al equipo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
