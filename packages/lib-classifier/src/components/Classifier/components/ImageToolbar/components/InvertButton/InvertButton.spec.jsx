import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import InvertButtonContainer from './InvertButtonContainer'

describe('Component > InvertButton', function () {
  function withStore (store) {
    return function Wrapper ({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  it('should render null if workflow configuration invert_subject property is false', function () {
    const workflowSnapshot = WorkflowFactory.build({
      configuration: {
        invert_subject: false
      }
    })

    const store = mockStore({
      workflow: workflowSnapshot
    })

    render(
      <InvertButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.queryByRole('button')).to.be.null()
  })

  it('should have an accessible name', function () {
    const workflowSnapshot = WorkflowFactory.build({
      configuration: {
        invert_subject: true
      }
    })

    const store = mockStore({
      workflow: workflowSnapshot
    })

    render(
      <InvertButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'ImageToolbar.InvertButton.ariaLabel' })).to.be.ok()
  })

  it('should have a pressed state', async function () {
    const user = userEvent.setup({ delay: null })

    const workflowSnapshot = WorkflowFactory.build({
      configuration: {
        invert_subject: true
      }
    })

    const store = mockStore({
      workflow: workflowSnapshot
    })

    render(
      <InvertButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    const button = screen.getByRole('button', { name: 'ImageToolbar.InvertButton.ariaLabel' })
    expect(button).to.have.attribute('aria-pressed', 'false')
    expect(store.subjectViewer.invert).to.be.false()
    await user.click(button)
    expect(button).to.have.attribute('aria-pressed', 'true')
    expect(store.subjectViewer.invert).to.be.true()
  })
})
