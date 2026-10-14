import CollectionsResultCount from './CollectionsResultCount'

export default {
  title: 'Project App / Screens / Project Collect / CollectionsResultCount',
  component: CollectionsResultCount
}

export function Default(args) {
  return <CollectionsResultCount {...args} />
}

Default.args = {
  count: 25,
  page: 2,
  pageSize: 10
}

export function Loading(args) {
  return <CollectionsResultCount {...args} />
}

Loading.args = {
  ...Default.args,
  isLoading: true
}
