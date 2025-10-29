-- ============================================
-- LIMPIAR POLÍTICAS DUPLICADAS
-- ============================================
-- Ejecutar este script si tienes políticas duplicadas en wishes

-- 1. Ver todas las políticas actuales CON NOMBRES EXACTOS
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'wishes'
ORDER BY cmd, policyname;

-- 2. Eliminar TODAS las políticas de wishes
-- Políticas nuevas (con autenticación)
DROP POLICY IF EXISTS "Authenticated users can read wishes" ON public.wishes;
DROP POLICY IF EXISTS "Authenticated users can create wishes" ON public.wishes;
DROP POLICY IF EXISTS "Authenticated users can update wishes" ON public.wishes;
DROP POLICY IF EXISTS "Authenticated users can delete wishes" ON public.wishes;

-- Políticas antiguas INSEGURAS (sin autenticación) - ELIMINAR
DROP POLICY IF EXISTS "Lectura pública de deseos" ON public.wishes;
DROP POLICY IF EXISTS "Crear deseos con nombre" ON public.wishes;
DROP POLICY IF EXISTS "Actualizar deseos simple" ON public.wishes;
DROP POLICY IF EXISTS "Eliminar deseos simple" ON public.wishes;

-- Otras posibles variantes
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.wishes;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.wishes;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.wishes;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.wishes;

-- 3. Recrear las políticas correctamente (solo una vez)
CREATE POLICY "Authenticated users can read wishes"
  ON public.wishes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create wishes"
  ON public.wishes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update wishes"
  ON public.wishes FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete wishes"
  ON public.wishes FOR DELETE
  USING (auth.role() = 'authenticated');

-- 4. Verificar que ahora hay exactamente 4 políticas
SELECT 
  tablename,
  count(*) as "Total Políticas"
FROM pg_policies 
WHERE tablename = 'wishes'
GROUP BY tablename;

-- Resultado esperado: 4 políticas
