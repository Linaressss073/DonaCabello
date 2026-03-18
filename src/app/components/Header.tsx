import { Search, Menu, Heart } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Donar Cabello", href: "/donar/guia" },
    { label: "Centros Aliados", href: "/centros/buscar" },
    { label: "Seguimiento", href: "/seguimiento" },
    { label: "Campañas", href: "/campanas" },
    { label: "Comunidad y Apoyo", href: "/comunidad/faq" },
    { label: "Para Centros", href: "/centros/panel" },
  ];

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Heart className="size-8 text-pink-600 fill-pink-600" />
            <span className="font-semibold text-xl">DonaCabello</span>
          </Link>

          {/* Buscador */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar centros, campañas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Menú principal */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link to="/donar/guia">
              <Button className="bg-pink-600 hover:bg-pink-700">
                Donar ahora
              </Button>
            </Link>
            <Button variant="outline">Ingresar</Button>
            
            {/* Menú móvil */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}