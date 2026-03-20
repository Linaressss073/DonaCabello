import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                <a href="mailto:info@donacabello.co" className="hover:text-pink-600">
                  info@donacabello.co
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4" />
                <a href="tel:+573001234567" className="hover:text-pink-600">
                  +57 300 123 4567
                </a>
              </li>
            </ul>
          </div>

          {/* Aliados */}
          <div>
            <h3 className="font-semibold mb-4">Aliados</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/centros/buscar" className="text-gray-600 hover:text-pink-600">
                  Centros aliados verificados
                </Link>
              </li>
              <li>
                <Link to="/centros/registro" className="text-gray-600 hover:text-pink-600">
                  Registrar mi centro
                </Link>
              </li>
              <li>
                <Link to="/centros/panel" className="text-gray-600 hover:text-pink-600">
                  Panel de centros
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/comunidad/faq" className="text-gray-600 hover:text-pink-600">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  Política de privacidad
                </a>
              </li>
              <li>
                <Link to="/index" className="text-gray-600 hover:text-pink-600">
                  Mapa del sitio
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:border-pink-600 hover:text-pink-600 transition-colors"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:border-pink-600 hover:text-pink-600 transition-colors"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white border border-gray-200 rounded-lg hover:border-pink-600 hover:text-pink-600 transition-colors"
              >
                <Twitter className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2026 DonaCabello. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">
            No recolectamos datos de salud. Validación final la realiza el centro aliado.
          </p>
        </div>
      </div>
    </footer>
  );
}
