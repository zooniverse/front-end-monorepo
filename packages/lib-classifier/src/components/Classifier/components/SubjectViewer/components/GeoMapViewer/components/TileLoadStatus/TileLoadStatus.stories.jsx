import TileLoadStatus from './TileLoadStatus'

export default {
  title: 'Subject Viewers / GeoMapViewer / TileLoadStatus',
  component: TileLoadStatus,
}

export const Loading = {
  args: {
    loading: true,
    onRetry: () => console.log('Retry clicked')
  },
}

export const Failed = {
  args: {
    failed: true,
    onRetry: () => console.log('Retry clicked')
  },
}
