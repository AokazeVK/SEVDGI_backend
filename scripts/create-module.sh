#!/bin/bash

MODULE=$1

if [ -z "$MODULE" ]; then
  echo "Uso: ./create-module.sh laboratories"
  exit 1
fi

mkdir -p \
src/modules/$MODULE/application/dto \
src/modules/$MODULE/application/use-cases \
src/modules/$MODULE/domain/entities \
src/modules/$MODULE/domain/repositories \
src/modules/$MODULE/infrastructure/controllers \
src/modules/$MODULE/infrastructure/repositories

touch \
src/modules/$MODULE/$MODULE.module.ts \
src/modules/$MODULE/domain/entities/${MODULE%s}.entity.ts \
src/modules/$MODULE/domain/repositories/$MODULE.repository.ts \
src/modules/$MODULE/infrastructure/controllers/$MODULE.controller.ts \
src/modules/$MODULE/infrastructure/repositories/prisma-$MODULE.repository.ts \
src/modules/$MODULE/application/dto/create-${MODULE%s}.dto.ts \
src/modules/$MODULE/application/dto/update-${MODULE%s}.dto.ts \
src/modules/$MODULE/application/use-cases/get-$MODULE.use-case.ts \
src/modules/$MODULE/application/use-cases/get-${MODULE%s}-by-id.use-case.ts \
src/modules/$MODULE/application/use-cases/create-${MODULE%s}.use-case.ts \
src/modules/$MODULE/application/use-cases/update-${MODULE%s}.use-case.ts \
src/modules/$MODULE/application/use-cases/toggle-${MODULE%s}.use-case.ts

echo "Módulo $MODULE creado"