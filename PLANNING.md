# Medic Toro - Planificación del Proyecto

## Objetivo

Landing page genérica para **Medic Toro**, clínica veterinaria especializada en ganado y toros de lidia. El sitio presenta servicios, información institucional y un formulario de contacto.

## Stack Tecnológico

- **React 19** con TypeScript (strict, sin `any`)
- **Vite 8** como bundler y dev server
- **Tailwind CSS v4** para estilos
- **Vitest + React Testing Library** para pruebas unitarias

## Estructura del Proyecto

```
src/
├── components/       # Componentes UI por sección (kebab-case)
│   ├── header/
│   ├── hero/
│   ├── services/
│   ├── about/
│   ├── contact/
│   └── footer/
├── data/             # Contenido estático de la landing
├── pages/            # Páginas compuestas
├── types/            # Definiciones TypeScript
└── test/             # Configuración de pruebas
```

## Convenciones

- Archivos y carpetas en **kebab-case**
- Componentes funcionales con hooks
- Props tipadas con interfaces TypeScript
- JSDoc en componentes y funciones exportadas
- Máximo ~300 líneas por archivo
- Validación futura con Zod si se conecta backend

## Paleta de Colores

| Token        | Uso                          |
|-------------|------------------------------|
| brand-800   | Fondos oscuros, header       |
| brand-600   | Botones primarios            |
| accent-500  | Acentos y CTAs secundarios   |
| brand-50    | Fondos claros alternos       |

## Próximos Pasos (fuera de alcance actual)

- Integración con backend para formulario de contacto
- Rutas adicionales (blog, galería)
- Internacionalización (i18n)
- CI/CD con ejecución de tests
