import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { ToggleUserUseCase } from '../../application/use-cases/toggle-user.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly toggleUserUseCase: ToggleUserUseCase,
  ) {}

  @Get()
  @RequirePermissions('users.read')
  @Audit('Listar usuarios')
  @ApiOperation({ summary: 'Listar usuarios' })
  findAll() {
    return this.getUsersUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('users.read')
  @Audit('Obtener usuario')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  findById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('users.create')
  @Audit('Crear usuario')
  @ApiOperation({ summary: 'Crear usuario' })
  create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('users.update')
  @Audit('Editar usuario')
  @ApiOperation({ summary: 'Editar usuario' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('users.toggle')
  @Audit('Activar/Inactivar usuario')
  @ApiOperation({ summary: 'Activar/Inactivar usuario' })
  toggle(@Param('id') id: string) {
    return this.toggleUserUseCase.execute(id);
  }
}
