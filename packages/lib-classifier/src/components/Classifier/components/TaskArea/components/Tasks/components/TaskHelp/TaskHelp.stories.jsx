import { Box } from 'grommet'

import TaskHelp from './TaskHelp'

function ComponentDecorator(Story) {
  return (
    <Box
      width='25rem'
      pad='medium'
      margin='medium'
      border={{ style: 'solid', color: { dark: 'white', light: 'light-3' } }}
      background={{ light: 'white' }}
    >
      <Story />
    </Box>
  )
}

export default {
  title: 'Tasks / TaskHelpModal',
  component: TaskHelp,
  decorators: [ComponentDecorator]
}

const tasksWithOneTask = [{
  taskKey: 'init',
  help: '# Try this'
}]

const tasksWithThreeTasks = [{
  taskKey: 'init',
  help: '# Try this'
}, {
  taskKey: 'T0',
  help: ''
}, {
  taskKey: 'T1',
  help: '# Try this again'
}]

export const OneTask = {}
OneTask.args = {
  tasks: tasksWithOneTask
}

export const ThreeTasks = {}
ThreeTasks.args = {
  tasks: tasksWithThreeTasks
}
