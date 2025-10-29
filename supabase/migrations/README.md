# Migraciones de Base de Datos

## 📋 Migraciones Disponibles

### 002_create_users_table.sql
Crea la tabla `users` con perfiles de usuario y RLS habilitado.

### 003_enable_rls_wishes.sql ⚠️ NUEVA
Habilita Row Level Security en la tabla `wishes` para proteger datos.

## 🚀 Cómo Ejecutar las Migraciones

### Opción 1: Supabase Dashboard (Recomendado)
1. Ir a [Supabase Dashboard](https://supabase.com/dashboard)
2. Seleccionar tu proyecto
3. Ir a **SQL Editor**
4. Copiar y pegar el contenido de `003_enable_rls_wishes.sql`
5. Ejecutar (Run)

### Opción 2: Supabase CLI
```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Login
supabase login

# Link al proyecto
supabase link --project-ref <tu-project-ref>

# Ejecutar migración específica
supabase db push
```

### Opción 3: SQL directo
```bash
# Conectar a tu base de datos y ejecutar:
psql <tu-connection-string> -f supabase/migrations/003_enable_rls_wishes.sql
```

## ✅ Verificar que RLS está Activo

Ejecuta en SQL Editor:
```sql
-- Verificar que RLS está habilitado
select tablename, rowsecurity 
from pg_tables 
where schemaname = 'public' and tablename = 'wishes';

-- Ver políticas activas
select * from pg_policies where tablename = 'wishes';
```

Deberías ver:
- `rowsecurity = true`
- **4 políticas** (select, insert, update, delete)

### ⚠️ Si ves 8 políticas:

Significa que había políticas previas o ejecutaste la migración dos veces.

**Solución**:
1. Ejecutar `list_all_policies.sql` para ver los nombres exactos
2. Ejecutar `cleanup_duplicate_policies.sql` para limpiar
3. Verificar que ahora hay exactamente 4 políticas

## 🧪 Probar RLS

### Test 1: Sin autenticación (debe fallar)
```sql
-- Cambiar a rol anon
set role anon;

-- Esto debe retornar 0 filas (RLS bloquea)
select * from wishes;

-- Volver a rol normal
reset role;
```

### Test 2: Con autenticación (debe funcionar)
```sql
-- Esto debe funcionar normalmente
select * from wishes;
```

## 📊 Políticas Implementadas

| Operación | Política | Condición |
|-----------|----------|-----------|
| SELECT | Authenticated users can read wishes | `auth.role() = 'authenticated'` |
| INSERT | Authenticated users can create wishes | `auth.role() = 'authenticated'` |
| UPDATE | Authenticated users can update wishes | `auth.role() = 'authenticated'` |
| DELETE | Authenticated users can delete wishes | `auth.role() = 'authenticated'` |

## 🔐 Seguridad

Con RLS habilitado:
- ✅ Sin sesión → **No se puede leer/escribir** wishes
- ✅ Con sesión → **Acceso completo** a wishes
- ✅ Protección a nivel de base de datos (no se puede bypassear desde el código)

## 🔄 Rollback (si necesitas deshacer)

```sql
-- Deshabilitar RLS
alter table public.wishes disable row level security;

-- Eliminar políticas
drop policy if exists "Authenticated users can read wishes" on public.wishes;
drop policy if exists "Authenticated users can create wishes" on public.wishes;
drop policy if exists "Authenticated users can update wishes" on public.wishes;
drop policy if exists "Authenticated users can delete wishes" on public.wishes;
```

## 🐛 Troubleshooting

### Problema: Tengo 8 políticas en lugar de 4

**Causa**: Políticas previas o migración ejecutada múltiples veces.

**Solución**:
```sql
-- 1. Ver nombres exactos de todas las políticas
\i list_all_policies.sql

-- 2. Limpiar todas las políticas y recrear
\i cleanup_duplicate_policies.sql

-- 3. Verificar resultado
SELECT count(*) FROM pg_policies WHERE tablename = 'wishes';
-- Debe retornar: 4
```

## 📝 Notas

- Las políticas actuales permiten que **cualquier usuario autenticado** pueda ver/editar **todos** los wishes
- Si necesitas que cada usuario solo vea sus propios wishes, modifica las políticas para incluir `user_id`
- Las políticas se evalúan en el servidor de Supabase, no en tu aplicación
- Tener políticas duplicadas no afecta la seguridad, pero es mejor mantener solo las 4 necesarias
