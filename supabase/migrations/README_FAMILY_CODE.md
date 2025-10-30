# Migración: Código de Familia

## 004_add_family_code.sql

### Propósito
Agregar sistema de códigos de familia para restringir la visualización de deseos solo a miembros de la misma familia.

### Cambios
1. **Nueva columna**: `users.family_code` (TEXT, nullable)
2. **Índice**: `idx_users_family_code` para búsquedas rápidas
3. **Función**: `generate_family_code()` para generar códigos únicos

### Cómo ejecutar

#### Opción 1: Supabase Dashboard (Recomendado)
1. Ve a SQL Editor en Supabase Dashboard
2. Copia y pega el contenido de `004_add_family_code.sql`
3. Click en "Run"

#### Opción 2: CLI de Supabase
```bash
supabase db push
```

### Verificación
```sql
-- Verificar que la columna existe
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'family_code';

-- Verificar que el índice existe
SELECT indexname FROM pg_indexes 
WHERE tablename = 'users' AND indexname = 'idx_users_family_code';

-- Probar la función
SELECT generate_family_code();
```

### Rollback (si es necesario)
```sql
-- Eliminar índice
DROP INDEX IF EXISTS idx_users_family_code;

-- Eliminar función
DROP FUNCTION IF EXISTS generate_family_code();

-- Eliminar columna
ALTER TABLE users DROP COLUMN IF EXISTS family_code;
```

### Notas
- La columna es nullable para permitir usuarios existentes sin código
- Los usuarios sin código verán todos los deseos (comportamiento actual)
- Una vez que un usuario configura su código, solo verá deseos de su familia
