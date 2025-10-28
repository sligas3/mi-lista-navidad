# 🎨 Guía de UI/UX - Mi Lista de Deseos Navideña

## Sistema de Diseño

### Paleta de Colores

```typescript
// Primario (Acciones principales)
primary: #E11D48 (rose-600)
primary-hover: #BE123C (rose-700)
primary-light: #FFF1F2 (rose-50)

// Secundario (Acciones secundarias)
secondary: #16A34A (green-600)
secondary-hover: #15803D (green-700)
secondary-light: #F0FDF4 (green-50)

// Acento (Destacados)
accent: #EAB308 (yellow-500)
accent-hover: #CA8A04 (yellow-600)
accent-light: #FEF9C3 (yellow-100)

// Neutros
zinc-50: #FAFAFA (Fondo)
zinc-900: #18181B (Texto principal)
zinc-600: #52525B (Texto secundario)
zinc-200: #E4E4E7 (Bordes)
```

### Tipografía

```typescript
// Títulos
font-display: Outfit (600, 700)
H1: text-5xl md:text-6xl (48px/60px)
H2: text-3xl md:text-4xl (30px/36px)
H3: text-xl md:text-2xl (20px/24px)

// Cuerpo
font-sans: Inter (400, 500, 600)
Body: text-base (16px)
Small: text-sm (14px)
Tiny: text-xs (12px)
```

### Espaciado

```typescript
// Escala Tailwind
2: 8px   - Espaciado mínimo
3: 12px  - Espaciado pequeño
4: 16px  - Espaciado base
6: 24px  - Espaciado medio
8: 32px  - Espaciado grande
12: 48px - Espaciado extra grande
16: 64px - Espaciado máximo
```

---

## Componentes UI

### Button

**Variantes:**
```tsx
<Button variant="primary">Acción Principal</Button>
<Button variant="secondary">Acción Secundaria</Button>
<Button variant="ghost">Acción Terciaria</Button>
<Button variant="outline">Acción Outline</Button>
<Button variant="destructive">Eliminar</Button>
```

**Tamaños:**
```tsx
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>
```

**Estados:**
```tsx
<Button isLoading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>
```

**Con iconos:**
```tsx
<Button leftIcon="🎁">Agregar</Button>
<Button rightIcon="→">Siguiente</Button>
```

### Input

**Básico:**
```tsx
<Input 
  placeholder="Escribe aquí..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Con error:**
```tsx
<Input 
  error="Este campo es requerido"
  value={value}
/>
```

**Con Label:**
```tsx
<div className="space-y-2">
  <Label htmlFor="email" required>Email</Label>
  <Input id="email" type="email" />
</div>
```

### Card

**Básico:**
```tsx
<Card>
  <p>Contenido del card</p>
</Card>
```

**Con estructura:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Contenido</p>
  </CardContent>
</Card>
```

### Badge

**Variantes:**
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primario</Badge>
<Badge variant="success">Éxito</Badge>
<Badge variant="warning">Advertencia</Badge>
<Badge variant="error">Error</Badge>
```

### Toast

**Uso:**
```tsx
const [toast, setToast] = useState(null)

// Mostrar toast
setToast({ 
  message: 'Operación exitosa', 
  variant: 'success' 
})

// Renderizar
{toast && (
  <Toast 
    message={toast.message}
    variant={toast.variant}
    onClose={() => setToast(null)}
  />
)}
```

---

## Patrones de Uso

### Formularios

```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="field" required>Campo</Label>
    <Input 
      id="field"
      error={errors.field}
      value={value}
      onChange={handleChange}
    />
  </div>
  
  <Button 
    type="submit" 
    variant="primary" 
    size="lg"
    isLoading={loading}
    className="w-full"
  >
    Enviar
  </Button>
</form>
```

### Listas

```tsx
<div className="space-y-3">
  {items.map(item => (
    <Card key={item.id}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-zinc-600">{item.description}</p>
        </div>
        <Button variant="ghost" size="sm">
          Acción
        </Button>
      </div>
    </Card>
  ))}
</div>
```

### Estado Vacío

```tsx
<div className="text-center py-16 bg-white rounded-lg border">
  <div className="text-6xl mb-4">🎄</div>
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    No hay elementos
  </h3>
  <p className="text-zinc-600 mb-6">
    Agrega tu primer elemento
  </p>
  <Button variant="primary">
    Agregar
  </Button>
</div>
```

---

## Accesibilidad

### Contraste
- ✅ Texto principal: 17.4:1 (AAA)
- ✅ Botones: 5.9:1 mínimo (AA)
- ✅ Texto secundario: 7.2:1 (AAA)

### Navegación por Teclado
- Tab: Navegar entre elementos
- Enter: Activar botones
- Escape: Cerrar modales
- Focus visible en todos los elementos

### ARIA
```tsx
// Botones con loading
<button aria-busy={isLoading}>

// Inputs con error
<input aria-invalid={!!error}>

// Mensajes de error
<p role="alert">{error}</p>

// Toast
<div role="alert" aria-live="polite">
```

---

## Responsive

### Breakpoints
```typescript
sm: 640px   // Tablet pequeña
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Desktop grande
```

### Mobile-First
```tsx
// Siempre empezar con mobile
<div className="text-sm md:text-base lg:text-lg">

// Espaciado responsive
<div className="p-4 md:p-6 lg:p-8">

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## Performance

### Optimizaciones
- Fuentes con `display: swap`
- Componentes con `forwardRef`
- Transiciones con `transition-all`
- Animaciones con `motion-safe`

### Métricas Objetivo
- FCP < 2s
- TTI < 3s
- CLS < 0.1

---

## Criterios de Aceptación

### Visual
- [ ] Tipografía clara y legible
- [ ] Espaciado consistente
- [ ] Colores según paleta
- [ ] Bordes redondeados (rounded-lg)

### Funcional
- [ ] Estados hover/active/focus
- [ ] Loading states
- [ ] Error states
- [ ] Validación inline

### Accesibilidad
- [ ] Contraste AA mínimo
- [ ] Focus visible
- [ ] Labels asociados
- [ ] ARIA attributes

### Responsive
- [ ] Mobile-first
- [ ] Touch-friendly (44px min)
- [ ] Sin scroll horizontal
- [ ] Texto legible sin zoom

---

**Última actualización**: Diciembre 2024
