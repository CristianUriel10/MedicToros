import type { EditorialMember, FooterColumn, NavLink, SubmissionFeature } from '../types/portal'

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Artículos', href: '#articulos' },
  { label: 'Ediciones', href: '#ediciones' },
  { label: 'Envío de trabajos', href: '#envio' },
  { label: 'Equipo editorial', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
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
    photoUrl:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop',
  },
  {
    id: 'editor-2',
    name: 'Dra. María Fernández',
    role: 'Editora Asociada',
    photoUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop',
  },
  {
    id: 'editor-3',
    name: 'Dr. Carlos Mendoza',
    role: 'Revisor Científico',
    photoUrl:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop',
  },
  {
    id: 'editor-4',
    name: 'Dra. Laura Vega',
    role: 'Coordinadora Editorial',
    photoUrl:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop',
  },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio', href: '#inicio' },
      { label: 'Artículos', href: '#articulos' },
      { label: 'Ediciones', href: '#ediciones' },
      { label: 'Envío de trabajos', href: '#envio' },
    ],
  },
  {
    title: 'Información',
    links: [
      { label: 'Acerca de nosotros', href: '#equipo' },
      { label: 'Política editorial', href: '#envio' },
      { label: 'Privacidad', href: '#contacto' },
      { label: 'Términos de uso', href: '#contacto' },
    ],
  },
]

export const categoryCoverImages: Record<string, string> = {
  Cardiología:
    'https://images.unsplash.com/photo-1628348068343-c6a848d2f1d0?w=800&h=600&fit=crop',
  Oncología:
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop',
  'Salud Pública':
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
  Neurología:
    'https://images.unsplash.com/photo-1559757175-57066e9477a0?w=800&h=600&fit=crop',
  'Medicina General':
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1a84?w=800&h=600&fit=crop',
  Pediatría:
    'https://images.unsplash.com/photo-1631217868264-e5b1bb5e7195?w=800&h=600&fit=crop',
  'Investigación Clínica':
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
}

export const defaultCoverImage =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop'
