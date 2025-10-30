# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Mi Lista de Deseos Navideña! 🎄

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/mi-lista-navidad.git
cd mi-lista-navidad
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Agrega tus credenciales de Supabase
# (o usa las del proyecto de desarrollo compartido)
```

### 4. Crear Rama

```bash
# Crea una rama descriptiva
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/corregir-bug
```

### 5. Desarrollar

```bash
# Ejecuta en modo desarrollo
npm run dev

# Haz tus cambios
# Prueba localmente
```

### 6. Commit

```bash
# Commits descriptivos con emojis (opcional)
git add .
git commit -m "✨ Agregar filtro por categorías"
```

### 7. Push y PR

```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Abre un Pull Request en GitHub
```

---

## 📋 Tipos de Contribuciones

### 🐛 Reportar Bugs

Abre un issue con:
- Descripción clara del bug
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Navegador y versión

### ✨ Proponer Features

Abre un issue con:
- Descripción de la funcionalidad
- Caso de uso
- Mockups o ejemplos (opcional)
- Impacto esperado

### 📝 Mejorar Documentación

- Corregir typos
- Agregar ejemplos
- Traducir a otros idiomas
- Mejorar explicaciones

### 🎨 Mejorar UI/UX

- Proponer mejoras de diseño
- Optimizar accesibilidad
- Mejorar responsive
- Agregar animaciones

---

## 🎯 Áreas que Necesitan Ayuda

- [ ] Testing automatizado (Jest, Playwright)
- [ ] Accesibilidad (ARIA, keyboard navigation)
- [ ] Internacionalización (i18n)
- [ ] Performance optimization
- [ ] Documentación en inglés
- [ ] Temas personalizables
- [ ] Modo oscuro

---

## 📐 Estándares de Código

### TypeScript

```typescript
// ✅ Bueno: Tipos explícitos
interface WishFormProps {
  nombreUsuario: string
  onSubmit: (deseo: string, prioridad: 1 | 2 | 3) => Promise<void>
}

// ❌ Malo: any
function handleSubmit(data: any) { }
```

### Componentes

```typescript
// ✅ Bueno: Componente funcional con tipos
export default function WishItem({ wish }: WishItemProps) {
  return <div>{wish.deseo}</div>
}

// ❌ Malo: Sin tipos
export default function WishItem({ wish }) {
  return <div>{wish.deseo}</div>
}
```

### Naming

```typescript
// ✅ Bueno: Nombres descriptivos
const handleCreateWish = async () => { }
const isUserOwner = wish.nombre_usuario === currentUser

// ❌ Malo: Nombres genéricos
const handle = async () => { }
const flag = wish.nombre_usuario === currentUser
```

### Estilos

```typescript
// ✅ Bueno: Tailwind classes organizadas
className="flex items-center gap-2 px-4 py-2 bg-navidad-rojo hover:bg-navidad-rojo/90 rounded-lg"

// ❌ Malo: Classes desordenadas
className="bg-navidad-rojo px-4 flex rounded-lg gap-2 py-2 items-center hover:bg-navidad-rojo/90"
```

---

## 🧪 Testing

### Antes de Enviar PR

```bash
# Build exitoso
npm run build

# Sin errores de lint
npm run lint

# Sin errores de TypeScript
npx tsc --noEmit
```

### Testing Manual

- [ ] Funciona en Chrome
- [ ] Funciona en Firefox
- [ ] Funciona en Safari
- [ ] Responsive en mobile
- [ ] No hay errores en console
- [ ] Accesibilidad básica

---

## 📝 Convenciones de Commit

Usamos commits semánticos (opcional pero recomendado):

```bash
✨ feat: Nueva funcionalidad
🐛 fix: Corrección de bug
📝 docs: Cambios en documentación
💄 style: Cambios de estilo (no afectan lógica)
♻️ refactor: Refactorización de código
⚡ perf: Mejoras de performance
✅ test: Agregar o modificar tests
🔧 chore: Cambios en build, configs, etc.
```

Ejemplos:
```bash
git commit -m "✨ feat: Agregar filtro por categorías"
git commit -m "🐛 fix: Corregir error al eliminar deseo"
git commit -m "📝 docs: Actualizar README con nuevas features"
```

---

## 🔍 Code Review

### Lo que Buscamos

- ✅ Código limpio y legible
- ✅ Tipos TypeScript correctos
- ✅ Componentes reutilizables
- ✅ Performance optimizado
- ✅ Accesibilidad considerada
- ✅ Responsive design
- ✅ Documentación actualizada

### Lo que Evitamos

- ❌ Código duplicado
- ❌ Tipos `any`
- ❌ Console.logs olvidados
- ❌ Comentarios innecesarios
- ❌ Dependencias no usadas
- ❌ Hardcoded values
- ❌ Breaking changes sin avisar

---

## 🎨 Guía de Estilo Visual

### Colores

```typescript
// Usar variables de Tailwind
bg-navidad-rojo    // #C41E3A
bg-navidad-verde   // #165B33
bg-navidad-dorado  // #FFD700
```

### Espaciado

```typescript
// Consistente con Tailwind
gap-2, gap-4, gap-6  // 0.5rem, 1rem, 1.5rem
p-4, p-6, p-8        // 1rem, 1.5rem, 2rem
```

### Tipografía

```typescript
// Fuente navideña para títulos
className="font-navidad text-4xl"

// Fuente normal para texto
className="text-base"
```

---

## 🚫 Lo que NO Aceptamos

- Código malicioso
- Spam o contenido inapropiado
- Cambios sin explicación
- PRs masivos sin discusión previa
- Código sin tipos TypeScript
- Features sin documentar

---

## 💬 Comunicación

- **Issues**: Para bugs y propuestas
- **Discussions**: Para preguntas generales
- **PR Comments**: Para feedback específico de código

---

## 📜 Licencia

Al contribuir, aceptas que tu código se licencie bajo MIT License.

---

## 🎁 Reconocimientos

Los contribuidores serán listados en:
- README.md
- Página "Acerca de" (futura)
- Release notes

---

## ❓ Preguntas

¿Dudas sobre cómo contribuir?

1. Revisa issues existentes
2. Abre un issue con tu pregunta
3. Únete a discussions

---

¡Gracias por hacer este proyecto mejor! 🎄✨
