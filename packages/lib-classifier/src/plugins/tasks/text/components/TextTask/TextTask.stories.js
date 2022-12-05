import asyncStates from '@zooniverse/async-states'
import { MockTask } from '@stories/components'
import TextTask from './TextTask'

export default {
  title: 'Tasks / Text',
  component: TextTask,
  args: {
    dark: false,
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
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T0: {
      required,
      strings: {
        help: isThereTaskHelp ? 'Type something into the text box.' : '',
        instruction: 'Type something here'
      },
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    }
  }
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}

export function withSuggestions({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T0: {
      required,
      strings: {
        help: isThereTaskHelp ? 'Pick one of the suggestions.' : '',
        instruction: 'Type something here'
      },
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    }
  }
  const previousTextAnnotations = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Duis risus turpis, porttitor sit amet leo at, placerat malesuada augue.',
    'Nunc enim risus, interdum id efficitur sed, luctus in orci.'
  ]
  const previousAnnotationValues = new Map([[ 'T0', previousTextAnnotations]])
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      previousAnnotationValues={previousAnnotationValues}
      tasks={tasks}
    />
  )
}