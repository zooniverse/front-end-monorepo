import { MockTask } from '@stories/components'
import VolumetricTask from './VolumetricTask'

export default {
  title: 'Tasks / Volumetric',
  component: VolumetricTask,
  args: {},
  argTypes: {}
}

const tasks = {
  T0: {
    strings: {
      instruction: 'Volumetric the task',
    },
    taskKey: 'T0',
    type: 'volumetric',
  }
}

export function Default () {
  return (<MockTask tasks={tasks} />)
}
