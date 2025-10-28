# 🎄 Mi Lista de Deseos Navideña

Una aplicación web festiva para crear y compartir listas de deseos navideños con familia y amigos.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Características

- 🎁 **CRUD completo**: Crear, leer, actualizar y eliminar deseos
- 👥 **Multi-usuario**: Identificación simple por nombre (localStorage)
- ⭐ **Prioridades**: Clasifica deseos por importancia (1-3 estrellas)
- ✅ **Estado**: Marca deseos como cumplidos o pendientes
- 🔍 **Filtros**: Por estado, usuario y búsqueda de texto
- 📊 **Estadísticas**: Visualiza progreso y métricas
- 📋 **Exportar**: Copia la lista completa como texto
- 🔗 **Compartir**: Enlace directo para compartir
- ❄️ **Tema navideño**: Colores festivos, emojis y nieve cayendo
- 📱 **Responsive**: Diseño adaptado a móvil y desktop

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Base de datos**: Supabase (PostgreSQL)
- **Estilos**: TailwindCSS 4
- **Lenguaje**: TypeScript
- **Deploy**: Vercel
- **Fuente**: Mountains of Christmas (Google Fonts)

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

#### b) Ejecutar migración SQL

En el **SQL Editor** de Supabase, ejecuta:

```sql
-- Crear tabla wishes
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_usuario TEXT NOT NULL CHECK (char_length(nombre_usuario) >= 2),
  deseo TEXT NOT NULL CHECK (char_length(deseo) >= 3),
  prioridad INTEGER DEFAULT 1 CHECK (prioridad BETWEEN 1 AND 3),
  cumplido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_wishes_usuario ON wishes(nombre_usuario);
CREATE INDEX idx_wishes_created ON wishes(created_at DESC);

-- Habilitar RLS
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Lectura pública" ON wishes FOR SELECT USING (true);
CREATE POLICY "Crear deseos" ON wishes FOR INSERT WITH CHECK (true);
CREATE POLICY "Actualizar deseos" ON wishes FOR UPDATE USING (true);
CREATE POLICY "Eliminar deseos" ON wishes FOR DELETE USING (true);
```

#### c) Obtener credenciales

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
