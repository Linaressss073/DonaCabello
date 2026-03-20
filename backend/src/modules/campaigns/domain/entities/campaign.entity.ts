export class CampaignEntity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  centerId: string;
  startDate: Date;
  endDate: Date;
  goal: number;
  current: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
