# StyleHub Analysis Dashboard

Dashboard de análisis completo para el backend de StyleHub E-commerce, construido con Astro y Tailwind CSS.

## 🚀 Características

- **10 Secciones de Análisis Detallado**:
  - Overview del Sistema
  - Análisis de Base de Datos
  - API Endpoints
  - Flujos de Negocio
  - Análisis de Seguridad
  - Transacciones
  - Manejo de Errores
  - Métricas y KPIs
  - Análisis de Código
  - Integraciones Externas

- **Visualizaciones Interactivas**:
  - Diagramas de entidades
  - Gráficos de métricas
  - Flujos de proceso paso a paso
  - Código fuente con syntax highlighting

- **Datos Reales**:
  - 51 productos del seed
  - 8 entidades de base de datos
  - 28+ endpoints documentados
  - Métricas de negocio simuladas

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🌐 Acceso

Una vez iniciado el servidor de desarrollo, accede a:

```
http://localhost:4321
```

## 📁 Estructura del Proyecto

```
stylehub-analysis-dashboard/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── data/            # Datos extraídos del backend
│   ├── pages/           # Páginas del dashboard
│   └── styles/          # Estilos globales
├── public/              # Archivos estáticos
└── package.json
```

## 🎨 Tecnologías

- **Astro 4.0** - Framework web moderno
- **Tailwind CSS 3.4** - Estilos utility-first
- **TypeScript** - Type safety
- **Prism.js** - Syntax highlighting

## 📊 Secciones

### 1. Overview
Vista general del sistema, stack tecnológico y arquitectura.

### 2. Database
Esquema completo de base de datos con 8 entidades y sus relaciones.

### 3. API Endpoints
28+ endpoints documentados con métodos HTTP, autenticación y DTOs.

### 4. Business Flows
Flujos completos de autenticación, compra, pago y gestión de stock.

### 5. Security
Análisis de JWT, guards, validaciones y mejores prácticas de seguridad.

### 6. Transactions
Operaciones transaccionales con @Transactional y manejo de rollback.

### 7. Error Handling
Sistema centralizado de manejo de excepciones y logging.

### 8. Metrics & KPIs
Métricas de productos, ventas, conversión y KPIs de negocio.

### 9. Code Analysis
Patrones de diseño, SOLID principles y métricas de código.

### 10. Integrations
Stripe, Nodemailer, TypeORM y otras integraciones externas.

## 👨‍💻 Autor

Creado para análisis del backend StyleHub E-commerce (NestJS 11.0.1)

## 📝 Licencia

Este dashboard es una herramienta de análisis y documentación del proyecto StyleHub.
