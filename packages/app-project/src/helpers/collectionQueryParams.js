export const COLLECTIONS_PAGE_SIZE = 20
export const SUBJECTS_PAGE_SIZE = 20
export const DEFAULT_COLLECTION_MIN_SUBJECTS = 2
export const DEFAULT_COLLECTION_SORT = '-updated_at'

export const COLLECTION_SORT_OPTIONS = [
  { labelKey: 'recentlyUpdated', value: '-updated_at' },
  { labelKey: 'alphabeticalAscending', value: 'display_name' },
  { labelKey: 'alphabeticalDescending', value: '-display_name' },
  { labelKey: 'recentlyCreated', value: '-created_at' }
]
