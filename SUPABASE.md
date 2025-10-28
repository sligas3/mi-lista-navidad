# 🗄️ Configuración de Supabase

## Script SQL Completo

Ejecuta este script en **SQL Editor** de Supabase:

```sql
-- ============================================
-- TABLA: wishes (deseos navideños)
-- ============================================
CREATE TABLE IF NOT EXISTS wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_usuario TEXT NOT NULL CHECK (char_length(nombre_usuario) >= 2),
  deseo TEXT NOT NULL CHECK (char_length(deseo) >= 3),
  prioridad INTEGER DEFAULT 1 CHECK (prioridad BETWEEN 1 AND 3),
  cumplido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ÍNDICES para optimización
-- ============================================
CREATE INDEX IF NOT EXISTS idx_wishes_usuario ON wishes(nombre_usuario);
CREATE INDEX IF NOT EXISTS idx_wishes_created ON wishes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wishes_prioridad ON wishes(prioridad);
CREATE INDEX IF NOT EXISTS idx_wishes_cumplido ON wishes(cumplido);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Lectura pública de deseos" ON wishes;
DROP POLICY IF EXISTS "Crear deseos con nombre" ON wishes;
DROP POLICY IF EXISTS "Actualizar deseos simple" ON wishes;
DROP POLICY IF EXISTS "Eliminar deseos simple" ON wishes;

-- Política 1: Todos pueden LEER todos los deseos
CREATE POLICY "Lectura pública de deseos"
  ON wishes FOR SELECT
  USING (true);

-- Política 2: Cualquiera puede CREAR deseos
CREATE POLICY "Crear deseos con nombre"
  ON wishes FOR INSERT
  WITH CHECK (
    char_length(nombre_usuario) >= 2 AND
    char_length(deseo) >= 3
  );

-- Política 3: Cualquiera puede ACTUALIZAR deseos
CREATE POLICY "Actualizar deseos simple"
  ON wishes FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política 4: Cualquiera puede ELIMINAR deseos
CREATE POLICY "Eliminar deseos simple"
  ON wishes FOR DELETE
  USING (true);

-- ============================================
-- DATOS DE EJEMPLO (opcional)
-- ============================================
INSERT INTO wishes (nombre_usuario, deseo, prioridad, cumplido) VALUES
  ('Santa Claus', 'Más galletas y leche 🍪', 3, false),
  ('Rodolfo', 'Una nariz menos brillante', 2, false),
  ('Elfo Pepito', 'Vacaciones en la playa ☀️', 1, true),
  ('Mamá Noel', 'Un nuevo trineo más rápido 🛷', 3, false),
  ('Frosty', 'Un refrigerador portátil ❄️', 2, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- FUNCIÓN: Limpiar deseos antiguos (opcional)
-- ============================================
CREATE OR REPLACE FUNCTION limpiar_deseos_antiguos()
RETURNS void AS $$
BEGIN
  DELETE FROM wishes 
  WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ver todos los deseos
SELECT * FROM wishes ORDER BY created_at DESC;

-- Contar deseos por usuario
SELECT nombre_usuario, COUNT(*) as total
FROM wishes
GROUP BY nombre_usuario
ORDER BY total DESC;

-- Ver políticas activas
SELECT * FROM pg_policies WHERE tablename = 'wishes';
```

---

## Obtener Credenciales

### 1. Project URL

1. Ve a **Settings** → **API**
2. Copia **Project URL**
3. Ejemplo: `https://xvyvggqjgwilrlzdjqlf.supabase.co`

### 2. Anon Key

1. En la misma página (**Settings** → **API**)
2. Copia **anon** / **public** key
3. Ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## Verificar Configuración

### Desde Table Editor

1. Ve a **Table Editor**
2. Deberías ver la tabla `wishes`
3. Verifica que tenga las columnas correctas

### Desde SQL Editor

```sql
-- Ver estructura de la tabla
\d wishes

-- Contar registros
SELECT COUNT(*) FROM wishes;

-- Ver políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'wishes';
```

---

## Seguridad RLS

### Políticas Actuales

| Operación | Permiso | Validación |
|-----------|---------|------------|
| SELECT | Público | Ninguna |
| INSERT | Público | nombre ≥ 2 chars, deseo ≥ 3 chars |
| UPDATE | Público | Ninguna |
| DELETE | Público | Ninguna |

### ⚠️ Nota de Seguridad

Esta configuración es **simple** para el proyecto navideño. En producción real, considera:

```sql
-- Agregar columna de código secreto
ALTER TABLE wishes ADD COLUMN codigo_secreto TEXT;

-- Política mejorada para UPDATE
CREATE POLICY "Actualizar con código"
  ON wishes FOR UPDATE
  USING (codigo_secreto = current_setting('app.codigo', true));
```

---

## Backup de Datos

### Exportar datos

```sql
-- Desde SQL Editor
COPY wishes TO '/tmp/wishes_backup.csv' CSV HEADER;
```

### Desde Dashboard

1. Ve a **Table Editor**
2. Selecciona tabla `wishes`
3. Click en "..." → "Export as CSV"

---

## Restaurar Tabla

Si necesitas recrear la tabla:

```sql
-- Eliminar tabla
DROP TABLE IF EXISTS wishes CASCADE;

-- Volver a ejecutar el script de creación
-- (ver arriba)
```

---

## Monitoreo

### Ver queries en tiempo real

1. Ve a **Database** → **Query Performance**
2. Observa queries lentas
3. Optimiza con índices si es necesario

### Ver uso de recursos

1. Ve a **Settings** → **Usage**
2. Revisa:
   - Database size
   - API requests
   - Bandwidth

---

## Límites del Plan Gratuito

- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth/mes
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

**Suficiente para este proyecto** 🎉

---

## Troubleshooting

### Error: "new row violates row-level security policy"

**Causa**: RLS bloqueando operación

**Solución**:
```sql
-- Verificar políticas
SELECT * FROM pg_policies WHERE tablename = 'wishes';

-- Deshabilitar RLS temporalmente (solo para debug)
ALTER TABLE wishes DISABLE ROW LEVEL SECURITY;
```

### Error: "relation wishes does not exist"

**Causa**: Tabla no creada

**Solución**: Ejecutar script de creación completo

### Queries lentas

**Solución**: Verificar índices
```sql
-- Ver índices existentes
SELECT * FROM pg_indexes WHERE tablename = 'wishes';

-- Crear índice faltante
CREATE INDEX idx_nombre ON wishes(nombre_usuario);
```

---

## Comandos Útiles

```sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver tamaño de la tabla
SELECT pg_size_pretty(pg_total_relation_size('wishes'));

-- Vaciar tabla (mantener estructura)
TRUNCATE wishes;

-- Resetear IDs (si usaras SERIAL)
ALTER SEQUENCE wishes_id_seq RESTART WITH 1;

-- Ver últimos 10 deseos
SELECT * FROM wishes ORDER BY created_at DESC LIMIT 10;
```

---

## Migración a Producción

Si quieres políticas más estrictas:

```sql
-- Deshabilitar políticas simples
DROP POLICY "Actualizar deseos simple" ON wishes;
DROP POLICY "Eliminar deseos simple" ON wishes;

-- Agregar columna de autenticación
ALTER TABLE wishes ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Política: solo el dueño puede editar
CREATE POLICY "Actualizar propios deseos"
  ON wishes FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: solo el dueño puede eliminar
CREATE POLICY "Eliminar propios deseos"
  ON wishes FOR DELETE
  USING (auth.uid() = user_id);
```

---

¡Configuración de Supabase completa! 🗄️✨
