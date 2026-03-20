export type CenterStatus = 'pending' | 'verified' | 'rejected';

export class CenterEntity {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  description: string;
  status: CenterStatus;
  ownerId: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}
