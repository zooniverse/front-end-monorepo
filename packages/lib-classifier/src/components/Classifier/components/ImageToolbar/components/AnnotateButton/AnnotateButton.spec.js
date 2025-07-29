import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import AnnotateButtonContainer from './AnnotateButtonContainer'

describe('Component > AnnotateButton', function () {
  const workflow = WorkflowFactory.build()
  const drawingTask = DrawingTaskFactory.build({
    instruction: 'Draw a point',
    taskKey: 'T1',
    tools: [{
      type: 'point'
    }],
    type: 'drawing'
  })
  workflow.tasks = [drawingTask]

  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }
  
  it('should have an accessible name', function () {
    const store = mockStore({ workflow })
    
    render(
      <AnnotateButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'ImageToolbar.AnnotateButton.ariaLabel' })).to.be.ok()
  })

  it('should change the subject viewer annotate and move states when clicked', async function () {
    const user = userEvent.setup({ delay: null })

    const store = mockStore({ workflow })
    store.subjectViewer.enableMove()

    expect(store.subjectViewer.annotate).to.be.false()
    expect(store.subjectViewer.move).to.be.true()

    render(
      <AnnotateButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    const button = screen.getByRole('button', { name: 'ImageToolbar.AnnotateButton.ariaLabel' })
    expect(button).to.have.attribute('aria-pressed', 'false')
    await user.click(button)
    expect(button).to.have.attribute('aria-pressed', 'true')

    expect(store.subjectViewer.annotate).to.be.true()
    expect(store.subjectViewer.move).to.be.false()
    expect (store.subjectViewer.interactionMode).to.equal('annotate')
  })

  describe('when disabled', function () {
    it('should not show as pressed and not change the subject viewer annotate and move states', async function () {
      const user = userEvent.setup({ delay: null })

      const store = mockStore() // mockStore default workflow does not include an annotate task
      store.subjectViewer.enableMove()

      expect(store.subjectViewer.annotate).to.be.false()
      expect(store.subjectViewer.move).to.be.true()

      render(
        <AnnotateButtonContainer />, {
          wrapper: withStore(store)
        }
      )

      const button = screen.getByRole('button', { name: 'ImageToolbar.AnnotateButton.ariaLabel' })
      expect(button).to.have.attribute('aria-pressed', 'false')
      await user.click(button)
      expect(button).to.have.attribute('aria-pressed', 'false')

      expect(store.subjectViewer.annotate).to.be.false()
      expect(store.subjectViewer.move).to.be.true()
    })
  })
})
