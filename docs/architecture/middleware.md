# Middleware de Autenticación

## 🎯 Propósito

El middleware intercepta **todas las requests** antes de que lleguen al servidor y verifica la autenticación del usuario.

## 🔒 Rutas Protegidas

### Rutas Públicas (sin autenticación)
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/auth/callback` - Callback de OAuth
- `/api/health` - Health check
- `/api/keep-alive` - Keep-alive

### Rutas Protegidas (requieren autenticación)
- `/` - Página principal
- `/admin` - Panel de administración
- `/api/link-preview` - Preview de enlaces
- Cualquier otra ruta no pública

## 🔄 Flujo

1. Usuario accede a ruta
2. ¿Es ruta pública? → Permitir
3. ¿Tiene sesión? → Permitir
4. Sin sesión → Redirigir a `/login?next=ruta`

## 🛠️ Agregar Ruta Pública

```typescript
const PUBLIC_PATHS = [
  '/login',
  '/tu-nueva-ruta', // Agregar aquí
]
```

## 🔐 Triple Capa de Protección

1. **Middleware** (Edge) - Redirección rápida
2. **AuthGuard** (Server) - Protección de componentes
3. **Server Actions** - Protección de datos
