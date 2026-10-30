import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'
import { useState } from 'react'
import { Provider } from 'mobx-react'
import { Button as GrommetButton, Grommet, Layer } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
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

function makeFocusgroupItemsVisible(container) {
  // jsdom reports no layout boxes or default writing mode for toolbar buttons.
  const focusgroup = container.querySelector('[focusgroup]')
  focusgroup.style.writingMode = 'horizontal-tb'
  container.querySelectorAll('[focusgroup] button').forEach(button => {
    button.style.writingMode = 'horizontal-tb'
    Object.defineProperty(button, 'getClientRects', {
      configurable: true,
      value: () => [{}]
    })
  })
}

function ImageToolbarWithLayer({ store }) {
  const [layerOpen, setLayerOpen] = useState(false)

  return (
    <Grommet theme={zooTheme}>
      <Provider classifierStore={store}>
        <ImageToolbar />
        <GrommetButton label='Open collections modal' onClick={() => setLayerOpen(true)} />
        {layerOpen && (
          <Layer animate={false} onEsc={() => setLayerOpen(false)}>
            <GrommetButton label='Close collections modal' onClick={() => setLayerOpen(false)} />
          </Layer>
        )}
      </Provider>
    </Grommet>
  )
}

describe('Component > ImageToolbar', function () {
  it('should set up a vertical menu focusgroup', async function () {
    const store = mockStore()

    const { container } = render(
      <Provider classifierStore={store}>
        <ImageToolbar />
      </Provider>
    )

    makeFocusgroupItemsVisible(container)
    const menu = await screen.findByRole('menu')
    expect(menu).to.have.attribute('aria-orientation', 'vertical')
    expect(menu.focusGroup).to.equal('menu')
  })

  it('should navigate toolbar menuitems with one tab stop without panning the image', async function () {
    const panCalls = []
    const store = mockStore()
    store.subjectViewer.setOnPan((...args) => panCalls.push(args))

    const { container } = render(
      <Provider classifierStore={store}>
        <ImageToolbar />
      </Provider>
    )

    makeFocusgroupItemsVisible(container)
    const menu = await screen.findByRole('menu')
    const menuItems = within(menu).getAllByRole('menuitem')
    expect(menuItems.filter(item => item.tabIndex === 0)).to.have.lengthOf(1)

    const user = userEvent.setup()
    await act(async () => menuItems[0].focus())
    expect(document.activeElement).to.equal(menuItems[0])
    await act(async () => user.keyboard('{ArrowDown}'))
    expect(document.activeElement).to.equal(menuItems[1])
    await act(async () => user.keyboard('{ArrowUp}'))
    expect(document.activeElement).to.equal(menuItems[0])
    await act(async () => user.tab())

    expect(panCalls).to.have.lengthOf(0)
    expect(menu.contains(document.activeElement)).to.equal(false)
  })

  it('should activate menuitems with Enter and Space', async function () {
    const store = mockStore({
      workflow: WorkflowFactory.build({
        configuration: {
          invert_subject: true
        }
      })
    })

    const { container } = render(
      <Provider classifierStore={store}>
        <ImageToolbar />
      </Provider>
    )

    makeFocusgroupItemsVisible(container)
    const invertButton = await screen.findByRole('menuitem', { name: 'Invert subject' })
    const user = userEvent.setup()
    await act(async () => invertButton.focus())
    await act(async () => user.keyboard('{Enter}'))
    expect(invertButton).to.have.attribute('aria-pressed', 'true')
    await act(async () => user.keyboard('{ }'))
    expect(invertButton).to.have.attribute('aria-pressed', 'false')
  })

  it('should keep focusgroup navigation working after a Grommet Layer closes', async function () {
    const store = mockStore()
    const { container } = render(<ImageToolbarWithLayer store={store} />)
    makeFocusgroupItemsVisible(container)

    const menu = await screen.findByRole('menu')
    const menuItems = within(menu).getAllByRole('menuitem')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Open collections modal' }))
    await user.click(await screen.findByRole('button', { name: 'Close collections modal' }))
    await act(async () => menuItems[0].focus())
    await act(async () => user.keyboard('{ArrowDown}'))

    expect(document.activeElement).to.equal(menuItems[1])
  })

  it('should keep focusgroup navigation working when a Grommet Layer closes after toolbar item changes', async function () {
    const store = mockStore()
    const { container } = render(<ImageToolbarWithLayer store={store} />)
    makeFocusgroupItemsVisible(container)
    const menu = await screen.findByRole('menu')
    const menuItems = within(menu).getAllByRole('menuitem')
    const user = userEvent.setup()

    await act(async () => menuItems[1].focus())
    await user.click(screen.getByRole('button', { name: 'Open collections modal' }))
    await user.click(await screen.findByRole('button', { name: 'Close collections modal' }))
    await act(async () => menuItems[1].focus())
    await act(async () => user.keyboard('{ArrowDown}'))

    expect(document.activeElement).to.equal(menuItems[2])
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
