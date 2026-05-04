export class FaqEntity {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export class MythEntity {
  id: string;
  myth: string;
  reality: string;
  order: number;
}

export class ContactMessageEntity {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  userId?: string;
}
