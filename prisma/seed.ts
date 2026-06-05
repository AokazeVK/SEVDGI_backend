import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const permissions = [
  // Seguridad
  ['users.read', 'Ver usuarios', 'users'],
  ['users.create', 'Crear usuarios', 'users'],
  ['users.update', 'Editar usuarios', 'users'],
  ['users.toggle', 'Activar/Inactivar usuarios', 'users'],

  ['roles.read', 'Ver roles', 'roles'],
  ['roles.create', 'Crear roles', 'roles'],
  ['roles.update', 'Editar roles', 'roles'],
  ['roles.toggle', 'Activar/Inactivar roles', 'roles'],
  ['roles.assign_permissions', 'Asignar permisos a roles', 'roles'],

  ['permissions.read', 'Ver permisos', 'permissions'],
  ['audit.read', 'Ver auditoría', 'audit'],

  // Catálogos
  ['laboratories.read', 'Ver laboratorios', 'laboratories'],
  ['laboratories.create', 'Crear laboratorios', 'laboratories'],
  ['laboratories.update', 'Editar laboratorios', 'laboratories'],
  ['laboratories.toggle', 'Activar/Inactivar laboratorios', 'laboratories'],

  ['suppliers.read', 'Ver proveedores', 'suppliers'],
  ['suppliers.create', 'Crear proveedores', 'suppliers'],
  ['suppliers.update', 'Editar proveedores', 'suppliers'],
  ['suppliers.toggle', 'Activar/Inactivar proveedores', 'suppliers'],

  ['manufacturers.read', 'Ver fabricantes', 'manufacturers'],
  ['manufacturers.create', 'Crear fabricantes', 'manufacturers'],
  ['manufacturers.update', 'Editar fabricantes', 'manufacturers'],
  ['manufacturers.toggle', 'Activar/Inactivar fabricantes', 'manufacturers'],

  //Sanitay-registrations
  ['sanitary-registrations.read', 'Ver registros sanitarios', 'sanitary-registrations'],
  ['sanitary-registrations.create', 'Crear registros sanitarios', 'sanitary-registrations'],
  ['sanitary-registrations.update', 'Editar registros sanitarios', 'sanitary-registrations'],
  [
    'sanitary-registrations.toggle',
    'Activar/Inactivar registros sanitarios',
    'sanitary-registrations',
  ],

  // Medicamentos
  ['medicines.read', 'Ver medicamentos', 'medicines'],
  ['medicines.create', 'Crear medicamentos', 'medicines'],
  ['medicines.update', 'Editar medicamentos', 'medicines'],
  ['medicines.toggle', 'Activar/Inactivar medicamentos', 'medicines'],

  // Documentos / OCR / experto
  ['documents.read', 'Ver documentos', 'documents'],
  ['documents.upload', 'Subir documentos', 'documents'],
  ['documents.validate', 'Validar documentos', 'documents'],
  ['documents.delete', 'Eliminar documentos', 'documents'],

  ['ocr.read', 'Ver OCR', 'ocr'],
  ['ocr.process', 'Procesar OCR', 'ocr'],
  ['ocr.retry', 'Reintentar OCR', 'ocr'],

  ['ocr-results.read', 'Ver resultados OCR', 'ocr-results'],
  ['ocr-results.create', 'Crear resultados OCR', 'ocr-results'],

  ['ocr-extracted-fields.read', 'Ver campos extraídos OCR', 'ocr-extracted-fields'],
  ['ocr-extracted-fields.create', 'Crear campos extraídos OCR', 'ocr-extracted-fields'],

  ['expert-rules.read', 'Ver reglas', 'expert-system'],
  ['expert-rules.create', 'Crear reglas', 'expert-system'],
  ['expert-rules.update', 'Editar reglas', 'expert-system'],
  ['expert-rules.toggle', 'Activar/Inactivar reglas', 'expert-system'],
  ['expert.validation.run', 'Ejecutar validación experta', 'expert-system'],
  ['expert.validation.read', 'Ver validaciones expertas', 'expert-system'],

  ['validation-processes.read', 'Ver procesos de validación', 'validation-processes'],
  ['validation-processes.create', 'Crear procesos de validación', 'validation-processes'],
  ['validation-processes.update-status', 'Actualizar estado de validación', 'validation-processes'],

  ['inference-engine.process', 'Procesar motor de inferencia', 'inference-engine'],
  // Almacén
  ['warehouse.read', 'Ver almacén', 'warehouse'],
  ['warehouse.create', 'Crear registros en almacén', 'warehouse'],
  ['warehouse.update', 'Editar registros en almacén', 'warehouse'],
  ['warehouse.toggle', 'Activar/Inactivar registros en almacén', 'warehouse'],
  ['warehouse.entry', 'Registrar ingreso a almacén', 'warehouse'],
  ['warehouse.adjust', 'Ajustar stock almacén', 'warehouse'],
  ['warehouse.dispatch', 'Despachar desde almacén', 'warehouse'],
  ['warehouse.kardex', 'Ver kardex almacén', 'warehouse'],

  // Warehouse entries / ingresos al almacén
  ['warehouse-entries.read', 'Ver ingresos al almacén', 'warehouse-entries'],
  ['warehouse-entries.create', 'Crear ingreso en borrador', 'warehouse-entries'],
  ['warehouse-entries.update', 'Editar ingresos al almacén', 'warehouse-entries'],
  ['warehouse-entries.register', 'Registrar ingreso definitivo al almacén', 'warehouse-entries'],

  // Warehouse Inventory / inventario de almacén
  ['warehouse-inventory.read', 'Ver inventario de almacén', 'warehouse-inventory'],
  ['warehouse-inventory.fefo', 'First Expire, First Out', 'warehouse-inventory'],

  // Farmacia
  ['pharmacy.read', 'Ver farmacia', 'pharmacy'],
  ['pharmacy.create', 'Crear farmacia', 'pharmacy'],
  ['pharmacy.update', 'Editar farmacia', 'pharmacy'],
  ['pharmacy.toggle', 'Activar/Inactivar farmacia', 'pharmacy'],
  ['pharmacy.receive', 'Recibir medicamentos en farmacia', 'pharmacy'],
  ['pharmacy.dispense', 'Dispensar medicamentos', 'pharmacy'],
  ['pharmacy.return', 'Registrar devolución farmacia', 'pharmacy'],
  ['pharmacy.kardex', 'Ver kardex farmacia', 'pharmacy'],

  // Pharmacy-receptions
  ['pharmacy-receptions.read', 'Ver recepcion en Farmacia', 'pharmacy-receptions'],
  ['pharmacy-receptions.create', 'Crear recepcion en Farmacia', 'pharmacy-receptions'],

  // Pharmacy-inventory
  ['pharmacy-inventory.read', 'Ver inventario de farmacia', 'pharmacy-inventory'],
  ['pharmacy-inventory.fefo', 'Consultar FEFO en farmacia', 'pharmacy-inventory'],

  // Pharmacy-dispensations
  ['pharmacy-dispensations.read', 'Ver dispensaciones', 'pharmacy-dispensations'],
  ['pharmacy-dispensations.create', 'Crear dispensación', 'pharmacy-dispensations'],

  //Kardex
  ['kardex.read', 'Ver kardex', 'kardex'],

  //Stock-movements
  ['stock-movements.read', 'Ver movimientos de stock', 'stock-movements'],

  // Medical-services
  ['medical-services.read', 'Ver servicios médicos', 'medical-services'],
  ['medical-services.create', 'Crear servicios médicos', 'medical-services'],
  ['medical-services.update', 'Editar servicios médicos', 'medical-services'],
  ['medical-services.toggle', 'Activar/Inactivar servicios médicos', 'medical-services'],

  // Pacientes / recetas
  ['patients.read', 'Ver pacientes', 'patients'],
  ['patients.create', 'Crear pacientes', 'patients'],
  ['patients.update', 'Editar pacientes', 'patients'],
  ['patients.toggle', 'Activar/Inactivar pacientes', 'patients'],

  ['doctors.read', 'Ver doctores', 'doctors'],
  ['doctors.create', 'Crear doctores', 'doctors'],
  ['doctors.update', 'Editar doctores', 'doctors'],
  ['doctors.toggle', 'Activar/Inactivar doctores', 'doctors'],

  ['prescriptions.read', 'Ver recetas', 'prescriptions'],
  ['prescriptions.create', 'Crear recetas', 'prescriptions'],
  ['prescriptions.update', 'Editar recetas', 'prescriptions'],
  ['prescriptions.cancel', 'Cancelar recetas', 'prescriptions'],

  // Pedidos / despachos
  ['requests.read', 'Ver pedidos', 'requests'],
  ['requests.create', 'Crear pedidos', 'requests'],
  ['requests.approve', 'Aprobar pedidos', 'requests'],
  ['requests.reject', 'Rechazar pedidos', 'requests'],
  ['requests.cancel', 'Cancelar pedidos', 'requests'],

  ['dispatches.read', 'Ver despachos', 'dispatches'],
  ['dispatches.create', 'Crear despachos', 'dispatches'],
  ['dispatches.send', 'Enviar despachos', 'dispatches'],
  ['dispatches.receive', 'Recibir despachos', 'dispatches'],
  ['dispatches.cancel', 'Cancelar despachos', 'dispatches'],

  // Reportes / alertas
  ['alerts.read', 'Ver alertas', 'alerts'],
  ['alerts.generate', 'Generar alertas automáticas', 'alerts'],
  ['alerts.update-status', 'Actualizar estado de alertas', 'alerts'],

  ['reports.read', 'Ver reportes', 'reports'],
  ['reports.export', 'Exportar reportes', 'reports'],

  ['settings.read', 'Ver configuración', 'settings'],
  ['settings.update', 'Editar configuración', 'settings'],

  //suppliers / proveedores
  ['suppliers.read', 'Ver proveedores', 'suppliers'],
  ['suppliers.create', 'Crear proveedores', 'suppliers'],
  ['suppliers.update', 'Editar proveedores', 'suppliers'],
  ['suppliers.toggle', 'Activar/Inactivar proveedores', 'suppliers'],

  //ingredients / ingredientes
  ['active-ingredients.read', 'Ver ingredientes', 'ingredients'],
  ['active-ingredients.create', 'Crear ingredientes', 'ingredients'],
  ['active-ingredients.update', 'Editar ingredientes', 'ingredients'],
  ['active-ingredients.toggle', 'Activar/Inactivar ingredientes', 'ingredients'],

  //pharmaceutical forms / formas farmacéuticas
  ['pharmaceutical-forms.read', 'Ver formas farmacéuticas', 'pharmaceutical-forms'],
  ['pharmaceutical-forms.create', 'Crear formas farmacéuticas', 'pharmaceutical-forms'],
  ['pharmaceutical-forms.update', 'Editar formas farmacéuticas', 'pharmaceutical-forms'],
  ['pharmaceutical-forms.toggle', 'Activar/Inactivar formas farmacéuticas', 'pharmaceutical-forms'],

  //units / unidades
  ['units.read', 'Ver unidades', 'units'],
  ['units.create', 'Crear unidades', 'units'],
  ['units.update', 'Editar unidades', 'units'],
  ['units.toggle', 'Activar/Inactivar unidades', 'units'],

  //therapeutic groups / grupos terapéuticos
  ['therapeutic-groups.read', 'Ver grupos terapéuticos', 'therapeutic-groups'],
  ['therapeutic-groups.create', 'Crear grupos terapéuticos', 'therapeutic-groups'],
  ['therapeutic-groups.update', 'Editar grupos terapéuticos', 'therapeutic-groups'],
  ['therapeutic-groups.toggle', 'Activar/Inactivar grupos terapéuticos', 'therapeutic-groups'],

  //medicines batch / lotes de medicamentos
  ['medicine-batches.read', 'Ver lotes de medicamentos', 'medicine-batches'],
  ['medicine-batches.create', 'Crear lotes de medicamentos', 'medicine-batches'],
  ['medicine-batches.update', 'Editar lotes de medicamentos', 'medicine-batches'],
  ['medicine-batches.toggle', 'Activar/Inactivar lotes de medicamentos', 'medicine-batches'],

  // Document types / tipos de documento
  ['document-types.read', 'Ver tipos de documento', 'document-types'],
  ['document-types.create', 'Crear tipos de documento', 'document-types'],
  ['document-types.update', 'Editar tipos de documento', 'document-types'],
  ['document-types.toggle', 'Activar/Inactivar tipos de documento', 'document-types'],

  // Documents / Documentos
  ['documents.read', 'Ver documentos', 'documents'],
  ['documents.create', 'Crear documentos', 'documents'],
  ['documents.update', 'Editar documentos', 'documents'],
  ['documents.update-status', 'Actualizar estado de documentos', 'documents'],

  // Document files / Archivos documentales
  ['document-files.read', 'Ver archivos documentales', 'document-files'],
  ['document-files.create', 'Crear archivos documentales', 'document-files'],
] as const;

async function main() {
  console.log('Seeding permissions...');

  for (const [code, name, module] of permissions) {
    await prisma.permission.upsert({
      where: { code },
      update: {
        name,
        module,
        isActive: true,
      },
      create: {
        code,
        name,
        module,
        isActive: true,
      },
    });
  }

  console.log('Seeding ADMIN role...');

  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {
      description: 'Administrador del sistema',
      isActive: true,
    },
    create: {
      name: 'ADMIN',
      description: 'Administrador del sistema',
      isActive: true,
    },
  });

  const allPermissions = await prisma.permission.findMany();

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log('Seeding admin user...');

  const passwordHash = await bcrypt.hash('Admin123*', 10);

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      isActive: true,
    },
    create: {
      username: 'admin',
      email: 'admin@sistema.local',
      fullName: 'Administrador del Sistema',
      passwordHash,
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log('Seed completed.');
  console.log('Usuario: admin');
  console.log('Contraseña: Admin123*');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
