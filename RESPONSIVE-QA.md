# QA Responsive - Checklist

## Dispositivos Objetivo
- iPhone 11 (390px)
- iPhone 12/13 (390px)
- iPhone 14 Pro (393px)
- iPhone 15 Pro Max (430px)
- iPad (768px)
- Desktop (1024px+)

## Landing Page (/)

### Hero Section
- ✅ Título: 2.5rem (40px) mobile → 7xl desktop
- ✅ Subtítulo: 1rem (16px) mobile → 2xl desktop
- ✅ CTAs: Full width mobile, inline desktop
- ✅ Spacing: 6-8 unidades entre elementos
- ✅ Min height: 90vh para centrado vertical

### Features Section
- ✅ Grid: 1 col mobile → 2 cols tablet → 4 cols desktop
- ✅ Cards: min-height 160px, padding 5-6
- ✅ Iconos: 10-12 (40-48px)
- ✅ Texto: text-sm con leading-relaxed
- ✅ Hover: scale-105 solo en desktop

### How It Works Section
- ✅ Grid: 1 col mobile → 3 cols desktop
- ✅ Círculos: 14-16 (56-64px)
- ✅ Iconos: 7-8 (28-32px)
- ✅ Spacing: 8-10 entre pasos
- ✅ Texto: max-w-xs centrado

### Header
- ✅ Fixed con backdrop-blur
- ✅ Safe areas iOS respetadas
- ✅ Logo: 8-10 (32-40px)
- ✅ Botones: min-w-[90px] y min-w-[100px]
- ✅ Gap: 3 unidades entre elementos

### Footer
- ✅ Safe area bottom respetada
- ✅ Padding: 6-8 vertical
- ✅ Texto: text-sm con leading-relaxed

## Tap Targets
- ✅ Todos los botones ≥44px altura
- ✅ Links con padding adecuado
- ✅ Iconos clickeables ≥44px área

## Tipografía
- ✅ Base: 16px (previene zoom iOS)
- ✅ Títulos: escalado progresivo
- ✅ Line height: relaxed para legibilidad
- ✅ Contraste: AA compliant

## Spacing
- ✅ Contenedores: px-4 mobile, px-6 desktop
- ✅ Secciones: py-12 mobile, py-16 desktop
- ✅ Elementos: gap-3 mobile, gap-4 desktop
- ✅ Max width: screen-md a 4xl según sección

## Safe Areas iOS
- ✅ Header: padding-top con safe-area-inset-top
- ✅ Footer: padding-bottom con safe-area-inset-bottom
- ✅ Laterales: padding-left/right con insets
- ✅ Landing: padding-top calculado con header

## Scroll
- ✅ Sin scroll horizontal en ningún breakpoint
- ✅ Smooth scroll habilitado
- ✅ Overflow-x: hidden donde necesario
- ✅ Touch scrolling optimizado (-webkit-overflow-scrolling)

## Animaciones
- ✅ Fade-up en Hero (0.6s)
- ✅ Hover effects solo con motion-safe
- ✅ Transiciones: 200-250ms ease-out
- ✅ Respeta prefers-reduced-motion

## Performance Mobile
- ✅ Orbes reducidos en low-end devices
- ✅ Nieve: 15 copos mobile, 30 desktop
- ✅ Will-change solo en elementos animados
- ✅ Transform3d para GPU acceleration

## Testing Checklist
- [ ] Probar en iPhone 11-15 (Safari)
- [ ] Probar rotación landscape
- [ ] Verificar tap targets con dedo
- [ ] Validar scroll suave
- [ ] Confirmar safe areas en notch
- [ ] Probar con reduced motion
- [ ] Verificar contraste en sol
- [ ] Validar zoom de inputs
