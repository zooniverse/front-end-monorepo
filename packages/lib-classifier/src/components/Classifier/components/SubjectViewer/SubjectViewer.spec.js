import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import mockStore from '@test/mockStore/mockStore.js'
import { SubjectFactory } from '@test/factories'
import { SubjectViewer } from './SubjectViewer'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    render(<SubjectViewer />)
    expect(screen).to.be.ok()
  })

  it('should render nothing if the subject store is initialized', function () {
    const { container } = render(<SubjectViewer subjectQueueState={asyncStates.initialized} />)
    expect(container.firstChild).to.be.null()
  })

  it('should render a loading indicator if the subject store is loading', function () {
    render(<SubjectViewer subjectQueueState={asyncStates.loading} />)
    expect(screen.getByText('SubjectViewer.loading')).to.exist()
  })

  it('should render nothing if the subject store errors', function () {
    const { container } = render(<SubjectViewer subjectQueueState={asyncStates.error} />)
    expect(container.firstChild).to.be.null()
  })

  describe('when there is an null viewer because of invalid subject media', function () {
    it('should render null', function () {
      const { container } = render(
        <SubjectViewer
          subjectQueueState={asyncStates.success}
          subject={{ viewer: null }}
        />
      )
      expect(container.firstChild).to.be.null()
    })
  })

  it('should render the test subject viewer successfully', async function () {
    const subject = SubjectFactory.build({
      locations: [{ 'image/png': 'https://foo.bar/example.png' }],
    })

    render(
      <SubjectViewer
        subject={subject}
        subjectQueueState={asyncStates.success}
        projectViewer="__TEST__"
      />)
    await screen.findByTestId('subject-viewer')
    expect(screen.getByText('viewer.test')).to.exist()
  })

  it('should render the Volumetric Viewer successfully', async function () {
    const subject = SubjectFactory.build({ 
      locations: [{ 'image/png': 'https://foo.bar/example.png' }],
    })
    const store = mockStore({ subject })

    render(
      <SubjectViewer
        subject={subject}
        subjectQueueState={asyncStates.success}
        projectViewer="volumetric"
        subjectViewer={store.subjectViewer}
      />)
    await screen.findByTestId('subject-viewer')
    expect(screen.getByText('Loading...')).to.exist()
  })
})
