import type { ContactField, NavLink, ServiceItem, StatItem } from '../types/landing'

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

export const services: ServiceItem[] = [
  {
    id: 'consultas',
    title: 'Consultas generales',
    description:
      'Evaluación clínica completa, diagnóstico preventivo y planes de tratamiento personalizados para ganado y toros de lidia.',
    icon: 'stethoscope',
  },
  {
    id: 'cirugia',
    title: 'Cirugía especializada',
    description:
      'Procedimientos quirúrgicos con equipamiento moderno y protocolos de recuperación adaptados a cada especie.',
    icon: 'scalpel',
  },
  {
    id: 'vacunacion',
    title: 'Vacunación y bioseguridad',
    description:
      'Esquemas de inmunización, control sanitario y asesoría para mantener rebaños saludables y productivos.',
    icon: 'syringe',
  },
  {
    id: 'emergencias',
    title: 'Emergencias 24/7',
    description:
      'Atención urgente las 24 horas con respuesta rápida en campo para situaciones críticas que no pueden esperar.',
    icon: 'ambulance',
  },
]

export const stats: StatItem[] = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '2,500+', label: 'Animales atendidos' },
  { value: '24/7', label: 'Servicio de emergencias' },
  { value: '98%', label: 'Satisfacción de clientes' },
]

export const contactFields: ContactField[] = [
  {
    id: 'name',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Tu nombre',
    required: true,
  },
  {
    id: 'email',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    required: true,
  },
  {
    id: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+52 000 000 0000',
    required: false,
  },
  {
    id: 'message',
    label: 'Mensaje',
    type: 'textarea',
    placeholder: 'Cuéntanos cómo podemos ayudarte...',
    required: true,
  },
]
