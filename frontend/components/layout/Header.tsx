"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, X, User, LogOut, ChevronDown, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/donar", label: "Donar" },
  { href: "/centros", label: "Centros" },
  { href: "/campanas", label: "Campañas" },
  { href: "/comunidad", label: "Comunidad" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-rose-600 text-lg">
            <Heart className="h-6 w-6 fill-rose-600" />
            DonaCabello
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-rose-600 bg-rose-50"
                    : "text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="h-4 w-4" />
                  {user.name.split(" ")[0]}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    {user.role === "donor" && (
                      <Link
                        href="/mis-citas"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4" /> Mis citas
                      </Link>
                    )}
                    {user.role === "center" && (
                      <Link
                        href="/panel"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" /> Mi panel
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <ShieldCheck className="h-4 w-4" /> Panel admin
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Ingresar</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/registro">Registrarse</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium",
                pathname === link.href ? "text-rose-600 bg-rose-50" : "text-gray-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex gap-2">
            {user ? (
              <div className="flex flex-col gap-1 w-full">
                {user.role === "donor" && (
                  <Link href="/mis-citas" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5">
                    <Heart className="h-4 w-4" /> Mis citas
                  </Link>
                )}
                {user.role === "center" && (
                  <Link href="/panel" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5">
                    <User className="h-4 w-4" /> Mi panel
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5">
                    <ShieldCheck className="h-4 w-4" /> Panel admin
                  </Link>
                )}
                <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-red-600 px-2 py-1.5">
                  <LogOut className="h-4 w-4" /> Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Ingresar</Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link href="/registro" onClick={() => setMobileOpen(false)}>Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
