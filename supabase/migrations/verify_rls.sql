-- ============================================
-- SCRIPT DE VERIFICACIÓN DE RLS
-- ============================================
-- Ejecuta este script para verificar que RLS está correctamente configurado

-- 1. Verificar que RLS está habilitado en wishes
select 
  tablename,
  rowsecurity as "RLS Habilitado"
from pg_tables 
where schemaname = 'public' and tablename = 'wishes';

-- 2. Listar todas las políticas de wishes
select 
  policyname as "Política",
  cmd as "Operación",
  qual as "Condición USING",
  with_check as "Condición WITH CHECK"
from pg_policies 
where tablename = 'wishes'
order by cmd;

-- 3. Verificar que RLS está habilitado en users
select 
  tablename,
  rowsecurity as "RLS Habilitado"
from pg_tables 
where schemaname = 'public' and tablename = 'users';

-- 4. Contar políticas activas
select 
  tablename as "Tabla",
  count(*) as "Políticas Activas"
from pg_policies 
where schemaname = 'public'
group by tablename
order by tablename;

-- ============================================
-- RESULTADO ESPERADO:
-- ============================================
-- wishes: RLS Habilitado = true, 4 políticas
-- users: RLS Habilitado = true, 4 políticas
--
-- Si tienes más de 4 políticas en wishes:
-- Ejecutar: cleanup_duplicate_policies.sql
-- ============================================
