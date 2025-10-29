# Arquitectura de Rutas

## Rutas Públicas (sin autenticación)
- `/` - Homepage/Landing (redirecciona a `/dashboard` si hay sesión)
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/auth/callback` - Callback de autenticación OAuth

## Rutas Protegidas (requieren autenticación)
- `/dashboard` - Aplicación principal (lista de deseos)
- `/admin` - Panel de administración

## Flujo de Navegación

### Usuario NO autenticado
1. Visita `/` → Ve landing page con CTAs
2. Click "Ingresar" → `/login`
3. Login exitoso → Redirect a `/dashboard`

### Usuario autenticado
1. Visita `/` → Redirect automático a `/dashboard`
2. Visita `/dashboard` → Ve la aplicación
3. Visita `/login` → Puede redirigir a `/dashboard` (opcional)

## Middleware
- Rutas públicas: `["/", "/login", "/register", "/auth/callback", "/api/*"]`
- Todas las demás rutas requieren autenticación
- Redirect a `/login` si no hay sesión en rutas protegidas
