# 🎄 Mi Lista de Deseos Navideña

Lista de deseos navideña colaborativa con autenticación y diseño festivo.

## 🚀 Características

- ✨ Autenticación con Supabase (Google OAuth + Email/Password)
- 👨‍👩‍👧‍👦 **Códigos de Familia** para compartir listas solo con tu familia
- 🎁 Crear, editar y eliminar deseos
- ⭐ Sistema de prioridades (Mucho, Normal, Un poco)
- 🔗 Soporte para URLs largas con preview
- 🎨 Diseño responsive con animaciones navideñas
- ❄️ Efectos visuales: nieve, árbol navideño, orbes flotantes
- 🎯 Iconos SVG con Lucide React
- ⌨️ Hotkeys para prioridades (1/2/3)
- 🎄 Filtro de usuarios en forma de árbol navideño

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Base de datos**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **Iconos**: Lucide React

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/sligas3/mi-lista-navidad.git
cd mi-lista-navidad

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración de Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar migraciones SQL:
   - Ir a SQL Editor en Supabase Dashboard
   - Ejecutar `002_create_users_table.sql`
   - Ejecutar `003_enable_rls_wishes.sql` ⚠️ **IMPORTANTE para seguridad**
   - Ver instrucciones detalladas en `/supabase/migrations/README.md`
3. Configurar OAuth providers en Authentication > Providers
4. Copiar URL y Anon Key a `.env.local`

## 🎯 Optimizaciones Implementadas

### Performance
- ✅ Queries optimizadas con campos específicos
- ✅ Límite de 100 deseos por query
- ✅ Compresión gzip habilitada
- ✅ Imágenes en formato AVIF/WebP
- ✅ Cache de imágenes (1 año)

### Seguridad
- ✅ Row Level Security (RLS) habilitado en todas las tablas
- ✅ Autenticación requerida para todas las operaciones
- ✅ Protección a nivel de UI, API y base de datos
- ✅ Middleware de autenticación en rutas protegidas

### Disponibilidad
- ✅ Cron job diario para mantener Supabase activo
- ✅ Endpoint `/api/keep-alive` (ejecuta diariamente)
- ✅ Endpoint `/api/health` para monitoreo
- ✅ Manejo de errores con fallbacks

### Límites Free Tier

**Vercel**:
- 100 GB bandwidth/mes ✅
- Builds ilimitados ✅
- Serverless Functions: 100 GB-hours/mes ✅

**Supabase**:
- 500 MB database ✅
- 5 GB bandwidth/mes ⚠️
- Pausa después de 7 días inactividad ⚠️ (resuelto con cron)

## 📝 Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # Linter
```

## 🎨 Estructura del Proyecto

```
mi-lista-navidad/
├── app/
│   ├── actions/         # Server actions
│   ├── api/            # API routes
│   └── ...
├── components/
│   ├── auth/           # Autenticación
│   ├── ui/             # Componentes UI
│   ├── wish/           # Componentes de deseos
│   └── ...
├── lib/
│   ├── supabase.ts     # Cliente Supabase
│   ├── avatars.ts      # Sistema de avatares
│   └── ...
└── public/
    └── logo.png        # Logo personalizado
```

## 🔐 Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

El proyecto está configurado para deployment automático en Vercel:

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático en cada push a `main`

## 📊 Monitoreo

- **Health check**: `https://tu-dominio.com/api/health`
- **Keep-alive**: `https://tu-dominio.com/api/keep-alive`
- **Supabase Dashboard**: Monitorear uso de bandwidth y database

## 🎄 Uso

1. Ingresar con Google o Email
2. Crear deseos con título y link opcional
3. Seleccionar prioridad (Mucho/Normal/Un poco)
4. Compartir lista con familia y amigos
5. Marcar deseos como cumplidos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT

## 👤 Autor

Creado con ❤️ para esta Navidad

---

⭐ Si te gusta el proyecto, dale una estrella en GitHub
