# Flujo de Navegación

## Rutas y Comportamiento

### Homepage (/)
**Estado:** Pública
**Comportamiento:**
- Usuario NO autenticado → Ve landing page con CTAs
- Usuario autenticado → Redirect automático a `/dashboard`

**Header:**
- Sin sesión: "Ingresar" + "Crear cuenta"
- Con sesión: "Ir al panel" (va a `/dashboard`)

### Login (/login)
**Estado:** Pública
**Comportamiento:**
- Usuario NO autenticado → Ve modal de login/registro
- Usuario autenticado → Redirect a `/dashboard`
- Después de login exitoso → Redirect a `/dashboard`

### Register (/register)
**Estado:** Pública
**Comportamiento:**
- Redirect a `/login` (tabs integrados)

### Dashboard (/dashboard)
**Estado:** Protegida (requiere auth)
**Comportamiento:**
- Usuario NO autenticado → Redirect a `/login?next=/dashboard`
- Usuario autenticado → Ve aplicación principal

**Header:**
- Logo → `/dashboard`
- UserMenu con logout

### Admin (/admin)
**Estado:** Protegida (requiere auth + role admin)
**Comportamiento:**
- Usuario NO autenticado → Redirect a `/login`
- Usuario sin rol admin → Error 403

## Flujos de Usuario

### Nuevo Usuario
1. Visita `/` → Ve landing
2. Click "Crear cuenta" → `/login` (tab registro)
3. Completa registro → Redirect a `/dashboard`
4. Ve aplicación principal

### Usuario Existente
1. Visita `/` → Redirect automático a `/dashboard`
2. Ve aplicación directamente

### Usuario que Cierra Sesión
1. Click "Cerrar sesión" en UserMenu
2. Redirect a `/` (landing)
3. Ve landing con CTAs para volver a ingresar

## Middleware
- Rutas públicas: `/`, `/login`, `/register`, `/auth/callback`, `/api/*`
- Todas las demás rutas requieren autenticación
- Redirect a `/login?next={ruta}` si no hay sesión
