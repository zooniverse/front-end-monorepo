import ResetButton from './ResetButton'

export default {
  title: 'Subject Viewers / GeoMapViewer / ResetButton',
  component: ResetButton,
}

export const Default = {
  args: {
    onClick: () => console.log('Reset button clicked')
  },
}
