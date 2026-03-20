import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Heart, MapPin, Calendar, Megaphone, Users, Building2, ChevronRight } from "lucide-react";

export default function MegaMenu() {
  const menuSections = [
    {
      title: "Inicio",
      icon: Heart,
      color: "text-pink-600",
      description: "Guía rápida para empezar y generar confianza",
      items: [
        { label: "Cómo donar", href: "/donar/guia", desc: "Pasos para realizar tu donación" },
        { label: "Requisitos", href: "/donar/guia", desc: "Condiciones mínimas para donar" },
        { label: "Historias", href: "/", desc: "Testimonios de donantes y beneficiarios" },
      ],
    },
    {
      title: "Donar Cabello",
      icon: Heart,
      color: "text-pink-600",
      description: "Pasos claros y proceso de agendamiento",
      items: [
        { label: "Guía paso a paso", href: "/donar/guia", desc: "Proceso completo de donación" },
        { label: "Checklist", href: "/donar/guia", desc: "Verifica que cumples todos los requisitos" },
        { label: "Agendar", href: "/donar/agendar", desc: "Reserva tu cita en un centro aliado" },
      ],
    },
    {
      title: "Centros Aliados",
      icon: MapPin,
      color: "text-blue-600",
      description: "Encuentra centros cercanos y confiables",
      items: [
        { label: "Buscar", href: "/centros/buscar", desc: "Lista de centros con filtros" },
        { label: "Mapa", href: "/centros/mapa", desc: "Visualiza centros en el mapa" },
        { label: "Verificados", href: "/centros/buscar", desc: "Solo centros con validación oficial" },
      ],
    },
    {
      title: "Seguimiento",
      icon: Calendar,
      color: "text-purple-600",
      description: "Consulta estados: Agendada → Realizada → Confirmada",
      items: [
        { label: "Mis citas", href: "/seguimiento", desc: "Historial de citas programadas" },
        { label: "Estado", href: "/seguimiento", desc: "Seguimiento en tiempo real" },
        { label: "Confirmación del centro", href: "/seguimiento", desc: "Validación oficial de la donación" },
      ],
    },
    {
      title: "Campañas",
      icon: Megaphone,
      color: "text-orange-600",
      description: "Difunde y suma más donantes",
      items: [
        { label: "Activas", href: "/campanas", desc: "Campañas en curso y próximas" },
        { label: "Cómo participar", href: "/campanas", desc: "Únete a iniciativas colectivas" },
        { label: "Material para compartir", href: "/campanas", desc: "Descarga posters y contenido" },
      ],
    },
    {
      title: "Comunidad y Apoyo",
      icon: Users,
      color: "text-green-600",
      description: "Resuelve dudas y combate la desinformación",
      items: [
        { label: "FAQ", href: "/comunidad/faq", desc: "Preguntas frecuentes sobre donación" },
        { label: "Mitos y verdades", href: "/comunidad/faq", desc: "Información verificada" },
        { label: "Contacto", href: "/comunidad/faq", desc: "Escríbenos tus consultas" },
      ],
    },
    {
      title: "Para Centros",
      icon: Building2,
      color: "text-indigo-600",
      description: "Gestión de citas y confirmaciones",
      items: [
        { label: "Registrar mi centro", href: "/centros/registro", desc: "Únete como centro aliado" },
        { label: "Panel", href: "/centros/panel", desc: "Administra tus citas y donaciones" },
        { label: "Confirmar donaciones", href: "/centros/panel", desc: "Valida las donaciones realizadas" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Menú completo</h1>
            <p className="text-gray-600">
              Explora todas las opciones disponibles en DonaCabello. Cada sección incluye herramientas 
              específicas para donantes, centros aliados y la comunidad.
            </p>
          </div>

          {/* Info de la página */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-lg text-blue-900 mb-2">
              ¿Qué hace esta opción?
            </h2>
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Menú completo:</strong> Este megamenú te muestra todas las secciones y funcionalidades 
              de DonaCabello organizadas por categorías. Cada opción incluye una breve descripción para que 
              encuentres rápidamente lo que necesitas.
            </p>
          </div>

          {/* Megamenú grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className={`size-8 ${section.color}`} />
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg mb-1">{section.title}</h2>
                      <p className="text-xs text-gray-500">{section.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-start gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.label}</span>
                            <ChevronRight className="size-4 text-gray-400 group-hover:text-pink-600 transition-colors" />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Información importante */}
          <div className="mt-12 bg-pink-50 border border-pink-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Información importante</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Todos los centros mostrados son <strong>centros aliados verificados</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Utilizamos una <strong>guía estandarizada</strong> para asegurar la calidad de cada donación</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span><strong>No recolectamos datos de salud</strong> de los donantes ni beneficiarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>La <strong>validación final la realiza el centro aliado</strong> después de cada donación</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
