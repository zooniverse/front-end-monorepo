import zooTheme from '@zooniverse/grommet-theme'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'

import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import ImageToolbarConnector from './ImageToolbarConnector'

// The ImageToolbar has 6 buttons not including the InvertButton, 7 buttons including the InvertButton
// 1. <AnnotateButton />
// 2. <MoveButton />
// 3. <ZoomInButton />
// 4. <ZoomOutButton />
// 5. <RotateButton />
// 6. <ResetButton />
// 7. <InvertButton />

describe('ImageToolbarConnector', function () {
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

  const workflowWithoutInvertSnapshot = WorkflowFactory.build({
    configuration: {
      invert_subject: false
    }
  })

  const workflowWithInvertSnapshot = WorkflowFactory.build({
    configuration: {
      invert_subject: true
    }
  })

  let invertButton
  let buttons

  describe('without invert subject workflow', function () {
    before(function () {
      const store = mockStore({
        workflow: workflowWithoutInvertSnapshot
      })

      render(
        <ImageToolbarConnector />,
        {
          wrapper: withStore(store)
        }
      )

      invertButton = screen.queryByTitle('ImageToolbar.InvertButton.ariaLabel')
      buttons = screen.queryAllByRole('button')
    })

    it('should render the buttons', function () {
      expect(buttons).to.not.be.empty()
      expect(buttons).to.have.lengthOf(6)
    })

    it('should not show an invert button', function () {
      expect(invertButton).to.be.null()
    })
  })

  describe('with invert subject workflow', function () {
    before(function () {
      const store = mockStore({
        workflow: workflowWithInvertSnapshot
      })

      render(
        <ImageToolbarConnector />,
        {
          wrapper: withStore(store)
        }
      )

      invertButton = screen.queryByTitle('ImageToolbar.InvertButton.ariaLabel')
      buttons = screen.queryAllByRole('button')
    })

    it('should render the buttons', function () {
      expect(buttons).to.not.be.empty()
      expect(buttons).to.have.lengthOf(7)
    })

    it('should show an invert button', function () {
      expect(invertButton).to.not.be.null()
    })
  })
})
