# 🚀 Guía de Despliegue en Vercel

## Método 1: Deploy Automático desde GitHub (Recomendado)

### Paso 1: Preparar el Repositorio

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "🎄 Initial commit: Mi Lista de Deseos Navideña"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/mi-lista-navidad.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click en "Import Git Repository"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará Next.js automáticamente

### Paso 3: Configurar Variables de Entorno

En la sección "Environment Variables":

```
NEXT_PUBLIC_SUPABASE_URL = https://xvyvggqjgwilrlzdjqlf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE**: Marca las 3 opciones:
- ✅ Production
- ✅ Preview
- ✅ Development

### Paso 4: Deploy

1. Click en "Deploy"
2. Espera 2-3 minutos
3. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

---

## Método 2: Deploy con Vercel CLI

### Instalación

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# O con pnpm
pnpm add -g vercel
```

### Login

```bash
vercel login
```

### Deploy a Preview

```bash
# Desde la raíz del proyecto
vercel

# Sigue las instrucciones:
# ? Set up and deploy "~/mi-lista-navidad"? [Y/n] y
# ? Which scope? [tu-usuario]
# ? Link to existing project? [y/N] n
# ? What's your project's name? mi-lista-navidad
# ? In which directory is your code located? ./
```

### Configurar Variables

```bash
# Agregar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL

# Pega tu URL cuando te lo pida
# Selecciona: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Pega tu anon key
# Selecciona: Production, Preview, Development
```

### Deploy a Producción

```bash
vercel --prod
```

---

## Método 3: Deploy Manual (Sin Git)

```bash
# Deploy directo desde tu máquina
vercel --prod

# Vercel subirá todos los archivos
# Configura las variables cuando te lo pida
```

---

## Verificación Post-Deploy

### 1. Verificar que la app carga

```bash
# Abre la URL que te dio Vercel
open https://tu-proyecto.vercel.app
```

### 2. Verificar variables de entorno

En Vercel Dashboard:
- Settings → Environment Variables
- Verifica que ambas variables estén presentes

### 3. Ver logs en tiempo real

```bash
vercel logs https://tu-proyecto.vercel.app
```

### 4. Inspeccionar deployment

```bash
vercel inspect https://tu-proyecto.vercel.app
```

---

## Configuración Avanzada

### Custom Domain

1. Ve a Settings → Domains
2. Agrega tu dominio: `mi-lista-navidad.com`
3. Configura DNS según instrucciones
4. Espera propagación (5-10 min)

### Preview Deployments

Cada push a una rama crea un preview:

```bash
git checkout -b feature/nueva-funcionalidad
git push origin feature/nueva-funcionalidad

# Vercel creará: https://mi-lista-navidad-git-feature-nueva.vercel.app
```

### Protección de Preview

En Settings → Deployment Protection:
- Habilita "Vercel Authentication"
- Solo usuarios autorizados verán previews

---

## Actualizar Deployment

### Desde GitHub

```bash
# Hacer cambios
git add .
git commit -m "✨ Nueva funcionalidad"
git push

# Vercel detecta el push y redeploy automáticamente
```

### Desde CLI

```bash
# Redeploy forzado
vercel --force --prod
```

---

## Rollback a Versión Anterior

### Desde Dashboard

1. Ve a Deployments
2. Encuentra el deployment anterior
3. Click en "..." → "Promote to Production"

### Desde CLI

```bash
# Listar deployments
vercel ls

# Promover uno específico
vercel promote <deployment-url>
```

---

## Troubleshooting

### Error: "Build failed"

```bash
# Verificar build local
npm run build

# Si falla, revisar errores de TypeScript
npm run lint
```

### Error: "Environment variables not found"

```bash
# Listar variables
vercel env ls

# Agregar faltantes
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

### Error: "Cannot connect to Supabase"

1. Verifica que las variables sean correctas
2. Verifica que las políticas RLS estén activas
3. Prueba la conexión desde local

### La app no actualiza

```bash
# Limpiar cache de Vercel
vercel --force

# O desde dashboard: Settings → Clear Cache
```

---

## Monitoreo

### Analytics

Vercel incluye analytics gratis:
- Visitas
- Performance
- Web Vitals

Accede en: Dashboard → Analytics

### Logs

```bash
# Ver logs en tiempo real
vercel logs --follow

# Logs de un deployment específico
vercel logs <deployment-url>
```

---

## Costos

### Plan Hobby (Gratis)

- ✅ Deployments ilimitados
- ✅ 100 GB bandwidth/mes
- ✅ Previews automáticos
- ✅ SSL automático
- ✅ Analytics básico

**Suficiente para este proyecto** 🎉

### Límites

- 100 deployments/día
- 6000 minutos build/mes
- 100 GB bandwidth/mes

---

## Comandos Útiles

```bash
# Ver proyectos
vercel ls

# Ver dominios
vercel domains ls

# Ver variables de entorno
vercel env ls

# Eliminar proyecto
vercel remove mi-lista-navidad

# Ayuda
vercel --help
```

---

## Checklist Final

- [ ] Código pusheado a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso
- [ ] App funciona en producción
- [ ] CRUD funciona correctamente
- [ ] No hay errores en console
- [ ] Responsive funciona
- [ ] Custom domain configurado (opcional)

---

¡Listo! Tu app navideña está en producción 🎄🚀
