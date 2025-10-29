-- ============================================
-- LISTAR TODAS LAS POLÍTICAS DE WISHES
-- ============================================
-- Ejecutar este script para ver EXACTAMENTE qué políticas existen

SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as operacion,
  permissive,
  roles,
  qual as condicion_using,
  with_check as condicion_with_check
FROM pg_policies 
WHERE tablename = 'wishes'
ORDER BY policyname;

-- Este script mostrará TODAS las políticas con sus nombres exactos
-- Si ves políticas con nombres diferentes, significa que había políticas previas
