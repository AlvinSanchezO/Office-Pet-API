import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Species } from '@prisma/client';

export class CreatePetDto {
  @ApiProperty({ example: 'Firulais' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'DOG', enum: Species })
  @IsEnum(Species)
  species!: Species;

  @ApiProperty({ example: 'Golden Retriever', required: false })
  @IsString()
  @IsOptional()
  breed?: string;

  @ApiProperty({ example: 'uuid-del-owner' })
  @IsUUID()
  @IsNotEmpty()
  ownerId!: string;
}