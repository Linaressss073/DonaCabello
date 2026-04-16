import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
              DonaCabello
            </Link>
            <p className="text-sm">
              Conectamos donantes con centros aliados verificados para apoyar a pacientes oncológicos en Colombia.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Donar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/donar/guia" className="hover:text-white transition-colors">Cómo donar</Link></li>
              <li><Link href="/donar/agendar" className="hover:text-white transition-colors">Agendar cita</Link></li>
              <li><Link href="/centros" className="hover:text-white transition-colors">Encontrar un centro</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/campanas" className="hover:text-white transition-colors">Campañas activas</Link></li>
              <li><Link href="/comunidad" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><Link href="/comunidad#contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Centros aliados</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/centros/registro" className="hover:text-white transition-colors">Registrar mi centro</Link></li>
              <li><Link href="/panel" className="hover:text-white transition-colors">Panel de control</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-center">
          © {new Date().getFullYear()} DonaCabello. Hecho con <Heart className="inline h-3 w-3 fill-rose-500 text-rose-500" /> en Colombia.
        </div>
      </div>
    </footer>
  );
}
