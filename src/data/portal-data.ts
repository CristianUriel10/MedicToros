import type { EditorialMember, FooterColumn, NavLink, SubmissionFeature } from '../types/portal'

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Artículos', href: '#articulos' },
  { label: 'Carteles', href: '#carteles' },
  { label: 'Ediciones', href: '#ediciones' },
  { label: 'Envío de trabajos', href: '#envio' },
  { label: 'Equipo editorial', href: '#equipo' },
]

export const submissionFeatures: SubmissionFeature[] = [
  { id: 'review', label: 'Proceso de revisión por pares', icon: 'review' },
  { id: 'ethics', label: 'Ética y buenas prácticas', icon: 'ethics' },
  { id: 'scope', label: 'Alcance nacional e internacional', icon: 'scope' },
  { id: 'access', label: 'Visibilidad y acceso abierto', icon: 'access' },
]

export const editorialTeam: EditorialMember[] = [
  {
    id: 'editor-1',
    name: 'Dr. Alejandro Ríos',
    role: 'Editor en Jefe',
    initials: 'AR',
  },
  {
    id: 'editor-2',
    name: 'Dra. María Fernández',
    role: 'Editora Asociada',
    initials: 'MF',
  },
  {
    id: 'editor-3',
    name: 'Dr. Carlos Mendoza',
    role: 'Revisor Científico',
    initials: 'CM',
  },
  {
    id: 'editor-4',
    name: 'Dra. Laura Vega',
    role: 'Coordinadora Editorial',
    initials: 'LV',
  },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio', href: '/#inicio' },
      { label: 'Artículos', href: '/#articulos' },
      { label: 'Carteles', href: '/#carteles' },
      { label: 'Envío de trabajos', href: '/#envio' },
    ],
  },
  {
    title: 'Información',
    links: [
      { label: 'Acerca de nosotros', href: '/#equipo' },
      { label: 'Política editorial', href: '/#envio' },
      { label: 'Archivo de ediciones', href: '/#ediciones' },
    ],
  },
]
