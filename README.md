# Sistema de Productos y Ventas

Sistema de gestión desarrollado con Angular 19+ y Tailwind CSS.

## Requisitos Previos

- **Node.js 18+** instalado
- **npm** o **pnpm**

## Instalación

```bash
# 1. Navega a la carpeta del proyecto
cd sistema-productos

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm start
```

La aplicación estará disponible en: **http://localhost:4200**

## Credenciales de Acceso

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@sistema.com | admin123 |
| Gerente | gerente@sistema.com | gerente123 |
| Cajero | cajero@sistema.com | cajero123 |

## Funcionalidades

### Dashboard
- Vista general de ventas del día
- Ingresos y estadísticas
- Ventas recientes
- Accesos rápidos

### Productos
- CRUD completo de productos
- Tabla con paginación
- Búsqueda por nombre
- Filtro por categoría
- Gestión de stock

### Ventas
- Crear nuevas ventas
- Seleccionar productos y cantidades
- Editar ventas existentes
- Cambiar estado (pendiente/procesando/completada/cancelada)
- Stock se actualiza automáticamente

### Reportes
- Estadísticas por período
- Ventas por día
- Productos más vendidos
- Estado de inventario

## Tecnologías

- Angular 19+ (Standalone Components, Signals)
- Tailwind CSS v3
- TypeScript
- LocalStorage para persistencia

## Estructura del Proyecto

```
src/app/
├── core/           # Modelos, servicios base, guards
├── features/       # Módulos de funcionalidad
├── layouts/        # Layout principal
└── shared/         # Componentes compartidos
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `ng generate component` | Generar nuevo componente |

## Para Desarrolladores (OpenCode)

Si usas **OpenCode**, ya está configurado con instrucciones en:
- `AGENTS.md` - Guía técnica completa
- `CLAUDE.md` - Instrucciones para el asistente

## Solución de Problemas

### Error de compilación
```bash
rm -rf node_modules
npm install
```

### Puerto en uso
```bash
ng serve --port 4201
```

## Licencia

Proyecto educativo - Libre para uso y modificación.
