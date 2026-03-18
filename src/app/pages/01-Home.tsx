import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageInfo } from "../components/PageInfo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Heart, MapPin, Calendar, CheckCircle, Users, Megaphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-pink-700 text-white py-20">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Dona cabello, regala confianza
              </h1>
              <p className="text-xl mb-8 text-pink-100">
                Conectamos donantes con centros estéticos aliados verificados para apoyar a pacientes oncológicos en Colombia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donar/guia">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                    <Heart className="mr-2 size-5" />
                    Donar ahora
                  </Button>
                </Link>
                <Link to="/centros/buscar">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-pink-800">
                    <MapPin className="mr-2 size-5" />
                    Encontrar un centro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-6 py-12">
          {/* Page Info */}
          <PageInfo 
            title="Inicio"
            description="Esta página te ofrece una guía rápida para empezar a donar cabello y conocer cómo funciona DonaCabello. Aquí encontrarás acceso directo a los requisitos, el proceso de donación y las historias de impacto que generan confianza en nuestra comunidad."
          />

          {/* Cards de acceso rápido */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Link to="/donar/guia">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <Heart className="size-8 text-pink-600 mb-2" />
                  <CardTitle>Cómo donar</CardTitle>
                  <CardDescription>
                    Guía paso a paso para realizar tu donación de forma segura
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/donar/guia">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CheckCircle className="size-8 text-green-600 mb-2" />
                  <CardTitle>Requisitos</CardTitle>
                  <CardDescription>
                    Conoce los requisitos mínimos para donar cabello
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/centros/buscar">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <MapPin className="size-8 text-blue-600 mb-2" />
                  <CardTitle>Centros</CardTitle>
                  <CardDescription>
                    Encuentra centros aliados verificados cerca de ti
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/seguimiento">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <Calendar className="size-8 text-purple-600 mb-2" />
                  <CardTitle>Seguimiento</CardTitle>
                  <CardDescription>
                    Consulta el estado de tu cita y donación
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* ¿Cómo funciona? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">¿Cómo funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Prepara tu cabello</h3>
                <p className="text-sm text-gray-600">
                  Asegúrate de cumplir con los requisitos: cabello limpio, seco, trenza firme y largo mínimo de 20 cm.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Elige y agenda</h3>
                <p className="text-sm text-gray-600">
                  Busca un centro aliado verificado cerca de ti y agenda tu cita de forma sencilla.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Dona y confirma</h3>
                <p className="text-sm text-gray-600">
                  Asiste a tu cita, realiza la donación y el centro aliado confirmará que se completó exitosamente.
                </p>
              </div>
            </div>
          </section>

          {/* Campañas activas */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Campañas activas</h2>
              <Link to="/campanas">
                <Button variant="outline">Ver todas</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Megaphone className="size-8 text-pink-600" />
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Activa
                    </span>
                  </div>
                  <CardTitle>Marzo Rosa 2026</CardTitle>
                  <CardDescription className="text-sm">
                    Únete a nuestra campaña especial del mes de la mujer. Meta: 500 donaciones en todo el país.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Progreso: 327/500 donaciones</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Users className="size-8 text-blue-600" />
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Activa
                    </span>
                  </div>
                  <CardTitle>Empresas Solidarias</CardTitle>
                  <CardDescription className="text-sm">
                    Empresas se unen para organizar jornadas de donación corporativas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">15 empresas participando</p>
                    <p className="text-xs">Próxima jornada: 15 de marzo</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Heart className="size-8 text-purple-600 fill-purple-600" />
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Activa
                    </span>
                  </div>
                  <CardTitle>Universidades con Causa</CardTitle>
                  <CardDescription className="text-sm">
                    Estudiantes universitarios lideran la donación solidaria en sus campus.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">12 universidades aliadas</p>
                    <p className="text-xs">Meta: 200 estudiantes donantes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Historias */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Historias de impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>María transformó su corte en esperanza</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    "Llevaba años queriendo cortarme el cabello, pero no sabía que podía convertir esa decisión en un acto de amor. 
                    Doné 25 cm de mi cabello y el proceso fue súper fácil gracias a los centros aliados verificados de DonaCabello. 
                    Saber que mi cabello está ayudando a alguien me llena de alegría."
                  </p>
                  <p className="text-xs text-gray-500">— María C., Bogotá</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Un gesto que conecta a toda una comunidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    "Mi hija de 10 años quiso donar su cabello después de que una amiga de la familia empezó su tratamiento oncológico. 
                    DonaCabello nos ayudó a encontrar un centro cerca de casa y nos explicaron todo el proceso. 
                    Fue una experiencia hermosa que nunca olvidaremos."
                  </p>
                  <p className="text-xs text-gray-500">— Ana P., Medellín</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
