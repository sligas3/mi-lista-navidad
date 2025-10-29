-- ============================================
-- ROW LEVEL SECURITY para tabla wishes
-- ============================================

-- Habilitar RLS en la tabla wishes
alter table public.wishes enable row level security;

-- Policy: Solo usuarios autenticados pueden leer wishes
create policy "Authenticated users can read wishes"
  on public.wishes for select
  using (auth.role() = 'authenticated');

-- Policy: Solo usuarios autenticados pueden crear wishes
create policy "Authenticated users can create wishes"
  on public.wishes for insert
  with check (auth.role() = 'authenticated');

-- Policy: Solo usuarios autenticados pueden actualizar wishes
create policy "Authenticated users can update wishes"
  on public.wishes for update
  using (auth.role() = 'authenticated');

-- Policy: Solo usuarios autenticados pueden eliminar wishes
create policy "Authenticated users can delete wishes"
  on public.wishes for delete
  using (auth.role() = 'authenticated');
