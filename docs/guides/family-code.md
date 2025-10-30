# Guía de Códigos de Familia

## ¿Qué es un Código de Familia?

Un código único de 8 caracteres que permite compartir listas de deseos solo con tu familia.

## Características

- ✅ **Privacidad**: Solo tu familia ve tus deseos
- ✅ **Simple**: Un código para toda la familia
- ✅ **Fácil de compartir**: Por WhatsApp, email, etc.
- ✅ **Seguro**: Código único generado aleatoriamente

## Cómo Funciona

### Para el Primer Miembro (Crear Familia)

1. Inicia sesión en la app
2. Se abrirá automáticamente el modal "Configura tu Familia"
3. Click en "Generar Código"
4. Se genera un código único (ej: `ABC12345`)
5. Click en "Crear Familia"
6. ¡Listo! Comparte el código con tu familia

### Para Otros Miembros (Unirse a Familia)

1. Inicia sesión en la app
2. En el modal "Configura tu Familia", click en "Unirse"
3. Ingresa el código que te compartió tu familia
4. Click en "Unirse a Familia"
5. ¡Listo! Ahora ves los deseos de tu familia

## Compartir el Código

### Desde la App

1. Ve al dashboard
2. Verás una tarjeta "Código de Familia" con tu código
3. Click en "Compartir" para enviar por WhatsApp/SMS
4. O click en "Copiar" para pegarlo donde quieras

### Mensaje Sugerido

```
¡Únete a mi lista de deseos navideños! 🎄

Código de familia: ABC12345

1. Regístrate en [URL de la app]
2. Ingresa este código cuando te lo pida
3. ¡Comparte tus deseos!
```

## Preguntas Frecuentes

### ¿Puedo cambiar mi código de familia?

Actualmente no. Si necesitas cambiar de familia, contacta al administrador.

### ¿Qué pasa si pierdo mi código?

Tu código siempre está visible en el dashboard en la tarjeta "Código de Familia".

### ¿Cuántas personas pueden usar el mismo código?

Ilimitadas. Toda tu familia puede usar el mismo código.

### ¿Puedo estar en varias familias?

No. Solo puedes tener un código de familia a la vez.

### ¿Qué pasa con mis deseos anteriores?

Si ya tenías deseos antes de configurar el código, seguirán visibles para tu familia.

### ¿Puedo ver deseos de otras familias?

No. Solo verás deseos de usuarios con tu mismo código de familia.

## Migración de Usuarios Existentes

### Usuarios sin Código (Legacy)

- Ven todos los deseos (comportamiento anterior)
- Al configurar un código, solo verán deseos de su familia
- Pueden crear familia o unirse a una existente

### Recomendación

Si ya usabas la app antes de esta feature:
1. Coordina con tu familia quién creará el código
2. Esa persona genera el código y lo comparte
3. Los demás se unen con ese código
4. ¡Listo! Ahora solo ven deseos de su familia

## Soporte Técnico

### Problemas Comunes

**"Código no válido"**
- Verifica que el código esté bien escrito
- Los códigos son de 8 caracteres (letras y números)
- Son case-insensitive (ABC = abc)

**"No veo deseos de mi familia"**
- Verifica que todos tengan el mismo código
- Asegúrate de que hayan creado deseos después de unirse

**"El modal no aparece"**
- Si ya configuraste tu código, no aparecerá
- Puedes ver tu código en el dashboard

## Arquitectura Técnica

### Base de Datos

```sql
-- Columna en tabla users
family_code TEXT

-- Índice para búsquedas rápidas
CREATE INDEX idx_users_family_code ON users(family_code);
```

### Lógica de Filtrado

1. Usuario hace login
2. Se obtiene su `family_code`
3. Se buscan todos los usuarios con ese código
4. Se filtran deseos por nombres de esos usuarios
5. Solo se muestran esos deseos

### Seguridad

- Códigos generados con MD5 + random
- Verificación de existencia antes de unirse
- RLS (Row Level Security) en Supabase
- Solo el usuario puede actualizar su propio código
