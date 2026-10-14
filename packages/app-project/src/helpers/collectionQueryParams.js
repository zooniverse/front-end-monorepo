export const COLLECTIONS_PAGE_SIZE = 20
export const DEFAULT_COLLECTION_MIN_SUBJECTS = 2
export const DEFAULT_COLLECTION_SORT = 'display_name'

export const COLLECTION_SORT_OPTIONS = [
  { labelKey: 'alphabeticalAscending', value: 'display_name' },
  { labelKey: 'alphabeticalDescending', value: '-display_name' },
  { labelKey: 'recentlyAdded', value: '-updated_at' },
  { labelKey: 'recentlyCreated', value: '-created_at' }
]
