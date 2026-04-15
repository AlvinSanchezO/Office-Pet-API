import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Prisma 7 requiere un adaptador para la conexión PostgreSQL
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error(
        'DATABASE_URL no está definido. Crea un archivo .env con la URL de conexión a PostgreSQL.',
      );
    }

    super({
      adapter: new PrismaPg(databaseUrl),
    });
  }

  async onModuleInit() {
    // Se conecta al iniciar el módulo
    await this.$connect();
  }

  async onModuleDestroy() {
    // Se desconecta al apagar la app
    await this.$disconnect();
  }
}
