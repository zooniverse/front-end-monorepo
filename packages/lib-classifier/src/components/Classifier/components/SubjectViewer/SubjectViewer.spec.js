import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
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

  xit('should render a subject viewer if the subject store successfully loads', function () {
    render(<SubjectViewer subjectQueueState={asyncStates.success} subject={{ viewer: '__TEST__' }} />)
    expect(screen.findByText('viewer.test')).to.exist()
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
})
