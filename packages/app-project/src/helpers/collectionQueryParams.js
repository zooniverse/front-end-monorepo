export const COLLECTIONS_PAGE_SIZE = 20
export const SUBJECTS_PAGE_SIZE = 20
export const DEFAULT_COLLECTION_MIN_SUBJECTS = 2
export const DEFAULT_COLLECTION_SORT = 'display_name'

/* 
  Commenting out recently added and recently created sort options
  as not yet available in Panoptes,
  see https://github.com/zooniverse/panoptes/issues/4667 
  for more details
*/

export const COLLECTION_SORT_OPTIONS = [
  { labelKey: 'alphabeticalAscending', value: 'display_name' },
  { labelKey: 'alphabeticalDescending', value: '-display_name' },
  // { labelKey: 'recentlyAdded', value: '-updated_at' },
  // { labelKey: 'recentlyCreated', value: '-created_at' }
]
