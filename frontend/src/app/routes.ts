import { createBrowserRouter } from "react-router";
import Index from "./pages/00-Index";
import Home from "./pages/01-Home";
import MegaMenu from "./pages/02-MegaMenu";
import DonarGuia from "./pages/03-Donar-Guia";
import DonarAgendar from "./pages/04-Donar-Agendar";
import CentrosBuscar from "./pages/05-Centros-Buscar";
import CentrosMapa from "./pages/06-Centros-Mapa";
import SeguimientoEstado from "./pages/07-Seguimiento-Estado";
import CampanasActivas from "./pages/08-Campanas-Activas";
import ComunidadFAQ from "./pages/09-Comunidad-FAQ";
import CentrosRegistro from "./pages/10-Centros-Registro";
import CentrosPanel from "./pages/11-Centros-Panel";
import Login from "./pages/12-Login";
import Register from "./pages/13-Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  // Rutas públicas
  { path: "/", Component: Home },
  { path: "/index", Component: Index },
  { path: "/mega-menu", Component: MegaMenu },
  { path: "/donar/guia", Component: DonarGuia },
  { path: "/centros/buscar", Component: CentrosBuscar },
  { path: "/centros/mapa", Component: CentrosMapa },
  { path: "/campanas", Component: CampanasActivas },
  { path: "/comunidad/faq", Component: ComunidadFAQ },
  { path: "/login", Component: Login },
  { path: "/registro", Component: Register },

  // Rutas protegidas — requieren sesión activa
  {
    Component: ProtectedRoute,
    children: [
      { path: "/donar/agendar", Component: DonarAgendar },
      { path: "/seguimiento", Component: SeguimientoEstado },
      { path: "/centros/panel", Component: CentrosPanel },
      { path: "/centros/registro", Component: CentrosRegistro },
    ],
  },
]);
