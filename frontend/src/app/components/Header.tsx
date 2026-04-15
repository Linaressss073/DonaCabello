import { Search, Menu, Heart, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Donar Cabello", href: "/donar/guia" },
    { label: "Centros Aliados", href: "/centros/buscar" },
    { label: "Seguimiento", href: "/seguimiento" },
    { label: "Campañas", href: "/campanas" },
    { label: "Comunidad y Apoyo", href: "/comunidad/faq" },
    { label: "Para Centros", href: "/centros/panel" },
    { label: "Menú completo", href: "/mega-menu" },
  ];

  function handleLogout() {
    logout();
    navigate('/');
  }

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

            {user ? (
              <div className="hidden lg:flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm text-gray-700">
                  <User className="size-4" />
                  {user.nombre}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="size-4 mr-1" />
                  Salir
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Ingresar</Button>
                </Link>
                <Link to="/registro">
                  <Button variant="ghost" className="text-pink-600">Registrarse</Button>
                </Link>
              </div>
            )}

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
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-1">
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
            <div className="pt-2 border-t border-gray-100 mt-2">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Cerrar sesión ({user.nombre})
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">
                    Ingresar
                  </Link>
                  <Link to="/registro" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-pink-600 hover:bg-pink-50 rounded-lg">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
