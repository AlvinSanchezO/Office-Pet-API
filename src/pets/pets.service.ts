import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    // Verificar que el owner existe
    const owner = await this.prisma.owner.findUnique({
      where: { id: createPetDto.ownerId },
    });
    if (!owner) {
      throw new NotFoundException(`Owner con ID ${createPetDto.ownerId} no encontrado`);
    }

    return this.prisma.pet.create({
      data: createPetDto,
      include: { owner: true },
    });
  }

  findAll() {
    return this.prisma.pet.findMany({
      include: { owner: true },
    });
  }

  async findOne(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: { owner: true },
    });
    if (!pet) throw new NotFoundException(`Pet con ID ${id} no encontrado`);
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    // Verificar que existe
    await this.findOne(id);

    return this.prisma.pet.update({
      where: { id },
      data: updatePetDto,
      include: { owner: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Validar que exista
    return this.prisma.pet.delete({
      where: { id },
    });
  }
}