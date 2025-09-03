import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore/mockStore.js'
import ImageToolbar from './ImageToolbar'

import * as storybook from './ImageToolbar.stories'
const { default: Meta, ...stories } = storybook

import {
  DrawingTaskFactory,
  SingleChoiceTaskFactory,
  MultipleChoiceTaskFactory,
  TextTaskFactory,
  TranscriptionTaskFactory,
  WorkflowFactory,
} from '@test/factories'

const taskTypes = [
  {
    type: 'drawing',
    annotateShow: true,
    task: DrawingTaskFactory.build(),
  },
  {
    type:'singleChoice',
    annotateShow: false,
    task: SingleChoiceTaskFactory.build()
  },
  {
    type:'multipleChoice',
    annotateShow: false,
    task: MultipleChoiceTaskFactory.build()
  },
  {
    type:'text',
    annotateShow: false,
    task: TextTaskFactory.build()
  },
  {
    type:'transcription',
    annotateShow: true,
    task: TranscriptionTaskFactory.build()
  },
]

describe('Component > ImageToolbar', function () {
  taskTypes.forEach(task => {
    const withOrWithout = task.annotateShow ? 'with' : 'without'

    it(`should render ${withOrWithout} the annotate button`, function () {
      // Create minimal store with the current task
      const store = mockStore({
        workflow: WorkflowFactory.build({
          tasks: {
            T1: task.task,
          }
        })
      })

      render(
        <Provider classifierStore={store}>
          <ImageToolbar />
        </Provider>
      )

      // Button should exist if annotateShow is true
      if (task.annotateShow) {
        expect(screen.queryByLabelText('Annotate')).to.exist
      } else {
        expect(screen.queryByLabelText('Annotate')).to.equal(null)
      }
    })
  })
  Object.entries(stories).forEach(([name, story]) => {
    it(`renders the "${name}" story`, () => {
      const Story = composeStory(story, Meta)
      render(<Story />)
    })
  })
})
