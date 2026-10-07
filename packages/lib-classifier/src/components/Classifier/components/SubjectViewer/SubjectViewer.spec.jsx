import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import { Factory } from 'rosie'
import mockStore from '@test/mockStore'
import { Provider } from 'mobx-react'
import SubjectType from '@store/SubjectStore/SubjectType'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { default as SubjectViewerWithStore, SubjectViewer } from './SubjectViewer'

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

  it('renders exactly one visible subtask popup across separate frames (#7624)', async function () {
    const store = mockStore({
      subject: SubjectFactory.build({
        locations: [
          { 'image/jpeg': 'https://example.org/frame-1.jpg' },
          { 'image/jpeg': 'https://example.org/frame-2.jpg' }
        ]
      }),
      workflow: WorkflowFactory.build({
        first_task: 'T0',
        configuration: { multi_image_layout: 'col' },
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
                instruction: 'Describe this marked object'
              }]
            }]
          }
        }
      })
    })
    store.subjectViewer.setSeparateFramesView(true)
    const task = store.workflowSteps.activeInteractionTask
    task.setActiveTool(0)
    const mark = task.activeTool.createMark({
      id: 'subtask-mark', frame: 0, toolIndex: 0, x: 100, y: 100
    })
    mark.finish()
    task.setActiveMark(mark)
    mark.setSubTaskVisibility(true)

    const { container } = render(
      <Grommet theme={zooTheme}>
        <Provider classifierStore={store}>
          <SubjectViewerWithStore />
        </Provider>
      </Grommet>
    )

    expect(container.querySelectorAll('image').length).to.equal(2)
    expect(screen.getAllByLabelText('Zoom in on subject').length).to.equal(2)
    const subtaskInstructions = await screen.findAllByText('Describe this marked object')
    expect(subtaskInstructions.length).to.equal(1)
    expect(screen.getAllByRole('button', { name: 'Save and Close' }).length).to.equal(1)
  })
})
