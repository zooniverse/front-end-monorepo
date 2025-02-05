import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import { Factory } from 'rosie'
import mockStore from '@test/mockStore'
import { Provider } from 'mobx-react'
import SubjectType from '@store/SubjectStore/SubjectType'
import { default as SubjectViewerWithStore, SubjectViewer } from './SubjectViewer'

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

  it('should render a subject viewer if the subject store successfully loads', async function () {
    const store = mockStore({
      subject: SubjectType.create(Factory.build('subject', { id: '1234' }))
    })
    
    render(<Provider classifierStore={store}>
      <SubjectViewerWithStore />
    </Provider>)

    expect(screen.getByLabelText('Subject 1234')).to.exist()
  })

  describe('when there is an null viewer because of invalid subject media', function () {
    it('should render null', function () {
      const { container } = render(
        <SubjectViewer
          subjectQueueState={asyncStates.pending}
          subject={{ viewer: null }}
        />
      )
      expect(container.firstChild).to.be.null()
    })
  })
})
