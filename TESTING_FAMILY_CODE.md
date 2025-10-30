# Testing: Códigos de Familia

## Checklist de Testing

### ✅ Migración de Base de Datos

- [ ] Ejecutar `004_add_family_code.sql` en Supabase
- [ ] Verificar columna `family_code` existe en tabla `users`
- [ ] Verificar índice `idx_users_family_code` existe
- [ ] Probar función `generate_family_code()` genera códigos únicos

```sql
-- Verificar columna
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'family_code';

-- Verificar índice
SELECT indexname FROM pg_indexes 
WHERE tablename = 'users' AND indexname = 'idx_users_family_code';

-- Probar función
SELECT generate_family_code();
SELECT generate_family_code();
SELECT generate_family_code();
-- Deben ser diferentes
```

### ✅ Crear Familia (Usuario Nuevo)

1. [ ] Registrar nuevo usuario
2. [ ] Modal "Configura tu Familia" aparece automáticamente
3. [ ] Click "Generar Código"
4. [ ] Código de 8 caracteres aparece
5. [ ] Click "Copiar" copia al clipboard
6. [ ] Click "Crear Familia"
7. [ ] Modal se cierra
8. [ ] Toast "¡Familia configurada!" aparece
9. [ ] Página recarga
10. [ ] Card "Código de Familia" visible en dashboard

### ✅ Unirse a Familia (Usuario Nuevo)

1. [ ] Registrar segundo usuario
2. [ ] Modal "Configura tu Familia" aparece
3. [ ] Click en tab "Unirse"
4. [ ] Ingresar código del primer usuario
5. [ ] Click "Unirse a Familia"
6. [ ] Modal se cierra
7. [ ] Toast "¡Familia configurada!" aparece
8. [ ] Página recarga
9. [ ] Card "Código de Familia" visible con mismo código

### ✅ Filtrado de Deseos

**Setup:**
- Usuario A con código `FAMILIA1`
- Usuario B con código `FAMILIA1`
- Usuario C con código `FAMILIA2`
- Usuario D sin código (legacy)

**Tests:**

1. [ ] Usuario A crea deseo → Usuario B lo ve
2. [ ] Usuario A crea deseo → Usuario C NO lo ve
3. [ ] Usuario B crea deseo → Usuario A lo ve
4. [ ] Usuario C crea deseo → Usuario A y B NO lo ven
5. [ ] Usuario D (sin código) ve TODOS los deseos
6. [ ] Usuario A solo ve deseos de usuarios con `FAMILIA1`

### ✅ Compartir Código

1. [ ] Click "Copiar" en FamilyCodeCard
2. [ ] Código se copia al clipboard
3. [ ] Toast "Copiado" aparece brevemente
4. [ ] Click "Compartir" abre Web Share API (mobile)
5. [ ] En desktop, "Compartir" copia al clipboard
6. [ ] Mensaje incluye código y instrucciones

### ✅ Validaciones

1. [ ] No se puede crear familia sin generar código
2. [ ] No se puede unirse con código vacío
3. [ ] No se puede unirse con código < 6 caracteres
4. [ ] Código inválido muestra error "Código no válido"
5. [ ] Códigos son case-insensitive (ABC = abc)
6. [ ] Input de código convierte a mayúsculas automáticamente

### ✅ Edge Cases

1. [ ] Usuario sin `family_code` ve todos los deseos (legacy)
2. [ ] Usuario configura código → solo ve deseos de su familia
3. [ ] Dos familias con mismo nombre de usuario → filtrado correcto
4. [ ] Usuario sin `display_name` usa email para filtrado
5. [ ] Deseos creados antes de configurar código siguen visibles

### ✅ UI/UX

1. [ ] Modal no se puede cerrar sin configurar (primera vez)
2. [ ] Modal responsive en mobile (390px - 430px)
3. [ ] Botones ≥44px tap target
4. [ ] Animaciones suaves (200-250ms)
5. [ ] Loading states en botones
6. [ ] Errores se muestran claramente
7. [ ] FamilyCodeCard visible en dashboard
8. [ ] Código en formato mono con buen contraste

### ✅ Performance

1. [ ] Query de deseos con índice es rápida
2. [ ] Generación de código < 100ms
3. [ ] Verificación de código < 200ms
4. [ ] No hay N+1 queries
5. [ ] Filtrado eficiente con `IN` clause

## Casos de Prueba Detallados

### Test 1: Crear Primera Familia

```
GIVEN: Usuario nuevo sin family_code
WHEN: Abre dashboard
THEN: Modal "Configura tu Familia" aparece automáticamente

WHEN: Click "Generar Código"
THEN: Código único de 8 caracteres aparece

WHEN: Click "Crear Familia"
THEN: 
  - family_code se guarda en DB
  - Modal se cierra
  - Toast de éxito aparece
  - Página recarga
  - FamilyCodeCard visible
```

### Test 2: Unirse a Familia Existente

```
GIVEN: Usuario A con código "ABC12345"
AND: Usuario B nuevo sin código

WHEN: Usuario B abre dashboard
THEN: Modal aparece

WHEN: Click tab "Unirse"
AND: Ingresa "ABC12345"
AND: Click "Unirse a Familia"
THEN:
  - Código se verifica existe
  - family_code se guarda en DB
  - Modal se cierra
  - Usuario B ve deseos de Usuario A
```

### Test 3: Código Inválido

```
GIVEN: Usuario nuevo
WHEN: Intenta unirse con código "INVALID"
THEN: Error "Código no válido. Verifica con tu familia."
AND: Modal permanece abierto
AND: Usuario puede intentar de nuevo
```

### Test 4: Filtrado de Deseos

```
GIVEN: 
  - Usuario A (FAMILIA1) con 3 deseos
  - Usuario B (FAMILIA1) con 2 deseos
  - Usuario C (FAMILIA2) con 4 deseos

WHEN: Usuario A abre dashboard
THEN: Ve 5 deseos (3 propios + 2 de B)
AND: NO ve los 4 deseos de C

WHEN: Usuario C abre dashboard
THEN: Ve solo sus 4 deseos
AND: NO ve deseos de A ni B
```

## Comandos de Testing

### Verificar Migración
```bash
# En Supabase SQL Editor
SELECT * FROM users WHERE family_code IS NOT NULL;
SELECT generate_family_code();
```

### Limpiar Datos de Test
```sql
-- Resetear códigos de familia (solo en dev)
UPDATE users SET family_code = NULL WHERE email LIKE '%test%';
```

### Logs de Debug
```typescript
// En app/actions.ts
console.log('Family code:', familyCode);
console.log('Family users:', familyUsers);
console.log('Filtered wishes:', data);
```

## Criterios de Aceptación

✅ **Funcionalidad Core**
- Usuarios pueden crear familias
- Usuarios pueden unirse a familias
- Filtrado de deseos funciona correctamente
- Compartir código es fácil

✅ **UX**
- Modal intuitivo y claro
- Proceso simple (< 3 clicks)
- Errores claros y accionables
- Responsive en todos los dispositivos

✅ **Performance**
- Queries rápidas (< 500ms)
- Sin degradación con muchos usuarios
- Índices optimizados

✅ **Seguridad**
- Solo familia ve deseos
- Códigos únicos y verificados
- No hay leaks de información
