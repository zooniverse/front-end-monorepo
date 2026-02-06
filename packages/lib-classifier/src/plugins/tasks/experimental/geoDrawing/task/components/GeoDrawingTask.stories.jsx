import asyncStates from '@zooniverse/async-states'
import { MockTask } from '@stories/components'
import GeoDrawingTask from './GeoDrawingTask'

export default {
  title: 'Tasks / GeoDrawing',
  component: GeoDrawingTask,
  args: {
    isThereTaskHelp: true,
    required: false
  }
}

export function GeoDrawing({
  isThereTaskHelp,
  required
}) {
  const tasks = {
    T0: {
      required,
      strings: {
        help: isThereTaskHelp ? 'Draw points on the map.' : '',
        instruction: 'Mark locations of interest',
        'tools.0.label': 'Red Point with Uncertainty Circle',
        'tools.1.label': 'Blue Point'
      },
      taskKey: 'T0',
      tools: [
        {
          color: '#ff0000',
          help: '',
          label: 'Red Point',
          type: 'Point',
          uncertainty_circle: true
        },
        {
          color: '#0000ff',
          help: '',
          label: 'Blue Point',
          type: 'Point'
        }
      ],
      type: 'geoDrawing'
    }
  }
  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={asyncStates.success}
      tasks={tasks}
    />
  )
}
