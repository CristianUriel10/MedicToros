# Medic Toro - Planificación del Proyecto

## Objetivo

Portal web para **publicar y consultar revistas de investigación médica**. Los usuarios pueden explorar un catálogo de publicaciones, filtrar por especialidad y subir nuevas revistas en formato PDF con metadatos completos.

## Stack Tecnológico

- **React 19** con TypeScript (strict, sin `any`)
- **Vite 8** como bundler y dev server
- **Tailwind CSS v4** para estilos
- **Vitest + React Testing Library** para pruebas unitarias

## Estructura del Proyecto

```
src/
├── components/
│   ├── header/       # Navegación del portal
│   ├── hero/         # Presentación principal
│   ├── features/     # Funcionalidades del portal
│   ├── journals/     # Catálogo con búsqueda y filtros
│   ├── upload/       # Formulario de subida de revistas
│   ├── about/        # Información del portal
│   └── footer/
├── data/             # Contenido estático y revistas de ejemplo
├── pages/            # Página principal del portal
├── types/            # Definiciones TypeScript
└── utils/            # Utilidades (filtros, formato)
```

## Convenciones

- Archivos y carpetas en **kebab-case**
- Componentes funcionales con hooks
- Props tipadas con interfaces TypeScript
- JSDoc en componentes y funciones exportadas
- Máximo ~300 líneas por archivo

## Funcionalidades Actuales

| Módulo    | Descripción                                              |
|-----------|----------------------------------------------------------|
| Catálogo  | Listado de revistas con búsqueda y filtro                |
| Subida    | Formulario PDF + metadatos                               |
| Firebase  | Firestore (metadatos) + Storage (PDFs) cuando hay `.env` |
| Fallback  | Modo local si Firebase no está configurado               |

## Arquitectura Firebase

```
PDF upload  →  Firebase Storage  →  URL de descarga
Metadatos   →  Firestore (colección journals)
Catálogo    ←  Firestore query ordenada por createdAt
```

- **Firestore**: título, autores, categoría, resumen, URL del PDF
- **Storage**: archivos PDF en `journals/{id}/{archivo}.pdf`
- Los PDF **no** van en Firestore (límite de 1 MB por documento)

## Próximos Pasos

- Autenticación Firebase para restringir subidas
- Reglas de seguridad más estrictas en producción
- Paginación del catálogo
- Validación con Zod en formularios
- CI/CD con ejecución de tests
