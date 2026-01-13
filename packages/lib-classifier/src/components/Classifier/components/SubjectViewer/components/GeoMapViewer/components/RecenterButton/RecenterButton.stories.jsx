import RecenterButton from './RecenterButton'

export default {
  title: 'Subject Viewers / GeoMapViewer / RecenterButton',
  component: RecenterButton,
}

export const Default = {
  args: {
    onClick: () => console.log('Recenter button clicked')
  },
}
