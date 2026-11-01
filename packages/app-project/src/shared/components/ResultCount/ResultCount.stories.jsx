import ResultCount from './ResultCount'

export default {
  title: 'Project App / Shared / ResultCount',
  component: ResultCount
}

export function Default(args) {
  return <ResultCount {...args} />
}

Default.args = {
  count: 25,
  page: 2,
  pageSize: 10
}

export function Loading(args) {
  return <ResultCount {...args} />
}

Loading.args = {
  ...Default.args,
  isLoading: true
}
