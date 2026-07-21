import { editorialTeam } from '../../data/portal-data'
import { SectionLabel } from '../ui/section-label'

/**
 * Sección del equipo editorial de la revista
 * @returns {JSX.Element} Grid de miembros editoriales
 */
export function EditorialTeamSection() {
  return (
    <section id="equipo" className="bg-navy-900 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Equipo editorial</SectionLabel>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Rigor académico. Compromiso editorial.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {editorialTeam.map((member) => (
            <article key={member.id} className="text-center">
              <div className="mx-auto flex aspect-[3/4] max-w-[220px] items-center justify-center rounded-sm bg-gradient-to-br from-navy-700 to-accent-700">
                <span className="font-display text-4xl font-bold text-white/90">
                  {member.initials}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-sm text-white/50">{member.role}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-accent-500" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  )
}
