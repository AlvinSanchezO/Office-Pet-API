import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnerDto {
  @ApiProperty({ example: 'empleado@oficina.com' })
  @IsEmail()
  email!: string; // Añadimos el '!' para calmar a TypeScript

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'IT' })
  @IsString()
  @IsNotEmpty()
  department!: string;
}
