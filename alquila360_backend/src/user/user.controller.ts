import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { InquilinoDashboardDto } from './dto/inquilino-dashboard.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Registro de usuario (público)
   * POST /users
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Listar todos los usuarios (protegido con JWT)
   * GET /users
   */
  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Dashboard del inquilino (obtiene el ID del token JWT)
   * GET /users/dashboard-inquilino
   * NOTA: Esta ruta DEBE estar antes de GET /users/:id
   */
  @UseGuards(JwtAuthGuard)
  @Get('dashboard-inquilino')
  getInquilinoDashboard(
    @CurrentUser('id_usuario') userId: number,
  ): Promise<InquilinoDashboardDto> {
    return this.userService.getInquilinoDashboard(userId);
  }

  /**
   * Historial de pagos del inquilino
   * GET /users/historial-pagos
   * NOTA: Esta ruta DEBE estar antes de GET /users/:id
   */
  @UseGuards(JwtAuthGuard)
  @Get('historial-pagos')
  getHistorialPagos(
    @CurrentUser('id_usuario') userId: number,
  ) {
    return this.userService.getHistorialPagos(userId);
  }

  /**
   * Dashboard del inquilino por ID (para desarrollo/testing)
   * GET /users/:id/dashboard-inquilino
   */
  @Get(':id/dashboard-inquilino')
  getInquilinoDashboardById(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<InquilinoDashboardDto> {
    return this.userService.getInquilinoDashboard(userId);
  }

  /**
   * Obtener un usuario por ID (protegido)
   * GET /users/:id
   */
  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  /**
   * Actualizar un usuario (protegido)
   * PATCH /users/:id
   */
  ///@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Eliminar un usuario (protegido)
   * DELETE /users/:id
   */
  ///@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
