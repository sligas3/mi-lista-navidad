-- Agregar columna family_code a la tabla users
ALTER TABLE users ADD COLUMN IF NOT EXISTS family_code TEXT;

-- Crear índice para búsquedas rápidas por family_code
CREATE INDEX IF NOT EXISTS idx_users_family_code ON users(family_code);

-- Comentario explicativo
COMMENT ON COLUMN users.family_code IS 'Código único de familia para compartir listas de deseos entre miembros';

-- Función para generar código de familia único
CREATE OR REPLACE FUNCTION generate_family_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generar código aleatorio de 8 caracteres (letras mayúsculas y números)
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Verificar si ya existe
    SELECT EXISTS(SELECT 1 FROM users WHERE family_code = code) INTO exists;
    
    -- Si no existe, retornar el código
    IF NOT exists THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Comentario en la función
COMMENT ON FUNCTION generate_family_code() IS 'Genera un código único de 8 caracteres para identificar familias';
