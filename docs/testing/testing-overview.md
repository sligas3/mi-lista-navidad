# Plan de Pruebas - Autenticación

## 🎯 Casos de Prueba

### 1. Usuario No Logueado

#### Test 1.1: Acceso a página principal
**Pasos**:
1. Abrir navegador en modo incógnito
2. Ir a `http://localhost:3000/`

**Resultado esperado**:
- ✅ Redirige a `/login?next=/`
- ✅ Muestra mensaje: "🎄 Inicia sesión para ver tu lista"
- ✅ Mensaje desaparece después de 5 segundos

#### Test 1.2: Acceso a API sin sesión
**Pasos**:
1. Abrir DevTools > Console
2. Ejecutar:
```javascript
fetch('/api/link-preview?url=https://example.com')
  .then(r => r.json())
  .then(console.log)
```

**Resultado esperado**:
- ✅ Respuesta: `{ "error": "No autenticado" }`
- ✅ Status: 401

#### Test 1.3: Acceso a rutas públicas
**Pasos**:
1. Modo incógnito
2. Ir a `/login`
3. Ir a `/api/health`

**Resultado esperado**:
- ✅ `/login` muestra página de login
- ✅ `/api/health` retorna JSON con status

---

### 2. Usuario Logueado

#### Test 2.1: Acceso a página principal
**Pasos**:
1. Login con credenciales válidas
2. Ir a `/`

**Resultado esperado**:
- ✅ Muestra lista de deseos
- ✅ Toast: "¡Bienvenido, [nombre]! 🎄"
- ✅ Toast desaparece después de 4 segundos

#### Test 2.2: Crear deseo
**Pasos**:
1. Click en botón "Agregar"
2. Escribir deseo
3. Seleccionar prioridad
4. Submit

**Resultado esperado**:
- ✅ Deseo se crea correctamente
- ✅ Toast: "¡Deseo agregado con éxito!"
- ✅ Lista se actualiza

#### Test 2.3: Editar deseo
**Pasos**:
1. Click en toggle de un deseo
2. Marcar como cumplido

**Resultado esperado**:
- ✅ Estado cambia
- ✅ Toast: "¡Deseo cumplido!"

#### Test 2.4: Eliminar deseo
**Pasos**:
1. Click en botón eliminar
2. Confirmar

**Resultado esperado**:
- ✅ Deseo se elimina
- ✅ Toast: "Deseo eliminado correctamente"

#### Test 2.5: Acceso a /login con sesión
**Pasos**:
1. Estando logueado
2. Ir a `/login`

**Resultado esperado**:
- ✅ Redirige automáticamente a `/`

---

### 3. Server Actions

#### Test 3.1: getWishes sin sesión
**Pasos**:
1. Modo incógnito
2. Intentar acceder a `/` (AuthGuard debe bloquear)

**Resultado esperado**:
- ✅ Redirige a login antes de ejecutar getWishes

#### Test 3.2: createWish sin sesión
**Pasos**:
1. Abrir DevTools > Console
2. Ejecutar (sin sesión):
```javascript
// Esto no debería ser posible desde UI
// pero verificamos la protección del servidor
```

**Resultado esperado**:
- ✅ Error: "No autenticado"

---

### 4. RLS (Row Level Security)

#### Test 4.1: Verificar RLS habilitado
**Pasos**:
1. Ir a Supabase Dashboard > SQL Editor
2. Ejecutar:
```sql
select tablename, rowsecurity 
from pg_tables 
where schemaname = 'public' and tablename = 'wishes';
```

**Resultado esperado**:
- ✅ `rowsecurity = true`

#### Test 4.2: Query sin autenticación
**Pasos**:
1. Usar anon key directamente
2. Intentar SELECT en wishes

**Resultado esperado**:
- ✅ Retorna 0 filas (RLS bloquea)

#### Test 4.3: Query con autenticación
**Pasos**:
1. Login normal
2. Hacer query desde la app

**Resultado esperado**:
- ✅ Retorna wishes correctamente

---

### 5. Middleware

#### Test 5.1: Rutas protegidas
**Pasos**:
1. Modo incógnito
2. Intentar acceder a:
   - `/`
   - `/admin`

**Resultado esperado**:
- ✅ Ambas redirigen a `/login?next=<ruta>`

#### Test 5.2: Rutas públicas
**Pasos**:
1. Modo incógnito
2. Acceder a:
   - `/login`
   - `/api/health`
   - `/api/keep-alive`

**Resultado esperado**:
- ✅ Todas accesibles sin autenticación

---

### 6. Flujo Completo

#### Test 6.1: Flujo de login completo
**Pasos**:
1. Modo incógnito
2. Ir a `/`
3. Redirige a `/login?next=/`
4. Login con email/password
5. Redirige a `/`

**Resultado esperado**:
- ✅ Cada paso funciona correctamente
- ✅ Mensaje de bienvenida aparece
- ✅ Lista de deseos visible

#### Test 6.2: Flujo de registro completo
**Pasos**:
1. Modo incógnito
2. Ir a `/login`
3. Click en "Crear cuenta"
4. Llenar formulario
5. Submit

**Resultado esperado**:
- ✅ Cuenta creada
- ✅ Redirige a `/`
- ✅ Mensaje de bienvenida

---

## 🔧 Scripts de Verificación

### Verificar RLS
```bash
# Ejecutar en Supabase SQL Editor
\i supabase/migrations/verify_rls.sql
```

### Verificar Middleware
```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Probar rutas
curl -I http://localhost:3000/
curl -I http://localhost:3000/login
curl -I http://localhost:3000/api/health
```

### Verificar Server Actions
```bash
# En DevTools Console (sin sesión)
fetch('/api/link-preview?url=https://example.com')
  .then(r => r.json())
  .then(console.log)
# Debe retornar: { "error": "No autenticado" }
```

---

## 📊 Checklist de QA

### Seguridad
- [ ] RLS habilitado en wishes
- [ ] RLS habilitado en users
- [ ] Middleware protege rutas sensibles
- [ ] Server Actions verifican sesión
- [ ] APIs retornan 401 sin sesión

### UX
- [ ] Redirección rápida sin parpadeos
- [ ] Mensajes claros y contextuales
- [ ] Auto-dismiss de notificaciones
- [ ] Flujo de login intuitivo
- [ ] Flujo de registro intuitivo

### Funcionalidad
- [ ] Login con email/password funciona
- [ ] Login con Google funciona
- [ ] Registro funciona
- [ ] Crear deseo funciona
- [ ] Editar deseo funciona
- [ ] Eliminar deseo funciona
- [ ] Logout funciona

### Performance
- [ ] Middleware no añade latencia notable
- [ ] Redirecciones son instantáneas
- [ ] No hay parpadeos en la UI

---

## 🐛 Problemas Conocidos y Soluciones

### Problema: "Redirect loop"
**Causa**: Middleware redirige a login, login redirige a home, home redirige a login
**Solución**: Verificar que `/login` está en PUBLIC_PATHS

### Problema: RLS bloquea queries válidas
**Causa**: Políticas mal configuradas
**Solución**: Verificar que `auth.role() = 'authenticated'` está en las políticas

### Problema: Toast no aparece después de login
**Causa**: sessionStorage no se establece
**Solución**: Verificar que `sessionStorage.setItem('new_session', 'true')` se ejecuta

---

## 📝 Reporte de Bugs

Si encuentras un bug, reporta con:
1. Pasos para reproducir
2. Resultado esperado
3. Resultado actual
4. Screenshots/logs
5. Navegador y versión
