# Guía de Versionado

Este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/):

## Formato: MAJOR.MINOR.PATCH

### MAJOR (X.0.0)
Cambios incompatibles con versiones anteriores (breaking changes):
- Cambios en arquitectura de rutas
- Cambios en API que rompen compatibilidad
- Eliminación de features existentes
- Cambios en estructura de base de datos

**Ejemplo**: Mover dashboard de `/` a `/dashboard`

### MINOR (0.X.0)
Nuevas funcionalidades compatibles con versiones anteriores:
- Nuevas páginas o secciones
- Nuevos componentes
- Nuevas features opcionales
- Mejoras significativas de UI/UX

**Ejemplo**: Agregar landing page pública

### PATCH (0.0.X)
Correcciones de bugs y mejoras menores:
- Fixes de bugs
- Mejoras de performance
- Ajustes de estilos
- Actualizaciones de documentación
- Correcciones de typos

**Ejemplo**: Corregir error de async cookies()

## Proceso de Actualización

### Manual
```bash
# Patch (0.0.1 → 0.0.2)
npm version patch

# Minor (0.1.0 → 0.2.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

### Automático (GitHub Actions)
1. Ve a Actions → Version Bump Helper
2. Click "Run workflow"
3. Selecciona tipo: patch/minor/major
4. Se crea PR automático
5. Actualiza CHANGELOG.md en el PR
6. Merge cuando esté listo

## Actualizar CHANGELOG.md

Cada cambio de versión debe documentarse en `CHANGELOG.md`:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### 🎉 Agregado
- Nueva funcionalidad A
- Nueva funcionalidad B

### 🔄 Cambiado
- Cambio en comportamiento X
- **BREAKING**: Cambio incompatible Y

### 🐛 Corregido
- Fix de bug A
- Fix de bug B

### 🎨 Mejorado
- Mejora de performance X
- Mejora de UX Y

### 📦 Dependencias
- Paquete A: 1.0.0 → 2.0.0

### 🗑️ Eliminado
- Feature deprecada X
```

## Categorías de Cambios

- 🎉 **Agregado**: Nuevas features
- 🔄 **Cambiado**: Cambios en funcionalidad existente
- 🐛 **Corregido**: Bug fixes
- 🎨 **Mejorado**: Mejoras sin cambiar funcionalidad
- 📦 **Dependencias**: Actualizaciones de paquetes
- 🗑️ **Eliminado**: Features removidas
- 🔒 **Seguridad**: Fixes de seguridad

## Commits Convencionales

Usar prefijos en commits para facilitar generación de changelog:

- `feat:` → Minor version (nueva feature)
- `fix:` → Patch version (bug fix)
- `docs:` → Patch version (documentación)
- `style:` → Patch version (estilos)
- `refactor:` → Patch version (refactoring)
- `perf:` → Patch version (performance)
- `test:` → Patch version (tests)
- `chore:` → Patch version (mantenimiento)
- `BREAKING CHANGE:` → Major version

**Ejemplos**:
```bash
git commit -m "feat: agregar landing page pública"
git commit -m "fix: corregir error de async cookies"
git commit -m "docs: actualizar README con nueva arquitectura"
git commit -m "BREAKING CHANGE: mover dashboard a /dashboard"
```

## Checklist Pre-Release

Antes de hacer release de nueva versión:

- [ ] Actualizar `package.json` version
- [ ] Actualizar `CHANGELOG.md` con fecha actual
- [ ] Ejecutar `npm run build` sin errores
- [ ] Ejecutar `npm run lint` sin errores
- [ ] Probar en local que todo funciona
- [ ] Actualizar documentación si es necesario
- [ ] Crear tag de git: `git tag v2.0.0`
- [ ] Push con tags: `git push --tags`
