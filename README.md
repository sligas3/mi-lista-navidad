# 🎄 Mi Lista de Deseos Navideña

Una aplicación web festiva para crear y compartir listas de deseos navideños con familia y amigos.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Características

### 🔐 Autenticación
- **Login/Registro unificado**: Panel con tabs intuitivos
- **Google OAuth**: Inicio de sesión social rápido
- **Email/Password**: Autenticación tradicional con validaciones
- **Sesión persistente**: Reconoce usuarios autenticados
- **Logout visible**: Botón siempre accesible en header
- **Validaciones en vivo**: Email válido, password mínimo 6 caracteres
- **Medidor de fortaleza**: Indica seguridad de contraseña
- **Toggle ver contraseña**: 👁️ para mostrar/ocultar
- **Mensajes claros**: Errores con soluciones, feedback inmediato

### 🎁 Gestión de Deseos
- **CRUD completo**: Crear, leer, actualizar y eliminar deseos
- **Permisos por sesión**: Solo el dueño edita/elimina sus deseos
- **URLs largas**: Soporta links hasta 2048 caracteres
- **Previews de links**: Muestra imagen y descripción de URLs
- **Prioridades**: Clasifica deseos por importancia (1-3 estrellas)
- **Estado**: Marca deseos como cumplidos o pendientes

### 🔍 Navegación y Filtros
- **Filtros**: Por estado, usuario y búsqueda de texto
- **Estadísticas**: Visualiza progreso y métricas
- **Exportar**: Copia la lista completa como texto
- **Compartir**: Enlace directo para compartir

### 🎨 UX/UI
- **Responsive**: Optimizado para iPhone 11–15 Pro Max
- **Tap targets**: Mínimo 44px para accesibilidad táctil
- **Safe areas**: Soporte para notch/Dynamic Island
- **Animaciones suaves**: Respeta prefers-reduced-motion
- **Tema navideño**: Colores festivos, emojis y nieve cayendo
- **Toasts**: Notificaciones de éxito/error con feedback claro

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Autenticación**: Supabase Auth (Google OAuth + Email/Password)
- **Base de datos**: Supabase (PostgreSQL con RLS)
- **Estilos**: TailwindCSS 4
- **Lenguaje**: TypeScript
- **Deploy**: Vercel
- **Fuentes**: Poppins, Manrope (Google Fonts)

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) (para deploy)

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd mi-lista-navidad
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

#### a) Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Guarda la contraseña de la base de datos

#### b) Configurar autenticación

1. En **Authentication → Providers**, habilita:
   - **Email** (activado por defecto)
   - **Google** (opcional, requiere OAuth credentials)

2. Para Google OAuth:
   - Ve a [Google Cloud Console](https://console.cloud.google.com)
   - Crea un proyecto y habilita Google+ API
   - Crea credenciales OAuth 2.0
   - Añade redirect URI: `https://<tu-proyecto>.supabase.co/auth/v1/callback`
   - Copia Client ID y Secret a Supabase

#### c) Ejecutar migraciones SQL

En el **SQL Editor** de Supabase, ejecuta los archivos en `supabase/migrations/`:

1. **002_create_users_table.sql**: Crea tabla users con triggers
2. **001_create_wishes_table.sql**: Crea tabla wishes (si existe)

O ejecuta manualmente:

```sql
-- Ver supabase/migrations/002_create_users_table.sql
-- Crea tabla users, triggers y políticas RLS
```

#### d) Obtener credenciales

En **Settings → API**, copia:
- Project URL
- anon/public key

### 4. Configurar variables de entorno

Crea `.env.local` en la raíz:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Push a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará Next.js automáticamente

3. **Configurar variables de entorno**
   
   En **Settings → Environment Variables**, agrega:
   
   | Variable | Valor |
   |----------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu anon key |

4. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ¡Listo! 🎉

### Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Configurar variables cuando te lo pida
# NEXT_PUBLIC_SUPABASE_URL: <tu-url>
# NEXT_PUBLIC_SUPABASE_ANON_KEY: <tu-key>

# Deploy a producción
vercel --prod
```

## 🔧 Configuración de Vercel

### Build Settings (automático)

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Variables de Entorno

Asegúrate de agregar en **todas las environments** (Production, Preview, Development):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## ✅ Verificación Post-Deploy

### Checklist

- [ ] La app carga correctamente
- [ ] Modal de usuario aparece
- [ ] Se pueden crear deseos
- [ ] Se pueden marcar como cumplidos
- [ ] Se pueden eliminar deseos
- [ ] Filtros funcionan
- [ ] Búsqueda funciona
- [ ] Estadísticas se muestran
- [ ] Exportar copia al portapapeles
- [ ] Compartir copia URL
- [ ] Nieve cae correctamente
- [ ] Responsive en móvil

### Comandos de Verificación

```bash
# Ver logs en Vercel
vercel logs <deployment-url>

# Ver build logs
vercel inspect <deployment-url>
```

## 🔐 Flujos de Autenticación

### Registro de Usuario

1. Usuario hace click en "Ingresar" (header)
2. Se muestra AuthPanel con tabs
3. Usuario selecciona "Crear cuenta"
4. Opciones:
   - **Google**: Redirect a OAuth, callback automático
   - **Email**: Completa nombre, email, contraseña
5. Validaciones en vivo:
   - Email válido (regex)
   - Password ≥ 6 caracteres
   - Medidor de fortaleza (Débil/Media/Fuerte)
6. Al enviar:
   - Supabase crea usuario en `auth.users`
   - Trigger crea perfil en `public.users`
   - Email de confirmación enviado
7. Usuario confirma email y puede iniciar sesión

### Inicio de Sesión
1. Usuario hace click en "Ingresar"
2. Tab "Iniciar sesión" activo por defecto
3. Opciones:
   - **Google**: Login instantáneo
   - **Email**: Ingresa credenciales
4. Validación de email en vivo
5. Al enviar:
   - Supabase valida credenciales
   - Si éxito: redirect a home (o returnUrl)
   - Si error: mensaje claro con solución
6. Header muestra avatar + nombre + botón "Salir"

### Sesión Activa

- **Header**: Muestra UserMenu con avatar, nombre y botón Logout
- **WishForm**: Prellenado con nombre del usuario, no editable
- **WishItem**: Solo dueño ve botones editar/eliminar
- **Permisos**: Crear/editar/eliminar requieren sesión

### Cierre de Sesión
1. Usuario hace click en "Salir" (header)
2. Supabase cierra sesión
3. Toast: "Sesión cerrada correctamente"
4. Redirect a home
5. Header muestra botón "Ingresar"

### Protección de Rutas

- **Públicas**: Home, ver lista de deseos
- **Requieren sesión**: Crear, editar, eliminar deseos
- **Redirect automático**: Si usuario ya logueado visita /login → home

## 🐛 Troubleshooting

### Error: "Missing environment variables"

**Solución**: Verifica que las variables estén en Vercel:
```bash
vercel env ls
```

### Error: "Failed to fetch wishes"

**Solución**: Verifica las políticas RLS en Supabase:
```sql
SELECT * FROM pg_policies WHERE tablename = 'wishes';
```

### Error: "Build failed"

**Solución**: Verifica que el build funcione localmente:
```bash
npm run build
npm start
```

### La app no actualiza después de cambios

**Solución**: Redeploy forzado:
```bash
vercel --force
```

## 📁 Estructura del Proyecto

```
mi-lista-navidad/
├── app/
│   ├── actions.ts          # Server Actions (CRUD)
│   ├── ClientPage.tsx      # Componente cliente principal
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout con fuente
│   └── page.tsx            # Página principal (SSR)
├── components/
│   ├── ExportButton.tsx    # Exportar lista
│   ├── Footer.tsx          # Footer con contador
│   ├── HeaderNavidad.tsx   # Header festivo
│   ├── SnowEffect.tsx      # Efecto nieve
│   ├── Stats.tsx           # Estadísticas
│   ├── Toast.tsx           # Notificaciones
│   ├── UserFilter.tsx      # Filtro por usuario
│   ├── UserModal.tsx       # Modal captura nombre
│   ├── WishForm.tsx        # Formulario deseos
│   ├── WishItem.tsx        # Card de deseo
│   └── WishList.tsx        # Lista con filtros
├── hooks/
│   └── useLocalStorage.ts  # Hook localStorage
├── lib/
│   ├── supabase.ts         # Cliente Supabase
│   └── utils.ts            # Utilidades
├── .env.example            # Plantilla variables
├── .env.local              # Variables locales (no commitear)
├── next.config.js          # Config Next.js
├── package.json            # Dependencias
├── tailwind.config.ts      # Config Tailwind
└── tsconfig.json           # Config TypeScript
```

## 🎨 Personalización

### Cambiar colores

Edita `tailwind.config.ts`:

```typescript
colors: {
  navidad: {
    rojo: '#C41E3A',    // Tu color
    verde: '#165B33',   // Tu color
    dorado: '#FFD700',  // Tu color
  }
}
```

### Cambiar fuente

Edita `app/layout.tsx`:

```typescript
import { Tu_Fuente } from 'next/font/google'
```

### Desactivar nieve

En `app/ClientPage.tsx`, comenta:

```typescript
// <SnowEffect />
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Linter ESLint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto

## 🎅 Créditos

Desarrollado con ❤️ y ☕ para esta Navidad 🎄

---

**¿Problemas?** Abre un issue en GitHub
**¿Sugerencias?** Pull requests son bienvenidos

¡Felices fiestas! 🎁✨
