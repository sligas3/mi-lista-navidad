# 🎨 Componentes UI

Biblioteca de componentes reutilizables con animaciones consistentes y accesibilidad completa.

## 🆕 Componentes Destacados

### BaseModal
Modal base con animaciones fluidas y gestión de foco.

```tsx
import { BaseModal } from '@/components/ui/BaseModal';
import { Settings } from 'lucide-react';

<BaseModal 
  isOpen={isOpen} 
  onClose={onClose} 
  title="Configuración" 
  icon={Settings}
>
  {/* Contenido */}
</BaseModal>
```

**Características**:
- ✅ Animaciones consistentes (150ms/200ms)
- ✅ Focus trap automático
- ✅ Cierre con Escape y click fuera
- ✅ prefers-reduced-motion
- ✅ ARIA completo

### AnimatedTabs
Tabs con transiciones suaves y accesibilidad.

```tsx
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';

<AnimatedTabs
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
  ]}
  value={activeTab}
  onChange={setActiveTab}
>
  {/* Contenido del tab activo */}
</AnimatedTabs>
```

**Características**:
- ✅ Indicador deslizante animado
- ✅ Tap targets ≥44px
- ✅ Roles ARIA correctos
- ✅ Navegación por teclado

### Button
Botón con variantes y tamaños accesibles.

```tsx
import { Button } from '@/components/ui/Button';

<Button 
  variant="primary" 
  size="md" 
  isLoading={loading}
  leftIcon={<Icon />}
>
  Guardar
</Button>
```

**Variantes**: `primary`, `secondary`, `ghost`, `outline`, `destructive`  
**Tamaños**: `sm`, `md`, `lg` (todos ≥44px en mobile)

---

## 📚 Documentación Completa

- **Ejemplos de uso**: Ver `MODAL_EXAMPLES.md` en la raíz
- **Guía de testing**: Ver `TESTING_GUIDE.md` en la raíz
- **Detalles técnicos**: Ver `MODAL_REFACTOR.md` en la raíz

---

## 🎯 Componentes Disponibles

### Layout
- `BaseModal` - Modal base reutilizable
- `Card` - Tarjeta con estilos navideños

### Formularios
- `Button` - Botón con variantes
- `Input` - Input con validación
- `Label` - Label accesible

### Navegación
- `AnimatedTabs` - Tabs animados
- `Separator` - Separador visual

### Feedback
- `Toast` - Notificación temporal
- `Spinner` - Indicador de carga
- `Badge` - Etiqueta de estado

### Visuales
- `BackgroundFX` - Efectos de fondo
- `LinkPreviewCard` - Preview de enlaces
- `Skeleton` - Placeholder de carga

---

## ♿ Accesibilidad

Todos los componentes cumplen con **WCAG 2.1 AA**:
- Tap targets ≥44px
- Navegación por teclado
- ARIA roles y atributos
- Focus visible
- prefers-reduced-motion

---

## 🎨 Estilo Navideño

Todos los componentes usan la paleta navideña:
- Verde: `emerald-*`
- Rojo: `rose-*`
- Dorado: `yellow-*`
- Fondo: `white/10` con `backdrop-blur`

---

## 🚀 Uso

```tsx
// Importar componentes individuales
import { Button, Input, Label } from '@/components/ui';

// O importar desde archivos específicos
import { BaseModal } from '@/components/ui/BaseModal';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
```

---

**Última actualización**: 2024  
**Mantenedor**: Equipo de desarrollo
