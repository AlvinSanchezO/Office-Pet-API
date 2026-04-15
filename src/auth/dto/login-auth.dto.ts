import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'empleado@oficina.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'securePass123' })
  @IsString()
  @MinLength(6)
  password!: string;
}
