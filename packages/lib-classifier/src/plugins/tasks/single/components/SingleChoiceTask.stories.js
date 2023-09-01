import asyncStates from '@zooniverse/async-states'
import { MockTask } from '@stories/components'
import { SingleChoiceTaskDataMock } from './SingleChoiceTask.mock'
import SingleChoiceTaskComponent from './SingleChoiceTask'

export default {
  title: 'Tasks / Single Choice Question',
  component: SingleChoiceTaskComponent,
  args: {
    isThereTaskHelp: true,
    required: false,
    subjectReadyState: asyncStates.success
  },
  argTypes: {
    subjectReadyState: {
      control: {
        type: 'select',
        options: asyncStates
      }
    }
  }
}

export function SingleChoiceQuestion({ isThereTaskHelp = false, required = false, subjectReadyState }) {
  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={SingleChoiceTaskDataMock({ isThereTaskHelp, required })}
    />
  )
}