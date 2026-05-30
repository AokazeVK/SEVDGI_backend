import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateActiveIngredientDto } from '../../application/dto/create-active-ingredient.dto';
import { UpdateActiveIngredientDto } from '../../application/dto/update-active-ingredient.dto';

import { GetActiveIngredientsUseCase } from '../../application/use-cases/get-active-ingredients.use-case';
import { GetActiveIngredientByIdUseCase } from '../../application/use-cases/get-active-ingredient-by-id.use-case';
import { CreateActiveIngredientUseCase } from '../../application/use-cases/create-active-ingredient.use-case';
import { UpdateActiveIngredientUseCase } from '../../application/use-cases/update-active-ingredient.use-case';
import { ToggleActiveIngredientUseCase } from '../../application/use-cases/toggle-active-ingredient.use-case';

@ApiTags('Active Ingredients')
@ApiBearerAuth()
@Controller('active-ingredients')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ActiveIngredientsController {
  constructor(
    private readonly getActiveIngredientsUseCase: GetActiveIngredientsUseCase,
    private readonly getActiveIngredientByIdUseCase: GetActiveIngredientByIdUseCase,
    private readonly createActiveIngredientUseCase: CreateActiveIngredientUseCase,
    private readonly updateActiveIngredientUseCase: UpdateActiveIngredientUseCase,
    private readonly toggleActiveIngredientUseCase: ToggleActiveIngredientUseCase,
  ) {}

  @Get()
  @RequirePermissions('active-ingredients.read')
  @Audit('Listar principios activos')
  @ApiOperation({ summary: 'Listar principios activos' })
  findAll() {
    return this.getActiveIngredientsUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('active-ingredients.read')
  @Audit('Obtener principio activo')
  @ApiOperation({ summary: 'Obtener principio activo por ID' })
  findById(@Param('id') id: string) {
    return this.getActiveIngredientByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('active-ingredients.create')
  @Audit('Crear principio activo')
  @ApiOperation({ summary: 'Crear principio activo' })
  create(@Body() dto: CreateActiveIngredientDto) {
    return this.createActiveIngredientUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('active-ingredients.update')
  @Audit('Editar principio activo')
  @ApiOperation({ summary: 'Editar principio activo' })
  update(@Param('id') id: string, @Body() dto: UpdateActiveIngredientDto) {
    return this.updateActiveIngredientUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('active-ingredients.toggle')
  @Audit('Activar/Inactivar principio activo')
  @ApiOperation({ summary: 'Activar/Inactivar principio activo' })
  toggle(@Param('id') id: string) {
    return this.toggleActiveIngredientUseCase.execute(id);
  }
}
