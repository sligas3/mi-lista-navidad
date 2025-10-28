# 🔐 Guía de Autenticación

## Configuración Inicial

### 1. Google OAuth

**Google Cloud Console:**
1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea proyecto o selecciona existente
3. APIs & Services → Credentials → Create OAuth Client ID
4. Tipo: Web application
5. Authorized redirect URIs:
   ```
   https://xvyvggqjgwilrlzdjqlf.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```
6. Guarda Client ID y Client Secret

**Supabase Dashboard:**
1. Authentication → Providers → Google
2. Habilita Google
3. Pega Client ID y Client Secret
4. Save

### 2. Variables de Entorno

Crea `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xvyvggqjgwilrlzdjqlf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Base de Datos

Ejecuta en Supabase SQL Editor:
```sql
-- Ver archivo: supabase/migrations/002_create_users_table.sql
```

---

## Uso en la Aplicación

### Proteger Páginas

```tsx
// Server Component
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <YourContent />
    </AuthGuard>
  )
}

// Solo admins
<AuthGuard requireAdmin>
  <AdminContent />
</AuthGuard>
```

### Obtener Usuario Actual

```tsx
import { getCurrentUser } from '@/app/actions/auth'

const user = await getCurrentUser()

if (user) {
  console.log(user.display_name, user.email, user.role)
}
```

### Verificar Roles

```tsx
import { isAdmin } from '@/lib/auth-helpers'

const admin = await isAdmin()

if (admin) {
  // Mostrar opciones admin
}
```

---

## Flujos de Autenticación

### Login con Google
1. Usuario click "Continuar con Google"
2. Redirect a Google OAuth
3. Google redirect a `/auth/callback?code=xxx`
4. Callback intercambia code por session
5. Trigger crea perfil en `users` automáticamente
6. Redirect a `/`

### Login con Email/Password
1. Usuario ingresa email y contraseña
2. `signInWithPassword()`
3. Session creada
4. Redirect automático

### Registro
1. Usuario ingresa nombre, email, contraseña
2. `signUp()` con metadata
3. Email de confirmación enviado
4. Usuario confirma email
5. Trigger crea perfil en `users`

### Logout
1. Click en "Cerrar sesión"
2. `signOut()`
3. Session eliminada
4. Redirect a `/login`

---

## Hacer Usuario Admin

**Opción 1: SQL (Recomendado)**
```sql
update public.users 
set role = 'admin' 
where email = 'admin@example.com';
```

**Opción 2: Desde código**
```tsx
import { updateUserRole } from '@/app/actions/admin'
await updateUserRole(userId, 'admin')
```

---

## Rutas Disponibles

- `/login` - Iniciar sesión
- `/register` - Crear cuenta
- `/admin` - Panel admin (solo admins)
- `/auth/callback` - Callback OAuth (no visitar directamente)

---

## Troubleshooting

### Error: "Invalid redirect URL"
- Verifica que la URL esté en Google Cloud Console
- Verifica que coincida exactamente (http vs https)

### Error: "Email not confirmed"
- Usuario debe confirmar email antes de login
- Revisa bandeja de spam

### Perfil no se crea automáticamente
- Verifica que el trigger `on_auth_user_created` exista
- Ejecuta la migración SQL nuevamente

### No puedo acceder a /admin
- Verifica que tu usuario tenga `role = 'admin'`
- Ejecuta SQL para cambiar rol

---

## Testing Checklist

- [ ] Login con Google funciona
- [ ] Login con email/password funciona
- [ ] Registro crea cuenta y envía email
- [ ] Perfil se crea en `users` automáticamente
- [ ] Logout cierra sesión correctamente
- [ ] Páginas protegidas redirigen a /login
- [ ] Admin puede ver /admin
- [ ] User no puede ver /admin
- [ ] Avatar de Google se muestra
- [ ] Display name se guarda correctamente

---

## Seguridad

✅ **Implementado:**
- RLS en tabla `users`
- Service role solo en server
- Cookies httpOnly
- CSRF protection (Supabase)
- Email confirmation

⚠️ **Recomendaciones:**
- Habilita 2FA en Supabase Dashboard
- Configura rate limiting
- Revisa logs de auth regularmente
- Usa HTTPS en producción

---

## Deploy en Vercel

1. Push código a GitHub
2. Importa proyecto en Vercel
3. Agrega variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (tu dominio de Vercel)
4. Deploy
5. Actualiza redirect URIs en Google Cloud Console con tu dominio de Vercel

---

**Última actualización**: Diciembre 2024
