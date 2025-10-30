# Guía de Deployment

## Resumen de Cambios

### Nueva Arquitectura de Rutas
```
/                    → Landing pública (redirect a /dashboard si hay sesión)
/login              → Modal de autenticación
/register           → Redirect a /login
/dashboard          → Aplicación principal (protegida)
/admin              → Panel admin (protegido)
```

### Archivos Nuevos
```
app/(public)/
├── layout.tsx              # Metadata SEO + JSON-LD
├── page.tsx                # Landing page
└── opengraph-image.tsx     # OG image dinámica

app/(protected)/
├── layout.tsx              # Header para rutas autenticadas
└── dashboard/page.tsx      # App principal

components/landing/
├── Hero.tsx                # Hero con CTAs
├── Features.tsx            # 4 características
├── HowItWorks.tsx          # 3 pasos
├── Footer.tsx              # Footer landing
└── PublicHeader.tsx        # Header público

app/robots.ts               # SEO robots.txt
```

### Archivos Modificados
```
app/layout.tsx              # Removido Header, agregado preconnect
app/page.tsx                # Redirect a /dashboard
app/actions.ts              # Cambio de requireAuth a createClient
app/login/page.tsx          # Redirect a /dashboard después de login
components/layout/Header.tsx # Logo va a /dashboard
components/auth/AuthPanel.tsx # Redirect a /dashboard
middleware.ts               # Permite / como ruta pública
next.config.ts              # Headers de seguridad y cache
app/globals.css             # Animación fade-up
```

## Variables de Entorno
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment en Vercel

### 1. Conectar Repositorio
```bash
vercel --prod
```

### 2. Configurar Variables
- Dashboard Vercel → Settings → Environment Variables
- Agregar `NEXT_PUBLIC_SUPABASE_URL`
- Agregar `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Verificar Deployment
- [ ] Landing carga en `/`
- [ ] Redirect funciona si hay sesión
- [ ] Login redirige a `/dashboard`
- [ ] Dashboard requiere auth
- [ ] OG image se genera correctamente
- [ ] Headers de seguridad aplicados

## Post-Deployment

### SEO
- [ ] Verificar en Google Search Console
- [ ] Validar OG tags con https://www.opengraph.xyz/
- [ ] Probar Twitter Card con https://cards-dev.twitter.com/validator
- [ ] Verificar robots.txt en `/robots.txt`

### Performance
- [ ] Lighthouse score ≥90 en todas las métricas
- [ ] Verificar LCP < 2.5s
- [ ] Confirmar CLS < 0.1
- [ ] Validar FID < 100ms

### Funcionalidad
- [ ] Login con Google funciona
- [ ] Login con email funciona
- [ ] Registro crea usuario
- [ ] Dashboard muestra deseos
- [ ] CRUD de deseos funciona
- [ ] Logout redirige a landing

## Rollback
Si hay problemas, revertir a commit anterior:
```bash
git revert HEAD
git push origin main
```

## Monitoreo
- Vercel Analytics para métricas
- Supabase Dashboard para uso de DB
- Logs en Vercel para errores
