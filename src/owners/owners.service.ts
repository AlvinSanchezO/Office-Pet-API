import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) { }

  async create(createOwnerDto: CreateOwnerDto) {
    const { password, email, ...rest } = createOwnerDto;

    const existingOwner = await this.prisma.owner.findUnique({
      where: { email },
    });

    if (existingOwner) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.prisma.owner.create({
      data: {
        ...rest,
        email,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.owner.findMany({
      include: { pets: true },
    });
  }

  // Método findOne que pedía el error
  async findOne(id: string) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
      include: { pets: true },
    });
    if (!owner) throw new NotFoundException(`Owner con ID ${id} no encontrado`);
    return owner;
  }

  // Método update que pedía el error
  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    // Si viene password, hay que hashearla también
    if (updateOwnerDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateOwnerDto.password = await bcrypt.hash(updateOwnerDto.password, salt);
    }

    return this.prisma.owner.update({
      where: { id },
      data: updateOwnerDto,
    });
  }

  // Método remove que pedía el error
  async remove(id: string) {
    await this.findOne(id); // Validamos que exista antes de borrar
    return this.prisma.owner.delete({
      where: { id },
    });
  }
}
