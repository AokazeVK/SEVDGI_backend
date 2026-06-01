param (
    [Parameter(Mandatory=$true)]
    [string]$Module
)

$Singular = if ($Module.EndsWith("ies")) {
    $Module.Substring(0, $Module.Length - 3) + "y"
} elseif ($Module.EndsWith("s")) {
    $Module.Substring(0, $Module.Length - 1)
} else {
    $Module
}

$base = "src/modules/$Module"

$dirs = @(
    "$base/application/dto",
    "$base/application/use-cases",
    "$base/domain/entities",
    "$base/domain/repositories",
    "$base/infrastructure/controllers",
    "$base/infrastructure/repositories"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$files = @(
    "$base/$Module.module.ts",
    "$base/domain/entities/$Singular.entity.ts",
    "$base/domain/repositories/$Module.repository.ts",
    "$base/infrastructure/controllers/$Module.controller.ts",
    "$base/infrastructure/repositories/prisma-$Module.repository.ts",
    "$base/application/dto/create-$Singular.dto.ts",
    "$base/application/dto/update-$Singular.dto.ts",
    "$base/application/use-cases/get-$Module.use-case.ts",
    "$base/application/use-cases/get-$Singular-by-id.use-case.ts",
    "$base/application/use-cases/create-$Singular.use-case.ts",
    "$base/application/use-cases/update-$Singular.use-case.ts",
    "$base/application/use-cases/toggle-$Singular.use-case.ts"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host "Modulo $Module creado correctamente."