import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function Index() {
  const pantallas = [
    { numero: "01", nombre: "Home", ruta: "/", descripcion: "Página principal con hero, cards de acceso rápido, cómo funciona, campañas e historias" },
    { numero: "02", nombre: "MegaMenu", ruta: "/mega-menu", descripcion: "Menú completo desplegado con todas las opciones y submenús organizados" },
    { numero: "03", nombre: "Donar - Guía", ruta: "/donar/guia", descripcion: "Guía paso a paso del proceso de donación con sidebar y checklist" },
    { numero: "04", nombre: "Donar - Agendar", ruta: "/donar/agendar", descripcion: "Formulario de agendamiento con avisos de validación" },
    { numero: "05", nombre: "Centros - Buscar", ruta: "/centros/buscar", descripcion: "Buscador con filtros y lista de centros aliados verificados" },
    { numero: "06", nombre: "Centros - Mapa", ruta: "/centros/mapa", descripcion: "Vista de mapa con pines y panel lateral de resultados" },
    { numero: "07", nombre: "Seguimiento - Estado", ruta: "/seguimiento", descripcion: "Timeline de estados Agendada → Realizada → Confirmada" },
    { numero: "08", nombre: "Campañas - Activas", ruta: "/campanas", descripcion: "Grid de campañas activas con material para compartir" },
    { numero: "09", nombre: "Comunidad - FAQ", ruta: "/comunidad/faq", descripcion: "Preguntas frecuentes con acordeones y sección mitos y verdades" },
    { numero: "10", nombre: "Centros - Registro", ruta: "/centros/registro", descripcion: "Formulario de registro para nuevos centros aliados" },
    { numero: "11", nombre: "Centros - Panel", ruta: "/centros/panel", descripcion: "Panel de gestión con tabla de citas y confirmación de donaciones" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            DonaCabello
          </h1>
          <p className="text-xl text-gray-600 mb-2">Prototipo NO funcional - Pantallas estáticas</p>
          <p className="text-sm text-gray-500">11 frames para navegación</p>
        </div>

        <Card className="mb-8 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Información del prototipo</CardTitle>
            <CardDescription>
              Este prototipo muestra las 11 pantallas solicitadas para DonaCabello, una plataforma 
              que conecta donantes con centros estéticos aliados verificados para donar cabello 
              a pacientes oncológicos en Colombia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Estilo:</strong> Moderno, limpio, accesible, sans-serif</p>
              <p><strong>Resolución:</strong> Desktop 1440px (responsive adaptable)</p>
              <p><strong>Elementos comunes:</strong> Header fijo, Footer, Menú principal, Bloque "¿Qué hace esta opción?"</p>
              <p><strong>Microcopy clave:</strong> "Centros aliados verificados", "Guía estandarizada", 
              "No recolectamos datos de salud", "Validación final la realiza el centro aliado"</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pantallas.map((pantalla) => (
            <Link key={pantalla.numero} to={pantalla.ruta}>
              <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white/80 backdrop-blur h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {pantalla.numero}
                    </div>
                    <CardTitle className="text-lg">{pantalla.nombre}</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {pantalla.descripcion}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Desarrollado para Figma Make</p>
          <p className="mt-1">Todas las pantallas incluyen navegación completa mediante el header</p>
        </div>
      </div>
    </div>
  );
}
