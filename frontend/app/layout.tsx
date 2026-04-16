import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "DonaCabello — Dona cabello, regala confianza",
  description:
    "Conectamos donantes con centros estéticos aliados verificados para apoyar a pacientes oncológicos en Colombia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
