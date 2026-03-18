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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/index",
    Component: Index,
  },
  {
    path: "/mega-menu",
    Component: MegaMenu,
  },
  {
    path: "/donar/guia",
    Component: DonarGuia,
  },
  {
    path: "/donar/agendar",
    Component: DonarAgendar,
  },
  {
    path: "/centros/buscar",
    Component: CentrosBuscar,
  },
  {
    path: "/centros/mapa",
    Component: CentrosMapa,
  },
  {
    path: "/seguimiento",
    Component: SeguimientoEstado,
  },
  {
    path: "/campanas",
    Component: CampanasActivas,
  },
  {
    path: "/comunidad/faq",
    Component: ComunidadFAQ,
  },
  {
    path: "/centros/registro",
    Component: CentrosRegistro,
  },
  {
    path: "/centros/panel",
    Component: CentrosPanel,
  },
]);