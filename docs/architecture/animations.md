# 🎨 Animaciones y Transiciones

## AuthModal - Modal de Autenticación

### Animaciones implementadas

#### 1. Entrada y salida del modal
- **Overlay**: Fade in/out con `opacity: 0 → 1`
- **Contenido**: 
  - Fade + slide vertical (`y: 40 → 0`)
  - Scale sutil (`scale: 0.95 → 1`)
- **Duración**: 200-250ms con `ease-out`

#### 2. Transición entre tabs (Login ↔ Registro)
- **Indicador activo**: Animación con `layoutId` de Framer Motion
- **Tipo**: Spring animation (stiffness: 300, damping: 30)
- **Campos dinámicos**: Fade + height animation al aparecer/desaparecer

#### 3. Microinteracciones
- **Botones**: `hover:scale-[1.02]` con transition de 200ms
- **Focus rings**: `focus-visible:ring-2` con color amarillo navideño
- **Glow navideño**: Gradiente animado con `animate-pulse` sutil

#### 4. Feedback visual
- **Mensajes de error/éxito**: Slide down con fade (`y: -10 → 0`)
- **Loading states**: Spinner integrado en botones
- **Validaciones**: Feedback inmediato con transiciones suaves

### Accesibilidad

✅ **Teclado**
- `Esc` cierra el modal
- Focus trap dentro del modal
- Navegación por Tab funcional
- Focus inicial en primer input

✅ **ARIA**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` para título
- `aria-busy` en estados de carga

✅ **Reduced Motion**
- Detecta `prefers-reduced-motion`
- Desactiva animaciones automáticamente
- Mantiene funcionalidad completa

### Tecnologías

- **Framer Motion**: Animaciones declarativas y fluidas
- **Tailwind CSS**: Utilidades para hover, focus y transitions
- **CSS Variables**: Para timing consistente

### Personalización

Para ajustar las animaciones, modifica en `AuthModal.tsx`:

```typescript
// Duración de animaciones
transition={{ duration: 0.25, ease: 'easeOut' }}

// Spring para tabs
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```

### Performance

- Animaciones optimizadas con `transform` y `opacity`
- No causa reflows/repaints
- GPU-accelerated
- Respeta preferencias del usuario
