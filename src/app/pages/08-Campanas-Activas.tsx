import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { CampaignCard } from "../components/CampaignCard";
import { LoadingCards } from "../components/LoadingCards";
import { CTABanner } from "../components/CTABanner";
import { AlertBanner } from "../components/AlertBanner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Share2, Download, Image as ImageIcon } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getCampaigns } from "../../api";

const MATERIALES = [
  { tipo: "Poster A3",             formato: "PDF", peso: "2.3 MB" },
  { tipo: "Banner redes sociales", formato: "PNG", peso: "890 KB" },
  { tipo: "Stories Instagram",     formato: "PNG", peso: "450 KB" },
  { tipo: "Email signature",       formato: "HTML", peso: "120 KB" },
  { tipo: "Volante digital",       formato: "PDF", peso: "1.8 MB" },
];

export default function CampanasActivas() {
  const { data: campanas, loading, error } = useApi(() => getCampaigns(), []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Campañas activas</h1>
          <p className="text-gray-600 mb-8">Únete a nuestras iniciativas colectivas y ayuda a sumar más donantes.</p>

          <PageInfo
            title="Campañas"
            description="Aquí encontrarás todas las campañas activas. Puedes participar, difundir en tus redes y descargar material gráfico."
          />

          {error && (
            <AlertBanner variant="error" className="mb-6">
              Error al cargar las campañas: {error}
            </AlertBanner>
          )}

          {/* Grid campañas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {loading
              ? <LoadingCards count={3} />
              : (campanas ?? []).map((c) => <CampaignCard key={c.id} campaign={c} />)
            }
          </div>

          {/* ¿Cómo participar? */}
          <Card className="mb-12">
            <CardHeader><CardTitle className="text-2xl">¿Cómo participar en una campaña?</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { n: 1, title: 'Elige una campaña',  desc: 'Selecciona la campaña que más te interese o se alinee con tu comunidad' },
                  { n: 2, title: 'Agenda tu donación', desc: 'Reserva tu cita en un centro aliado y menciona la campaña al agendar' },
                  { n: 3, title: 'Comparte',           desc: 'Descarga material de la campaña y difúndelo en tus redes sociales' },
                  { n: 4, title: 'Suma donantes',      desc: 'Invita a amigos, familiares o compañeros a unirse a la causa' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-pink-600">{n}</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm">{title}</h3>
                    <p className="text-xs text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Material para compartir */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Share2 className="size-6 text-pink-600" />
                Material para compartir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MATERIALES.map((m) => (
                  <div key={m.tipo} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors border border-gray-200 hover:border-pink-200">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                      <ImageIcon className="size-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{m.tipo}</h4>
                      <p className="text-xs text-gray-600 mb-2">{m.formato} • {m.peso}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="mr-2 size-3" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Más materiales próximamente</p>
                    <p className="text-xs text-gray-500">Estamos creando nuevos recursos para compartir</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-blue-900">Guía para compartir en redes</h4>
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

          {/* CTA */}
          <CTABanner
            className="mt-12"
            title="¿Quieres organizar tu propia campaña?"
            description="Si representas a una empresa, universidad u organización y quieres liderar una jornada de donación colectiva, contáctanos para recibir apoyo y materiales personalizados."
          >
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
              Contactar al equipo
            </Button>
          </CTABanner>
        </div>
      </main>

      <Footer />
    </div>
  );
}
