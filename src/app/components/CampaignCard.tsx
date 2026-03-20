import { Heart, Users, Megaphone, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Campaign, CampaignIconTipo } from '../../types';

const CAMPAIGN_ICONS: Record<CampaignIconTipo, React.ElementType> = {
  heart:     Heart,
  users:     Users,
  megaphone: Megaphone,
};

interface CampaignCardProps {
  campaign: Campaign;
  onParticipate?: (id: string) => void;
}

export function CampaignCard({ campaign, onParticipate }: CampaignCardProps) {
  const Icon = CAMPAIGN_ICONS[campaign.iconTipo];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <Icon className="size-10 text-pink-600" />
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            {campaign.estado}
          </Badge>
        </div>
        <CardTitle className="text-xl mb-2">{campaign.titulo}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{campaign.descripcion}</CardDescription>
      </CardHeader>

      <CardContent>
        {campaign.progreso !== undefined && campaign.meta !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progreso</span>
              <span className="font-medium">
                {campaign.progreso}/{campaign.meta} {campaign.unidad}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((campaign.progreso / campaign.meta) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>{campaign.fechaInicio} — {campaign.fechaFin}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4" />
            <span>{campaign.participantes} participantes</span>
          </div>
        </div>

        <Button
          className="w-full bg-pink-600 hover:bg-pink-700"
          onClick={() => onParticipate?.(campaign.id)}
        >
          Participar
        </Button>
      </CardContent>
    </Card>
  );
}
