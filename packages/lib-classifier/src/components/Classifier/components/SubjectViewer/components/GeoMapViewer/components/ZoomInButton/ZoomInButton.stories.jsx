import ZoomInButton from './ZoomInButton'

export default {
  title: 'Subject Viewers / GeoMapViewer / ZoomInButton',
  component: ZoomInButton,
}

export const Default = {
  args: {
    onClick: () => console.log('Zoom in button clicked')
  },
}
