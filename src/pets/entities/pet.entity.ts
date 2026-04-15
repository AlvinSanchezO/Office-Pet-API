import { Species } from '@prisma/client';

export class Pet {
  id: string;
  name: string;
  species: Species;
  breed?: string;
  createdAt: Date;
  ownerId: string;
  owner?: any; // Para evitar importaciones circulares
}