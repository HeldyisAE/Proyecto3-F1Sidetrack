# 🎨 Sistema de Temas - Documentación

## Descripción General

El proyecto F1 Sidetrack implementa un sistema de temas completo con 3 opciones:
- **Oscuro** (Dark) - Tema por defecto
- **Claro** (Light) - Tema claro de alto contraste
- **Daltónico** (Tritanopia) - Tema para personas con daltonismo rojo-azul

## Arquitectura del Sistema

### 1. **Services** (`src/services/themeService.js`)
Maneja la lógica central de temas:
- `getSavedTheme()` - Obtiene el tema guardado del localStorage
- `applyTheme(theme)` - Aplica el tema al DOM y guarda en localStorage
- `THEMES` - Constante con los valores válidos de temas

**Características:**
- ✅ Validación de temas
- ✅ Persistencia en localStorage
- ✅ Event emission para cambios de tema

### 2. **Hooks** (`src/hooks/useTheme.js`)
Hook personalizado de React para manejo de temas:
- `useTheme()` - Hook que devuelve `{ theme, changeTheme, THEMES }`
- Inicializa el tema al montar el componente
- Re-aplica el tema cuando cambia el estado

**Características:**
- ✅ Inicialización automática
- ✅ useCallback para optimizar renders
- ✅ Validación integrada

### 3. **Configuración** (`src/hooks/useConfig.js`)
Hook que combina temas + idiomas:
- Combina `useTheme()` + `useLanguage()`
- Usado en Header para el ConfigPanel

### 4. **Panel de Configuración** (`src/components/ConfigPanel.jsx`)
UI para cambiar temas:
- Grid de 3 botones (Oscuro, Claro, Daltónico)
- Iconos visuales (🌙, ☀️, 👁️)
- Indicador de tema activo
- Nota de accesibilidad para tritanopia

### 5. **Estilos** (`src/index.css`)
Variables CSS por tema usando `[data-theme]`:

```css
[data-theme="dark"] {
  --color-background: #0f0f0f;
  --color-surface: #1C1C1C;
  --color-primary: #E10600;
  /* ... más variables */
}

[data-theme="light"] {
  --color-background: #F5F5F5;
  --color-surface: #FFFFFF;
  /* ... */
}

[data-theme="tritanopia"] {
  --color-background: #111111;
  --color-surface: #242018;
  --color-primary: #11ff00;
  /* Optimizado para tritanopia */
}
```

## Flujo de Cambio de Tema

```
Usuario presiona botón en ConfigPanel
    ↓
changeTheme(newTheme) en ConfigPanel
    ↓
Hook useTheme: setTheme(newTheme)
    ↓
useEffect aplica applyTheme(theme)
    ↓
applyTheme() hace:
  1. Valida que sea tema válido
  2. document.documentElement.setAttribute('data-theme', theme)
  3. localStorage.setItem('f1sidetrack_theme', theme)
  4. Dispara evento 'themechange' (para futuros listeners)
    ↓
CSS variables se actualizan automáticamente
    ↓
Todos los componentes que usan var(--color-*) se re-renderizan
```

## Cómo Usar

### En un componente:
```jsx
import { useConfig } from '../hooks/useConfig';

function MyComponent() {
  const { theme, changeTheme, THEMES } = useConfig();
  
  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <p>Tema actual: {theme}</p>
      <button onClick={() => changeTheme(THEMES.LIGHT)}>
        Cambiar a Claro
      </button>
    </div>
  );
}
```

### En CSS:
```css
.my-element {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition: background-color var(--transition-normal), color var(--transition-normal);
}
```

## Variables CSS Disponibles

### Colores Base
- `--color-background` - Fondo principal
- `--color-surface` - Superficies (tarjetas, paneles)
- `--color-primary` - Color principal (rojo/verde según tema)

### Texto
- `--color-text-primary` - Texto principal
- `--color-text-secondary` - Texto secundario
- `--color-text-tertiary` - Texto terciario

### Interactividad
- `--color-border` - Bordes
- `--color-border-light` - Bordes claros
- `--color-hover` - Color al pasar el ratón

### Funcional
- `--color-success` - Éxito
- `--color-warning` - Advertencia
- `--color-error` - Error
- `--color-info` - Información

### Transiciones
- `--transition-fast` - 0.15s ease
- `--transition-normal` - 0.3s ease

## Compatibilidad y Accesibilidad

### Tritanopia (Daltonismo Rojo-Azul)
- ✅ Usa colores amarillos/naranjas/rosas
- ✅ Evita rojos y azules puros
- ✅ Alto contraste para legibilidad
- ✅ Nota explicativa en el panel

### Tema Claro
- ✅ Alto contraste (texto oscuro en fondo blanco)
- ✅ Reduce fatiga ocular diurna
- ✅ WCAG AA compliant

### Tema Oscuro
- ✅ Reduce fatiga ocular nocturna
- ✅ Mejor para OLEDs
- ✅ Tema por defecto

## Testing Manual

### Pasos para verificar:
1. **Abrir la aplicación** → Debe cargar en tema oscuro por defecto
2. **Abrir ConfigPanel** → Click en icono de configuración
3. **Cambiar a Claro** → Verificar transición suave
4. **Cambiar a Daltónico** → Verificar colores (verde fluorescente)
5. **Recargar página** → Debe mantener el tema seleccionado
6. **Limpiar localStorage** → Debe volver al tema oscuro

### Checklist:
- [ ] Los botones de tema responden al click
- [ ] Las transiciones son suaves (sin parpadeos)
- [ ] El tema se persiste en localStorage
- [ ] Los colores cambian correctamente
- [ ] El texto es legible en todos los temas
- [ ] Los bordes y separadores son visibles
- [ ] El tema daltónico usa verde fluorescente como primario
- [ ] El ConfigPanel cambia de color según el tema

## Performance

- ✅ Transiciones CSS (no JavaScript costoso)
- ✅ Una sola variable de estado por tema
- ✅ useCallback para evitar renders innecesarios
- ✅ localStorage para persistencia sin API
- ✅ Sin efectos secundarios complejos

## Mantenimiento

Para agregar un nuevo tema:
1. Agregar `NEW_THEME: 'new-theme'` en `THEMES`
2. Agregar entrada en `THEME_LABELS`
3. Agregar variables CSS en `index.css`:
   ```css
   [data-theme="new-theme"] {
     --color-background: ...;
     --color-surface: ...;
     /* etc */
   }
   ```
4. (Opcional) Agregar ícono en `ConfigPanel.jsx`
5. (Opcional) Agregar traducciones en `locals/*.json`

## Problemas Comunes y Soluciones

### El tema no persiste
**Causa:** localStorage deshabilitado  
**Solución:** Verificar permisos del navegador

### Las transiciones son abruptas
**Causa:** Falta `transition` en CSS  
**Solución:** Agregar `transition: var(--transition-normal)` al elemento

### El tema daltónico es difícil de leer
**Causa:** Monitor mal calibrado  
**Solución:** Ajustar brillo/contraste del monitor

---

**Última actualización:** 2026-06-07  
**Versión:** 1.0
