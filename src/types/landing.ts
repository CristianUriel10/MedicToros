export interface NavLink {
  label: string
  href: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: 'stethoscope' | 'scalpel' | 'syringe' | 'ambulance'
}

export interface StatItem {
  value: string
  label: string
}

export interface ContactField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  placeholder: string
  required: boolean
}
