import MeasureButton from './MeasureButton'

export default {
  title: 'Subject Viewers / GeoMapViewer / MeasureButton',
  component: MeasureButton,
}

export const Default = {
  args: {
    onClick: () => console.log('Measure button clicked')
  },
}

export const Active = {
  args: {
    active: true,
    onClick: () => console.log('Measure button clicked')
  },
}
