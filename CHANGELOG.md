# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [2.5.1] - 2024-01-XX

### 📚 Documentación
- Reorganización completa de archivos MD en carpeta `docs/`
- Estructura organizada por categorías:
  - `architecture/` - Arquitectura y diseño del sistema
  - `development/` - Guías de desarrollo
  - `deployment/` - Deployment y optimización
  - `guides/` - Guías específicas de funcionalidades
  - `testing/` - Documentación de testing
  - `ui-components/` - Componentes UI
  - `database/` - Base de datos y migraciones
- README principal en `docs/` con índice completo
- Nombres de archivos coherentes y descriptivos

---

## [2.5.0] - 2024-01-XX

### 🎉 Agregado
- **Loader de Árbol Navideño** reemplazando CookieLoader
- Árbol SVG con bolas rojas (#E11D48) y doradas (#FACC15)
- Luces multicolor animadas (verde → dorado → rojo → blanco)
- Animación de glow y pulse en el árbol
- Respeta `prefers-reduced-motion` para accesibilidad

### 🎨 Mejorado
- Botón Scroll to Top con transiciones fade in/out suaves (200ms)
- Posicionamiento del botón scroll ajustado (bottom-24) para evitar superposición con FABs
- Botones de filtrado en WishList con grid 3 columnas alineados
- Layout responsivo en filtros: vertical en móvil, horizontal en desktop
- Tipografía del loader consistente con fuente de la app
- Sombreado (drop-shadow-lg) en texto del loader
- Tamaños responsivos del loader: 112px móvil, 128px desktop

### 🗑️ Eliminado
- CookieLoader.tsx y todas sus referencias
- Animación de galleta comiéndose

---

## [2.4.0] - 2024-01-XX

### 🎉 Agregado
- **Botón Scroll to Top** con diseño glassmorphism sutil
- Animaciones SVG nativas para decoraciones

### 🎨 Mejorado
- Botón scroll to top con backdrop blur y diseño no invasivo
- Aparición del botón solo después de 300px de scroll
- Posicionamiento optimizado para no interferir con FABs

---

## [2.3.0] - 2024-01-XX

### 🎉 Agregado
- **Cookie Loader** animado con SVG de galletita comiéndose
- Loader con backdrop blur durante login/logout
- Countdown navideño fijo en header (solo con family_code)
- Paginación en lista de deseos (10 items por página)
- Scroll automático al cambiar de página

### 🎨 Mejorado
- Todos los emojis de landing reemplazados por iconos SVG:
  - 🎄 → TreePine icon
  - 💡 → Lightbulb icon
  - ❤️ → Heart icon (con fill)
- Header rediseñado mobile-first con hamburger menu
- Animación de campo nombre solo en cambios manuales de tab
- Botón "Crear Cuenta" desde landing abre tab correcto sin animación

### 🐛 Corregido
- Animación no deseada al abrir registro desde landing page
- Falta de feedback visual durante login/logout
- Navegación incorrecta desde botón "Crear Cuenta"

---

## [2.2.0] - 2024-01-XX

### 🎉 Agregado
- **Sistema de Códigos de Familia** para restringir listas por familia
- Modal automático para configurar código de familia (crear o unirse)
- Card en dashboard para compartir código con familia
- Botón "Compartir" con Web Share API (WhatsApp, SMS, Email)
- Función SQL `generate_family_code()` para códigos únicos
- Server actions para manejar códigos de familia
- Documentación completa en `FAMILY_CODE_GUIDE.md`

### 🔒 Seguridad
- Filtrado de deseos por `family_code` en queries
- Solo usuarios de la misma familia ven deseos compartidos
- Verificación de códigos antes de unirse

### 💾 Base de Datos
- Nueva columna `users.family_code` (TEXT, nullable)
- Índice `idx_users_family_code` para búsquedas rápidas
- Migración `004_add_family_code.sql`

### 🔄 Cambiado
- `getWishes()` ahora filtra por familia si usuario tiene código
- Usuarios sin código ven todos los deseos (comportamiento legacy)

---

## [2.1.0] - 2024-01-XX

### 🎉 Agregado
- Filtro de usuarios en forma de árbol de navidad 🎄
- Estrella dorada SVG en la cima del árbol
- Tronco decorativo cuando hay más de 3 usuarios
- Distribución piramidal automática según cantidad de usuarios

### 🎨 Mejorado
- Todos los emojis reemplazados por iconos SVG de Lucide React
- Iconos de ojo (Eye/EyeOff) en campo de contraseña
- Icono TreePine en notificaciones y toasts
- Icono Gift en AuthPanel
- Consistencia visual con SVG escalables

---

## [2.0.1] - 2024-01-XX

### 🎉 Agregado
- Página 404 personalizada con diseño navideño
- Botones para volver a inicio o dashboard desde 404

---

## [2.0.0] - 2024-01-XX

### 🎉 Agregado
- **Landing Page Pública** en `/` con Hero, Features y How It Works
- Logo centrado en Hero con animación float
- Componentes de landing: `Hero`, `Features`, `HowItWorks`, `Footer`
- Arquitectura de rutas públicas (`/`) y protegidas (`/dashboard`)
- Metadata SEO completa con Open Graph y Twitter Cards
- Imagen Open Graph dinámica (1200x630)
- Schema.org JSON-LD para WebApplication
- robots.txt configurado
- Headers de seguridad (X-Frame-Options, X-Content-Type-Options, etc.)
- Preconnect a Google Fonts para mejor performance
- Animaciones minimalistas con soporte para `prefers-reduced-motion`
- Safe areas iOS en header y footer
- Documentación completa:
  - `ROUTING.md` - Arquitectura de rutas
  - `NAVIGATION.md` - Flujos de navegación
  - `PERFORMANCE.md` - Optimizaciones y métricas
  - `RESPONSIVE-QA.md` - Checklist de QA
  - `DEPLOYMENT.md` - Guía de deployment

### 🔄 Cambiado
- **BREAKING**: Ruta principal `/` ahora es landing pública (antes era dashboard)
- **BREAKING**: Dashboard movido a `/dashboard` (requiere autenticación)
- React downgrade de v19 a v18.3.1 para compatibilidad con Framer Motion
- Header solo aparece en rutas protegidas
- Login/registro redirigen a `/dashboard` en lugar de `/`
- Logo en header protegido va a `/dashboard`
- Middleware permite `/` como ruta pública
- Server actions usan `createClient()` en lugar de `requireAuth()`

### 🐛 Corregido
- Error de compilación con `cookies()` async en Next.js 16
- Conflicto entre `app/page.tsx` y `app/(public)/page.tsx`
- Redirect loop cuando usuario no autenticado visita `/`
- Incompatibilidad de Framer Motion con React 19

### 🎨 Mejorado
- Responsive optimizado para iPhone 11-15 Pro Max (390-430px)
- Tap targets ≥44px en todos los botones
- Tipografía base 16px para prevenir zoom en iOS
- Spacing y padding optimizados para mobile
- Animaciones con transiciones 200-250ms ease-out
- Cache agresivo para assets estáticos (1 año)

### 📦 Dependencias
- React: 19.2.0 → 18.3.1
- React DOM: 19.2.0 → 18.3.1
- @types/react: ^19 → ^18
- @types/react-dom: ^19 → ^18

### 🗑️ Eliminado
- PublicHeader de la landing page
- `app/page.tsx` antiguo que causaba redirect

---

## [1.0.0] - 2024-XX-XX

### 🎉 Lanzamiento Inicial
- Aplicación de lista de deseos navideños
- Autenticación con Supabase (Google OAuth + Email/Password)
- CRUD de deseos con prioridades
- Sistema de usuarios y perfiles
- Diseño navideño con animaciones
- Responsive design
- Row Level Security (RLS) en Supabase
