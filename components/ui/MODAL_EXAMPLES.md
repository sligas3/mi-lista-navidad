# 📚 Ejemplos de Uso - BaseModal y AnimatedTabs

## 🎯 BaseModal

### Ejemplo Básico
```tsx
import { BaseModal } from '@/components/ui/BaseModal';
import { Settings } from 'lucide-react';

function SettingsModal({ isOpen, onClose }) {
  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Configuración" 
      icon={Settings}
    >
      <p className="text-white/70 text-sm mb-4">
        Personaliza tu experiencia
      </p>
      
      {/* Tu contenido aquí */}
    </BaseModal>
  );
}
```

### Modal de Confirmación
```tsx
import { BaseModal } from '@/components/ui/BaseModal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="¿Eliminar deseo?" 
      icon={AlertTriangle}
    >
      <p className="text-white/70 text-sm text-center mb-6">
        Esta acción no se puede deshacer
      </p>
      
      <div className="flex gap-2">
        <Button 
          onClick={onClose} 
          variant="ghost" 
          size="md" 
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="destructive" 
          size="md" 
          className="flex-1"
        >
          Eliminar
        </Button>
      </div>
    </BaseModal>
  );
}
```

### Modal con Formulario
```tsx
import { BaseModal } from '@/components/ui/BaseModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Mail } from 'lucide-react';
import { useState } from 'react';

function InviteModal({ isOpen, onClose, onInvite }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onInvite(email);
    setLoading(false);
    onClose();
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Invitar a familia" 
      icon={Mail}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="amigo@email.com"
            required
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full"
          isLoading={loading}
        >
          Enviar invitación
        </Button>
      </form>
    </BaseModal>
  );
}
```

---

## 🎨 AnimatedTabs

### Ejemplo Básico
```tsx
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { useState } from 'react';

function PreferencesPanel() {
  const [tab, setTab] = useState('general');

  return (
    <AnimatedTabs
      tabs={[
        { id: 'general', label: 'General' },
        { id: 'privacy', label: 'Privacidad' },
      ]}
      value={tab}
      onChange={setTab}
    >
      {tab === 'general' && (
        <div>Configuración general</div>
      )}
      {tab === 'privacy' && (
        <div>Configuración de privacidad</div>
      )}
    </AnimatedTabs>
  );
}
```

### Tabs con Animación de Contenido
```tsx
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function ProductTabs() {
  const [tab, setTab] = useState('description');
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    );
  }, []);

  return (
    <AnimatedTabs
      tabs={[
        { id: 'description', label: 'Descripción' },
        { id: 'specs', label: 'Especificaciones' },
        { id: 'reviews', label: 'Reseñas' },
      ]}
      value={tab}
      onChange={setTab}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          {...(shouldAnimate && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            transition: { duration: 0.2 },
          })}
        >
          {tab === 'description' && <Description />}
          {tab === 'specs' && <Specifications />}
          {tab === 'reviews' && <Reviews />}
        </motion.div>
      </AnimatePresence>
    </AnimatedTabs>
  );
}
```

### Tabs con 3+ opciones
```tsx
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { useState } from 'react';

function DashboardTabs() {
  const [tab, setTab] = useState('overview');

  return (
    <AnimatedTabs
      tabs={[
        { id: 'overview', label: 'Resumen' },
        { id: 'analytics', label: 'Analíticas' },
        { id: 'reports', label: 'Reportes' },
      ]}
      value={tab}
      onChange={setTab}
    >
      {/* Contenido según tab activo */}
    </AnimatedTabs>
  );
}
```

---

## 🎭 Combinando BaseModal + AnimatedTabs

### Modal con Tabs (Patrón Completo)
```tsx
import { BaseModal } from '@/components/ui/BaseModal';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

function SettingsModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('account');
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    );
  }, []);

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Configuración" 
      icon={Settings}
    >
      <AnimatedTabs
        tabs={[
          { id: 'account', label: 'Cuenta' },
          { id: 'notifications', label: 'Notificaciones' },
        ]}
        value={tab}
        onChange={setTab}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            {...(shouldAnimate && {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.2 },
            })}
            className="space-y-4"
          >
            {tab === 'account' && (
              <AccountSettings />
            )}
            {tab === 'notifications' && (
              <NotificationSettings />
            )}
          </motion.div>
        </AnimatePresence>
      </AnimatedTabs>
    </BaseModal>
  );
}
```

---

## 🎨 Personalizaciones

### Modal con Ancho Personalizado
```tsx
// BaseModal usa max-w-md por defecto
// Para personalizar, envuelve el contenido:

<BaseModal isOpen={isOpen} onClose={onClose} title="Grande" icon={Icon}>
  <div className="min-w-[600px]">
    {/* Contenido ancho */}
  </div>
</BaseModal>
```

### Tabs con Estilos Personalizados
```tsx
// AnimatedTabs usa estilos por defecto
// Para personalizar, agrega clases al contenedor:

<div className="custom-tabs">
  <AnimatedTabs tabs={tabs} value={value} onChange={onChange}>
    {/* Contenido */}
  </AnimatedTabs>
</div>

<style>
  .custom-tabs [role="tablist"] {
    /* Personaliza el contenedor de tabs */
  }
</style>
```

---

## ♿ Mejores Prácticas de Accesibilidad

### 1. Siempre proporciona un título descriptivo
```tsx
// ✅ Bueno
<BaseModal title="Eliminar cuenta" icon={AlertTriangle}>

// ❌ Malo
<BaseModal title="Confirmar" icon={AlertTriangle}>
```

### 2. Usa iconos semánticos
```tsx
import { 
  Settings,      // Configuración
  AlertTriangle, // Advertencia
  Info,          // Información
  CheckCircle,   // Éxito
  XCircle,       // Error
  Mail,          // Email/Invitación
  Users,         // Familia/Grupo
} from 'lucide-react';
```

### 3. Proporciona labels claros en tabs
```tsx
// ✅ Bueno
tabs={[
  { id: 'login', label: 'Iniciar sesión' },
  { id: 'register', label: 'Crear cuenta' },
]}

// ❌ Malo
tabs={[
  { id: 'login', label: 'Login' },
  { id: 'register', label: 'Sign up' },
]}
```

### 4. Maneja el foco correctamente
```tsx
// El foco automático en el primer input es bueno
<Input autoFocus />

// Pero solo en el input principal, no en todos
```

### 5. Proporciona feedback visual
```tsx
// Usa isLoading en botones
<Button isLoading={loading}>Guardar</Button>

// Muestra errores con role="alert"
{error && (
  <div role="alert" className="text-red-300">
    {error}
  </div>
)}
```

---

## 🚀 Performance

### 1. Usa prefers-reduced-motion
```tsx
const [shouldAnimate, setShouldAnimate] = useState(false);

useEffect(() => {
  setShouldAnimate(
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  );
}, []);

// Luego en las animaciones:
{...shouldAnimate && {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}}
```

### 2. Lazy load contenido pesado
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
});

<BaseModal isOpen={isOpen} onClose={onClose} title="Contenido">
  {isOpen && <HeavyComponent />}
</BaseModal>
```

### 3. Limpia efectos al desmontar
```tsx
useEffect(() => {
  // Setup
  const handler = () => {};
  document.addEventListener('keydown', handler);

  // Cleanup
  return () => {
    document.removeEventListener('keydown', handler);
  };
}, []);
```

---

## 📝 Notas Finales

- BaseModal y AnimatedTabs están optimizados para accesibilidad
- Todas las animaciones respetan prefers-reduced-motion
- Tap targets son ≥44px en mobile
- Focus management está implementado
- ARIA roles y atributos están correctos

Para más ejemplos, revisa:
- `components/auth/AuthModal.tsx`
- `components/family/FamilyCodeModal.tsx`
- `components/ProfileModal.tsx`
