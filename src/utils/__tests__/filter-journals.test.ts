import { describe, expect, it } from 'vitest'
import { sampleJournals } from '../../data/sample-journals'
import { filterJournals } from '../filter-journals'

describe('filterJournals', () => {
  it('returns all journals when no filters are applied', () => {
    const result = filterJournals({
      journals: sampleJournals,
      searchQuery: '',
      category: 'all',
    })

    expect(result).toHaveLength(sampleJournals.length)
  })

  it('filters journals by category', () => {
    const result = filterJournals({
      journals: sampleJournals,
      searchQuery: '',
      category: 'Oncología',
    })

    expect(result.every((journal) => journal.category === 'Oncología')).toBe(true)
  })

  it('filters journals by search query in title', () => {
    const result = filterJournals({
      journals: sampleJournals,
      searchQuery: 'telemedicina',
      category: 'all',
    })

    expect(result).toHaveLength(1)
    expect(result[0]?.title).toMatch(/telemedicina/i)
  })
})
