# La Buena Mesa - Sitio Web de Restaurante

> **NOTA: Este proyecto está pendiente de cambios**

## Descripción

Este repositorio contiene el código fuente para el sitio web de "La Buena Mesa", un restaurante y bar con cocina de autor que combina tradición e innovación culinaria. El sitio web está diseñado para mostrar la oferta gastronómica, horarios, fotos y facilitar el contacto con los clientes.

## Características

- Diseño responsive adaptado a diferentes dispositivos
- Animaciones de scroll con biblioteca AOS
- Navegación intuitiva entre secciones
- Galería de fotos de platos y del local
- Carta completa con categorías de platos
- Sección de recomendaciones del chef
- Formulario de contacto
- Información de horarios y ubicación

## Estructura del Proyecto

```
├── index.html              # Página principal
├── carta.html             # Menú y carta del restaurante
├── contacto.html          # Página de contacto y ubicación
├── fotos.html             # Galería de imágenes
├── horarios.html          # Información de horarios
├── nuestra-recomendacion.html # Platos recomendados
├── css/                   # Estilos CSS
│   ├── base.css           # Estilos base y reset
│   ├── components.css     # Componentes reutilizables
│   ├── fonts.css          # Configuración de tipografías
│   ├── global.css         # Estilos globales
│   ├── layout.css         # Estructura y layout
│   └── pages.css          # Estilos específicos por página
├── js/                    # Scripts JavaScript
│   ├── contact.js         # Funcionalidad del formulario de contacto
│   ├── gallery.js         # Funcionalidad de la galería de fotos
│   ├── main.js            # Script principal
│   ├── menu.js            # Funcionalidad del menú
│   ├── mobile-menu.js     # Menú responsive para dispositivos móviles
│   └── page-transitions.js # Transiciones entre páginas
└── images/                # Recursos de imágenes
    ├── eventos/           # Imágenes de eventos
    ├── local/             # Imágenes del restaurante
    └── platos/            # Imágenes de los platos
```

## Tecnologías Utilizadas

- HTML5
- CSS3 (con metodología BEM para nomenclatura de clases)
- JavaScript (ES6+)
- AOS (Animate On Scroll) para animaciones
- Font Awesome para iconos

## Instalación y Uso

1. Clona este repositorio:
   ```
   git clone https://github.com/Malagaita1988/template_bar.git
   ```

2. Abre cualquiera de los archivos HTML en tu navegador para ver el sitio web.

3. Para desarrollo, se recomienda usar un servidor local como Live Server en VS Code.

## Características Implementadas

### Sistema de Reservas Online

Se ha implementado un sistema completo de reservas online con las siguientes funcionalidades:

- Formulario de reserva para clientes
- Panel de administración para gestionar reservas
- Notificaciones por email de nuevas reservas
- Confirmación o cancelación de reservas
- API RESTful para la gestión de reservas

## Tecnología del Sistema de Reservas

- Node.js y Express para el backend
- MongoDB para la base de datos
- JWT para autenticación de administradores
- Nodemailer para envío de notificaciones por email

## Pendientes y Mejoras Futuras

- Optimización de rendimiento y carga de imágenes
- Integración con redes sociales
- Versión en múltiples idiomas
- Mejoras de accesibilidad

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios que te gustaría realizar.

## Licencia

Todos los derechos reservados © 2025 La Buena Mesa