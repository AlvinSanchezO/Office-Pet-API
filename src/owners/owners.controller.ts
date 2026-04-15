import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Owners') // Agrupa los endpoints en Swagger
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) { }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo dueño/empleado' })
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos los dueños con sus mascotas' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener un dueño por su ID' })
  findOne(@Param('id') id: string) {
    // Eliminamos el '+' porque nuestro ID es un String (UUID)
    return this.ownersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar datos de un dueño' })
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    // Eliminamos el '+' aquí también
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un dueño' })
  remove(@Param('id') id: string) {
    // Eliminamos el '+' aquí también
    return this.ownersService.remove(id);
  }
}
