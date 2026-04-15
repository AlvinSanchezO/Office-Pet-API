import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Esto hace que no tengamos que importarlo en cada módulo manualmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
