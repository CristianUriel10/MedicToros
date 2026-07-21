import type { MedicalJournal } from '../types/portal'

interface FilterJournalsParams {
  journals: MedicalJournal[]
  searchQuery: string
  category: string
}

/**
 * Filtra revistas por texto de búsqueda y categoría
 * @param params - Revistas y criterios de filtrado
 * @returns {MedicalJournal[]} Revistas que coinciden con los filtros
 */
export function filterJournals({
  journals,
  searchQuery,
  category,
}: FilterJournalsParams): MedicalJournal[] {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return journals.filter((journal) => {
    const matchesCategory = category === 'all' || journal.category === category

    if (!normalizedQuery) {
      return matchesCategory
    }

    const searchableText = [
      journal.title,
      journal.authors,
      journal.abstract,
      journal.category,
      journal.issue,
    ]
      .join(' ')
      .toLowerCase()

    return matchesCategory && searchableText.includes(normalizedQuery)
  })
}
