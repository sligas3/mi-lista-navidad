# 🧪 Guía de Testing - Refactor de Modales

## 📋 Checklist de Testing

### ✅ Fase 1: Funcionalidad Básica

#### AuthModal (Login/Registro)
- [ ] Modal abre al hacer clic en "Iniciar sesión"
- [ ] Tabs "Iniciar sesión" / "Crear cuenta" cambian suavemente
- [ ] Animación del indicador deslizante es fluida
- [ ] Panel cambia con fade + slide (200ms)
- [ ] Botón X cierra el modal
- [ ] Click fuera del modal lo cierra
- [ ] Escape cierra el modal
- [ ] Formulario funciona correctamente
- [ ] Google login funciona
- [ ] Errores se muestran correctamente

#### FamilyCodeModal (Crear/Unirse)
- [ ] Modal abre desde el botón de familia
- [ ] Tabs "Crear Familia" / "Unirse" cambian suavemente
- [ ] Animación idéntica a AuthModal
- [ ] "Generar Código" crea código aleatorio
- [ ] Botón copiar funciona y muestra check
- [ ] "Crear Familia" guarda el código
- [ ] "Unirse" valida código existente
- [ ] Errores se muestran correctamente
- [ ] Foco va al input al cambiar tab

#### ProfileModal
- [ ] Modal abre correctamente
- [ ] Input tiene foco automático
- [ ] Validación de nombre funciona
- [ ] Botón "Guardar" actualiza perfil
- [ ] Botón "Cancelar" cierra sin guardar
- [ ] Errores se muestran correctamente

---

### ♿ Fase 2: Accesibilidad

#### Navegación por Teclado
- [ ] Tab navega entre controles en orden lógico
- [ ] Shift+Tab navega hacia atrás
- [ ] Enter activa botones
- [ ] Escape cierra modal
- [ ] Foco visible en todos los controles (ring amarillo)
- [ ] Foco no escapa del modal (focus trap)
- [ ] Al cerrar, foco vuelve al trigger

#### ARIA y Roles
- [ ] Modal tiene `role="dialog"` y `aria-modal="true"`
- [ ] Título tiene `id` y modal tiene `aria-labelledby`
- [ ] Tabs tienen `role="tablist"`
- [ ] Cada tab tiene `role="tab"` y `aria-selected`
- [ ] Panel tiene `role="tabpanel"` y `aria-labelledby`
- [ ] Botón cerrar tiene `aria-label="Cerrar modal"`

#### Screen Readers
- [ ] VoiceOver (Mac): anuncia "diálogo" al abrir
- [ ] VoiceOver: lee el título correctamente
- [ ] VoiceOver: anuncia tabs y estado seleccionado
- [ ] VoiceOver: lee labels de inputs
- [ ] VoiceOver: anuncia errores con `role="alert"`
- [ ] NVDA/JAWS (Windows): funcionamiento similar

#### Tap Targets (Mobile)
- [ ] Todos los botones ≥44px de altura
- [ ] Tabs ≥44px de altura
- [ ] Botón X ≥44px × 44px
- [ ] Botón copiar ≥44px × 44px
- [ ] Espaciado suficiente entre controles

---

### 🎨 Fase 3: Animaciones

#### Timing y Easing
- [ ] Overlay: fade-in 150ms
- [ ] Modal: slide-up 200ms
- [ ] Tabs: indicador desliza en 200ms
- [ ] Panel: fade + slide 200ms
- [ ] Todas las animaciones son suaves (no jank)

#### prefers-reduced-motion
- [ ] Activar en Sistema > Accesibilidad > Reducir movimiento
- [ ] Modales aparecen instantáneamente (sin animación)
- [ ] Tabs cambian instantáneamente
- [ ] No hay transiciones de fade/slide
- [ ] Funcionalidad intacta

#### Consistencia
- [ ] AuthModal y FamilyModal tienen animaciones idénticas
- [ ] Timing es el mismo en todos los modales
- [ ] Easing es consistente
- [ ] Sensación de fluidez es igual

---

### 📱 Fase 4: Responsive

#### iPhone SE (375px)
- [ ] Modal no se corta
- [ ] Botones son accesibles (≥44px)
- [ ] Texto legible (≥16px)
- [ ] Sin scroll horizontal
- [ ] Padding adecuado

#### iPhone 11-15 Pro Max (390-430px)
- [ ] Layout correcto
- [ ] Botones cómodos de presionar
- [ ] Tabs ocupan ancho completo
- [ ] Espaciado apropiado

#### iPad (768px+)
- [ ] Modal centrado
- [ ] Tamaños de fuente aumentan
- [ ] Botones más grandes (48px)
- [ ] Espaciado generoso

#### Desktop (1024px+)
- [ ] Modal centrado con max-width
- [ ] Hover states funcionan
- [ ] Focus visible
- [ ] Animaciones fluidas

---

### 🔍 Fase 5: Edge Cases

#### Estados de Carga
- [ ] Botones muestran spinner al cargar
- [ ] Botones deshabilitados durante carga
- [ ] No se puede enviar formulario múltiples veces
- [ ] Errores de red se manejan correctamente

#### Validaciones
- [ ] Email inválido muestra error
- [ ] Contraseña corta muestra error
- [ ] Nombre corto muestra error
- [ ] Código inválido muestra error
- [ ] Mensajes de error son claros

#### Interacciones Rápidas
- [ ] Cambiar tabs rápidamente no rompe animación
- [ ] Abrir/cerrar modal rápidamente funciona
- [ ] Click múltiple en botones no causa problemas
- [ ] Animaciones no se superponen

---

## 🛠️ Herramientas de Testing

### Navegadores
```bash
# Desktop
- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

# Mobile
- Safari iOS (iPhone)
- Chrome Android
```

### Screen Readers
```bash
# Mac
VoiceOver: Cmd + F5

# Windows
NVDA: Ctrl + Alt + N
JAWS: (instalación requerida)

# Chrome Extension
ChromeVox: Extensión de Chrome
```

### DevTools
```bash
# Responsive Design Mode
Chrome: Cmd/Ctrl + Shift + M
Firefox: Cmd/Ctrl + Shift + M

# Accessibility Inspector
Chrome: DevTools > Lighthouse > Accessibility
Firefox: DevTools > Accessibility

# Performance
Chrome: DevTools > Performance
- Grabar interacción con modal
- Verificar FPS ≥60
- Verificar sin jank
```

### Reducir Movimiento
```bash
# Mac
Sistema > Accesibilidad > Pantalla > Reducir movimiento

# Windows
Configuración > Accesibilidad > Efectos visuales > Animación

# Linux (GNOME)
Configuración > Accesibilidad > Ver > Reducir animación
```

---

## 🎯 Criterios de Aceptación

### Funcionalidad: 100%
- ✅ Todos los modales abren/cierran
- ✅ Tabs cambian correctamente
- ✅ Formularios funcionan
- ✅ Validaciones correctas

### Accesibilidad: WCAG 2.1 AA
- ✅ Tap targets ≥44px
- ✅ Navegación por teclado completa
- ✅ ARIA correcto
- ✅ Screen readers funcionan
- ✅ prefers-reduced-motion respetado

### Animaciones: Consistentes
- ✅ Timing idéntico (150ms/200ms)
- ✅ Easing consistente
- ✅ Sin jank (60 FPS)
- ✅ Sensación fluida

### Responsive: Mobile-first
- ✅ 375px+: funcional
- ✅ 768px+: optimizado
- ✅ 1024px+: espacioso
- ✅ Sin scroll horizontal

---

## 🐛 Problemas Conocidos

### Ninguno detectado
Si encuentras algún problema durante el testing, documéntalo aquí:

```markdown
### [Título del problema]
**Descripción**: 
**Pasos para reproducir**:
1. 
2. 
3. 
**Comportamiento esperado**:
**Comportamiento actual**:
**Navegador/Dispositivo**:
**Prioridad**: Alta/Media/Baja
```

---

## ✅ Sign-off

### Desarrollador
- [ ] Código revisado
- [ ] Tests manuales completados
- [ ] Documentación actualizada

### QA
- [ ] Funcionalidad verificada
- [ ] Accesibilidad verificada
- [ ] Responsive verificado
- [ ] Edge cases probados

### Product
- [ ] UX aprobada
- [ ] Animaciones aprobadas
- [ ] Listo para producción

---

**Fecha de testing**: _____________
**Testeado por**: _____________
**Resultado**: ✅ Aprobado / ❌ Requiere cambios
