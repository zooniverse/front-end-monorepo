import ZoomOutButton from './ZoomOutButton'

export default {
  title: 'Subject Viewers / GeoMapViewer / ZoomOutButton',
  component: ZoomOutButton,
}

export const Default = {
  args: {
    onClick: () => console.log('Zoom out button clicked')
  },
}
