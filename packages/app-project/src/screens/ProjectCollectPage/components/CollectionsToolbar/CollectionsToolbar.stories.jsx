import CollectionsToolbar from './CollectionsToolbar'

export default {
  title: 'Project App / Screens / Project Collect / CollectionsToolbar',
  component: CollectionsToolbar
}

export function Default(args) {
  return <CollectionsToolbar {...args} />
}

Default.args = {
  count: 123,
  minSubjects: 2,
  onMinSubjectsChange: () => {},
  onSortChange: () => {},
  page: 1,
  sort: 'display_name'
}