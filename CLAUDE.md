# Lilia HOME - Project Guide

## Descripción General
E-commerce moderno de aromatizantes premium con panel de administración. Construido con React + Vite y diseño basado en una paleta de colores cálidos y naturales.

## Estructura del Proyecto

```
LiliaHome/
├── src/
│   ├── App.jsx          # Componente principal (tienda y admin unificados)
│   └── main.jsx         # Punto de entrada React
├── index.html           # HTML base
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
├── README.md            # Documentación del usuario
├── CLAUDE.md            # Este archivo
└── lilia-home-design-system.html  # Referencia de design system
```

## Paleta de Colores (Design Tokens)

```javascript
COLORS = {
  cream:  "#F5EFE6",  // Fondo principal
  sand:   "#E8D5B7",  // Secundario/separadores
  taupe:  "#9E8A73",  // Texto secundario
  brown:  "#6B5140",  // Botones/texto principal
  dark:   "#3D2B1F",  // Títulos
  accent: "#C4956A",  // Dorado cálido, hover
  white:  "#FDFAF6",  // Cards/modales
};
```

## Tipografías

- **Dancing Script**: Logo "Lilia", títulos display, captions del carrusel
- **Cinzel**: Subtítulos, precios, nombres de productos
- **Lato**: Cuerpo de texto, UI general, botones

## Componentes Principales

### App (Página de Tienda)
- **Header**: Logo Lilia + navegación (Admin button, carrito)
- **Carousel**: Auto-scroll cada 5s con controles manuales
- **Productos**: Grid responsiva con cards hover
- **Testimonios**: Sección con comentarios de 5 estrellas
- **Footer**: Info de contacto y redes sociales
- **Cart Drawer**: Sidebar deslizable derecha
- **Product Modal**: Modal detalle con imagen grande
- **WhatsApp Button**: Botón flotante que abre WhatsApp con el pedido

### AdminPage
- **Auth**: Contraseña `admin123`
- **Secciones**:
  - **Productos**: CRUD de items del catálogo
  - **Carousel**: Gestionar imágenes del carrusel
  - **Testimonios**: Gestionar comentarios de clientes

## Datos Iniciales

### Productos (10 items)
- Aromatizadores línea hogar/infantil/perfume (500ml)
- Gatillo spray
- Aerosol 270ml
- Difusores aromáticos
- Aromatizadores auto
- Colonia infantil
- Cubo decorativo

### Carrusel
3 slides automáticos con captions

### Testimonios
3 comentarios de ejemplo con 5 estrellas

## Flujo de Usuario

1. **Tienda**: Visita productos, ve detalles en modal
2. **Carrito**: Agrega items, ve total, abre drawer
3. **Compra**: Confirma por WhatsApp, se envía mensaje con detalles

## Flujo Admin

1. Click "Admin" en header
2. Ingresa contraseña `admin123`
3. Gestiona productos/carrusel/testimonios en cada sección
4. Los datos se guardan en estado React (no persiste en refresh)

## Scripts Disponibles

```bash
npm install       # Instala dependencias
npm run dev       # Inicia servidor Vite (puerto 3000)
npm run build     # Build para producción
npm run preview   # Vista previa del build
npm run lint      # Lint del código
npm run format    # Formatea con Prettier
```

## Notas Técnicas

- **Componente único**: App.jsx contiene tienda y admin
- **Estado global**: useState para productos, carrito, admin
- **Sin persistencia**: Los datos del admin se pierden en refresh
- **Estilos inline**: Todo CSS en estilos inline (sin CSS modules)
- **WhatsApp API**: URL de contacto fija a +5491112345678

## Próximas Mejoras Sugeridas

- [ ] Persistencia en localStorage para datos admin
- [ ] Base de datos backend (Firebase/Supabase)
- [ ] Integración de pagos real
- [ ] Sistema de autenticación real
- [ ] Separar componentes en archivos individuales
- [ ] Agregar tests unitarios
- [ ] SEO y meta tags
- [ ] Dark mode toggle
- [ ] Multilanguage (ES/EN)

## Admin Credentials

- **Username**: (solo contraseña)
- **Password**: `admin123`

## Contacto WhatsApp

Número hardcodeado: `+5491112345678`
(Cambiar en la función `sendWhatsApp()` y botón flotante)

## Licencia

© 2024 Lilia HOME - Todos los derechos reservados
