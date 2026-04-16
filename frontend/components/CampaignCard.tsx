import { Campaign } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const pct = campaign.goal > 0 ? Math.min((campaign.current / campaign.goal) * 100, 100) : 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {campaign.imageUrl && (
        <div className="h-40 bg-gray-100 overflow-hidden">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      {!campaign.imageUrl && (
        <div className="h-40 bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
          <span className="text-4xl">💇</span>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-2">{campaign.title}</CardTitle>
          <Badge variant={campaign.active ? "success" : "outline"}>
            {campaign.active ? "Activa" : "Finalizada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {campaign.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
        )}
        {campaign.goal > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{campaign.current} donaciones</span>
              <span>Meta: {campaign.goal}</span>
            </div>
            <Progress value={pct} />
            <p className="text-xs text-gray-400">{Math.round(pct)}% completado</p>
          </div>
        )}
        {campaign.endDate && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Hasta{" "}
              {format(new Date(campaign.endDate), "d 'de' MMMM, yyyy", { locale: es })}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
