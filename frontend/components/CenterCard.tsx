import { Center } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

interface CenterCardProps {
  center: Center;
}

export function CenterCard({ center }: CenterCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {center.status === "verified" && (
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
            )}
            <CardTitle className="text-base">{center.name}</CardTitle>
          </div>
          <Badge variant={center.status === "verified" ? "success" : center.status === "pending" ? "warning" : "error"}>
            {center.status === "verified" ? "Verificado" : center.status === "pending" ? "Pendiente" : "Rechazado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
          <span>{center.address}, {center.city}</span>
        </div>
        {center.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 shrink-0 text-gray-400" />
            <a href={`tel:${center.phone}`} className="hover:text-rose-600">{center.phone}</a>
          </div>
        )}
        {center.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4 shrink-0 text-gray-400" />
            <a href={`mailto:${center.email}`} className="hover:text-rose-600 truncate">{center.email}</a>
          </div>
        )}
        {center.description && (
          <p className="text-sm text-gray-500 line-clamp-2 pt-1">{center.description}</p>
        )}
        <div className="pt-2 flex gap-2">
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={`/centros/${center.id}`}>Ver detalles</Link>
          </Button>
          <Button size="sm" asChild className="flex-1">
            <Link href={`/donar/agendar?centerId=${center.id}`}>Agendar cita</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
