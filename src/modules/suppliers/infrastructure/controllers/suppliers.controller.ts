import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../core/guards/permissions.guard';
import { RequirePermissions } from '../../../../core/decorators/require-permissions.decorator';
import { Audit } from '../../../../core/decorators/audit.decorator';

import { CreateSupplierDto } from '../../application/dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../application/dto/update-supplier.dto';

import { GetSuppliersUseCase } from '../../application/use-cases/get-suppliers.use-case';
import { GetSupplierByIdUseCase } from '../../application/use-cases/get-supplier-by-id.use-case';
import { CreateSupplierUseCase } from '../../application/use-cases/create-supplier.use-case';
import { UpdateSupplierUseCase } from '../../application/use-cases/update-supplier.use-case';
import { ToggleSupplierUseCase } from '../../application/use-cases/toggle-supplier.use-case';

@ApiTags('Suppliers')
@ApiBearerAuth()
@Controller('suppliers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SuppliersController {
  constructor(
    private readonly getSuppliersUseCase: GetSuppliersUseCase,
    private readonly getSupplierByIdUseCase: GetSupplierByIdUseCase,
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly toggleSupplierUseCase: ToggleSupplierUseCase,
  ) {}

  @Get()
  @RequirePermissions('suppliers.read')
  @Audit('Listar proveedores')
  @ApiOperation({ summary: 'Listar proveedores' })
  findAll() {
    return this.getSuppliersUseCase.execute();
  }

  @Get(':id')
  @RequirePermissions('suppliers.read')
  @Audit('Obtener proveedor')
  @ApiOperation({ summary: 'Obtener proveedor por ID' })
  findById(@Param('id') id: string) {
    return this.getSupplierByIdUseCase.execute(id);
  }

  @Post()
  @RequirePermissions('suppliers.create')
  @Audit('Crear proveedor')
  @ApiOperation({ summary: 'Crear proveedor' })
  create(@Body() dto: CreateSupplierDto) {
    return this.createSupplierUseCase.execute(dto);
  }

  @Patch(':id')
  @RequirePermissions('suppliers.update')
  @Audit('Editar proveedor')
  @ApiOperation({ summary: 'Editar proveedor' })
  update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.updateSupplierUseCase.execute(id, dto);
  }

  @Patch(':id/toggle')
  @RequirePermissions('suppliers.toggle')
  @Audit('Activar/Inactivar proveedor')
  @ApiOperation({ summary: 'Activar/Inactivar proveedor' })
  toggle(@Param('id') id: string) {
    return this.toggleSupplierUseCase.execute(id);
  }
}
