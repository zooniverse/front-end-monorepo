import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach } from 'vitest'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { Factory } from 'rosie'
import mockStore from '@test/mockStore'
import { Provider } from 'mobx-react'
import SubjectType from '@store/SubjectStore/SubjectType'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { default as SubjectViewerWithStore, SubjectViewer } from './SubjectViewer'

vi.mock('./components/InteractionLayer/helpers/isInBounds', () => ({
  isInBounds: sinon.stub().callsFake(() => true)
}))

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    render(<SubjectViewer />)
    expect(screen).to.exist
  })

  it('should render nothing if the subject store is initialized', function () {
    const { container } = render(<SubjectViewer subjectQueueState={asyncStates.initialized} />)
    expect(container.firstChild).to.equal(null)
  })

  it('should render a loading indicator if the subject store is loading', function () {
    render(<SubjectViewer subjectQueueState={asyncStates.loading} />)
    expect(screen.getByText('Loading a subject')).to.exist
  })

  it('should render nothing if the subject store errors', function () {
    const { container } = render(<SubjectViewer subjectQueueState={asyncStates.error} />)
    expect(container.firstChild).to.equal(null)
  })

  it('should render a subject viewer if the subject store successfully loads', async function () {
    const store = mockStore({
      subject: SubjectType.create(Factory.build('subject', { id: '1234' }))
    })

    render(<Provider classifierStore={store}>
      <SubjectViewerWithStore />
    </Provider>)

    expect(screen.getByLabelText('Subject 1234')).to.exist
  })

  describe('when there is an null viewer because of invalid subject media', function () {
    it('should render null', function () {
      const { container } = render(
        <SubjectViewer
          subjectQueueState={asyncStates.pending}
          subject={{ viewer: null }}
        />
      )
      expect(container.firstChild).to.equal(null)
    })
  })

  describe('point tool in a single frame', () => {
    // SingleImageViewer won't load without mocking Image.onload

    class MockImage {
      constructor() {
        this.onload = () => {}
      }

      set src(src) {
        this.onload({
          target: {
            src,
            naturalHeight: 600,
            naturalWidth: 800
          }
        })
      }
    }

    const Image = window.Image

    before(() => {
      window.Image = MockImage
    })

    after(() => {
      window.Image = Image
    })

    let user, drawingCanvas

    beforeEach(() => {
      const store = mockStore({
        subject: SubjectFactory.build({
          locations: [
            { 'image/jpeg': 'https://example.org/image.jpg' },
          ]
        }),
        workflow: WorkflowFactory.build({
          first_task: 'T0',
          configuration: {},
          strings: {
            'tasks.T0.instruction': 'Mark an object',
            'tasks.T0.tools.0.label': 'Object',
            'tasks.T0.tools.0.details.0.instruction': 'Describe this marked object'
          },
          tasks: {
            T0: {
              type: 'drawing',
              instruction: 'Mark an object',
              tools: [{
                type: 'point',
                label: 'Object',
                details: [{
                  type: 'text',
                  taskKey: 'T0.0.0',
                  instruction: 'Describe this marked object',
                  required: false
                }]
              }]
            }
          }
        })
      })
      
      const task = store.workflowSteps.activeInteractionTask
      task.setActiveTool(0)

      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <SubjectViewerWithStore />
          </Provider>
        </Grommet>
      )

      user = userEvent.setup()
      drawingCanvas = document.querySelector('rect')
    })

    it('creates point on click, opens subtask popup, focuses within', async function () {
      await user.pointer({
        keys: '[MouseLeft]', 
        target: drawingCanvas,
        coords: { x: 100, y: 100 }
      }) // create mark

      const markNode = screen.getByTestId('mark-mark')
      expect(markNode).to.exist

      const popup = screen.getByRole('dialog')
      expect(popup).to.exist // popup is open

      expect(popup.contains(document.activeElement)).to.be.true // popup has focus
    })

    it('focuses mark when subtask popup closes', async function () {
      await user.pointer({
        keys: '[MouseLeft]', 
        target: drawingCanvas,
        coords: { x: 100, y: 100 }
      }) // create mark

      const markNode = screen.getByTestId('mark-mark')
      expect(markNode).to.exist

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton) // close the popup
      
      expect(document.activeElement).to.equal(markNode) // focus back on mark
    })
  })

  describe('point tool in multiple frames with cloned marks', () => {
    let user, task, drawingCanvas1, drawingCanvas2, boundingRectSpy

    beforeEach(() => {
      boundingRectSpy = sinon.spy(window.Element.prototype, 'getBoundingClientRect')

      const store = mockStore({
        subject: SubjectFactory.build({
          locations: [
            { 'image/jpeg': 'https://example.org/frame-1.jpg' },
            { 'image/jpeg': 'https://example.org/frame-2.jpg' }
          ]
        }),
        workflow: WorkflowFactory.build({
          first_task: 'T0',
          configuration: {
            multi_image_mode: 'separate',
            multi_image_clone_markers: true
          },
          strings: {
            'tasks.T0.instruction': 'Mark an object',
            'tasks.T0.tools.0.label': 'Object',
            'tasks.T0.tools.0.details.0.instruction': 'Describe this marked object'
          },
          tasks: {
            T0: {
              type: 'drawing',
              instruction: 'Mark an object',
              tools: [{
                type: 'point',
                label: 'Object',
                details: [{
                  type: 'text',
                  taskKey: 'T0.0.0',
                  instruction: 'Describe this marked object',
                  required: false
                }]
              }]
            }
          }
        })
      })
      
      task = store.workflowSteps.activeInteractionTask
      task.setActiveTool(0)

      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <SubjectViewerWithStore />
          </Provider>
        </Grommet>
      )

      user = userEvent.setup()
      const rects = document.querySelectorAll('rect')
      drawingCanvas1 = rects[0]
      drawingCanvas2 = rects[1]
    })

    afterEach(() => {
      boundingRectSpy.restore()
    })

    it('renders exactly one subtask popup (#7624)', async function () {
      const mark = task.activeTool.createMark({
        id: 'subtask-mark', frame: 0, toolIndex: 0, x: 100, y: 100
      })
      mark.finish()
      task.setActiveMark(mark)
      mark.setSubTaskVisibility(true)

      const popups = await screen.findAllByRole('dialog')
      expect(popups).to.have.lengthOf(1) // only one popup rendered
    })

    it('creates point on click in frame 1, opens subtask popup, focuses within', async function () {
      await user.pointer({
        keys: '[MouseLeft]', 
        target: drawingCanvas1,
        coords: { x: 100, y: 100 }
      }) // create mark in frame 1

      const markNodes = screen.getAllByTestId('mark-mark')
      expect(markNodes).to.have.lengthOf(2)

      const popups = screen.getAllByRole('dialog')
      expect(popups).to.have.lengthOf(1) // only one popup rendered

      // check that popup position was calculated from mark in frame 1
      expect(boundingRectSpy.calledOn(markNodes[0])).to.be.true
      expect(boundingRectSpy.calledOn(markNodes[1])).to.be.false

      expect(popups[0].contains(document.activeElement)).to.be.true // popup has focus
    })

    it('focuses mark in frame 1 when subtask popup closes', async function () {
      await user.pointer({
        keys: '[MouseLeft]', 
        target: drawingCanvas1,
        coords: { x: 100, y: 100 }
      }) // create mark in frame 1

      const markNodes = screen.getAllByTestId('mark-mark')

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton) // close the popup
      
      expect(document.activeElement).to.equal(markNodes[0]) // focus back on mark in frame 1
    })

    it('creates point on click in frame 2, opens subtask popup, focuses within', async function () {
      await user.pointer({
        keys: '[MouseLeft]', 
        target: drawingCanvas2,
        coords: { x: 100, y: 100 }
      }) // create mark in frame 2

      const markNodes = screen.getAllByTestId('mark-mark')
      expect(markNodes).to.have.lengthOf(2)

      const popups = screen.getAllByRole('dialog')
      expect(popups).to.have.lengthOf(1) // only one popup rendered

      // check that popup position was calculated from mark in frame 2
      expect(boundingRectSpy.calledOn(markNodes[0])).to.be.false
      expect(boundingRectSpy.calledOn(markNodes[1])).to.be.true

      expect(popups[0].contains(document.activeElement)).to.be.true // popup has focus
    })

    it('focuses mark in frame 2 when subtask popup closes', async function () {
      await user.pointer({
        keys: '[MouseLeft]', 
        target: drawingCanvas2,
        coords: { x: 100, y: 100 }
      }) // create mark in frame 2

      const markNodes = screen.getAllByTestId('mark-mark')

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton) // close the popup
      
      expect(document.activeElement).to.equal(markNodes[1]) // focus back on mark in frame 2
    })

    it('opens popup in same frame when mark is clicked', async function () {
      const mark = task.activeTool.createMark({
        id: 'subtask-mark', frame: 0, toolIndex: 0, x: 100, y: 100
      })
      mark.finish()

      const markNodes = await screen.findAllByTestId('mark-mark')
      await user.click(markNodes[1]) // click on mark in frame 2

      // check that popup position was calculated from mark in frame 2
      expect(boundingRectSpy.calledOn(markNodes[0])).to.be.false
      expect(boundingRectSpy.calledOn(markNodes[1])).to.be.true

      const popups = screen.getAllByRole('dialog')
      expect(popups).to.have.lengthOf(1)
    })

  it('opens popup in same frame when mark has focus and enter is pressed', async function () {
      const mark = task.activeTool.createMark({
        id: 'subtask-mark', frame: 0, toolIndex: 0, x: 100, y: 100
      })
      mark.finish()

      const markNodes = await screen.findAllByTestId('mark-mark')
      markNodes[1].focus()
      await user.keyboard('[Enter]')

      // check that popup position was calculated from mark in frame 2
      expect(boundingRectSpy.calledOn(markNodes[0])).to.be.false
      expect(boundingRectSpy.calledOn(markNodes[1])).to.be.true

      const popups = screen.getAllByRole('dialog')
      expect(popups).to.have.lengthOf(1)
    })
  })
})
