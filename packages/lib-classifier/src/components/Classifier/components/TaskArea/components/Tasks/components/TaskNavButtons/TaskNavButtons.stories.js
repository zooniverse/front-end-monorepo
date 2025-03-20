import { Provider } from 'mobx-react'
import { Box } from 'grommet'
import mockStore from '@test/mockStore'
import mockWorkflow from './mocks/mockWorkflow'

import TaskNavButtons from './TaskNavButtons'

function ComponentDecorator(Story) {
  return (
    <Box
      background={{ light: 'white', dark: 'dark-1' }}
      pad='small'
      width='25rem'
    >
      <Story />
    </Box>
  )
}

export default {
  title: 'Tasks / Nav Buttons',
  component: TaskNavButtons,
  decorators: [ComponentDecorator],
  argTypes: { disabled: { control: 'boolean' } }
}

const defaultStore = mockStore()

export const Default = ({ disabled }) => {
  return (
    <Provider classifierStore={defaultStore}>
      <TaskNavButtons disabled={disabled} />
    </Provider>
  )
}

const nextStore = mockStore({ mockWorkflow })
// console.log(nextStore.subjects.active.stepHistory)
nextStore.classifications.active.annotation({ taskKey: 'T0' }).update(0)

export const Next = ({ disabled }) => {
  return (
    <Provider classifierStore={nextStore}>
      <TaskNavButtons disabled={disabled} />
    </Provider>
  )
}

const nextOrBackStore = mockStore({ mockWorkflow })

nextOrBackStore.classifications.active.annotation({ taskKey: 'T0' }).update(0)
nextOrBackStore.subjects.active.stepHistory.next()

nextOrBackStore.classifications.active
  .annotation({ taskKey: 'T1' })
  .update([1, 2])

export const NextOrBack = ({ disabled }) => {
  return (
    <Provider classifierStore={nextOrBackStore}>
      <TaskNavButtons disabled={disabled} />
    </Provider>
  )
}

const backOrDoneStore = mockStore({ mockWorkflow })

backOrDoneStore.classifications.active.annotation({ taskKey: 'T0' }).update(0)
backOrDoneStore.subjects.active.stepHistory.next()
backOrDoneStore.classifications.active
  .annotation({ taskKey: 'T1' })
  .update([1, 2])
backOrDoneStore.subjects.active.stepHistory.next()

export const BackOrDone = ({ disabled }) => {
  return (
    <Provider classifierStore={backOrDoneStore}>
      <TaskNavButtons disabled={disabled} />
    </Provider>
  )
}
