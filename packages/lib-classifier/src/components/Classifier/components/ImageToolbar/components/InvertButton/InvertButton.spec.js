import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import InvertButtonContainer from './InvertButtonContainer'

describe.skip('Component > InvertButton', function () {
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

  it('should render null if disabled', function () {
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

  it('should have an `a11yTitle` label', function () {
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

    expect(screen.getByRole('button', { name: 'ImageToolbar.InvertButton.ariaLabel' })).to.exist()
  })

  it('should change the subject viewer invert property on click', async function () {
    const user = userEvent.setup({ delay: null })

    const workflowSnapshot = WorkflowFactory.build({
      configuration: {
        invert_subject: true
      }
    })

    const store = mockStore({
      workflow: workflowSnapshot
    })

    expect(store.subjectViewer.invert).to.be.false()

    render(
      <InvertButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    await user.click(screen.getByRole('button', { name: 'ImageToolbar.InvertButton.ariaLabel' }))

    expect(store.subjectViewer.invert).to.be.true()
  })
})
