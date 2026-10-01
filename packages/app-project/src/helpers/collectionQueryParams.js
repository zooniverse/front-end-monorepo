export const COLLECTIONS_PAGE_SIZE = 20
export const DEFAULT_COLLECTION_MIN_SUBJECTS = 2
export const DEFAULT_COLLECTION_SORT = 'display_name'

export const COLLECTION_SORT_OPTIONS = [
  { labelKey: 'recentlyAdded', value: '-updated_at' },
  { labelKey: 'alphabeticalAscending', value: 'display_name' },
  { labelKey: 'alphabeticalDescending', value: '-display_name' },
  { labelKey: 'recentlyCreated', value: '-created_at' },
  { labelKey: 'mostSubjects', value: '-subjects_count' }
]

export function normalizeCollectionSort(sort) {
  return COLLECTION_SORT_OPTIONS.some(option => option.value === sort)
    ? sort
    : DEFAULT_COLLECTION_SORT
}

export function normalizeCollectionMinSubjects(minSubjects) {
  if (minSubjects === undefined || minSubjects === null || minSubjects === '') {
    return DEFAULT_COLLECTION_MIN_SUBJECTS
  }

  const value = Number(minSubjects)
  return Number.isInteger(value) ? value : DEFAULT_COLLECTION_MIN_SUBJECTS
}