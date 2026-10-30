import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('should set up a vertical menubar focusgroup', async function () {
    const store = mockStore()

    render(
      <Provider classifierStore={store}>
        <ImageToolbar />
      </Provider>
    )

    const menubar = await screen.findByRole('menubar')
    expect(menubar).to.have.attribute('aria-orientation', 'vertical')
    expect(menubar.focusGroup).to.equal('menubar block')
  })

  it('should not pan the image when navigating toolbar buttons', async function () {
    const panCalls = []
    const store = mockStore()
    store.subjectViewer.setOnPan((...args) => panCalls.push(args))

    render(
      <Provider classifierStore={store}>
        <ImageToolbar />
      </Provider>
    )

    const menubar = await screen.findByRole('menubar')
    const user = userEvent.setup()
    await act(async () => {
      screen.getByLabelText('Zoom in on subject').focus()
      await user.keyboard('{ArrowDown}')
    })

    expect(panCalls).to.have.lengthOf(0)
    expect(menubar).to.have.attribute('aria-orientation', 'vertical')
  })

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
