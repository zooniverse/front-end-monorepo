import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'

import mockStore from '@test/mockStore'
import mockWorkflow from '../../mocks/mockWorkflow.js'
import ExpertOptionsConnector from './ExpertOptionsConnector'

describe('TaskNavButtons > Component > ExpertOptionsContainer', function () {
  const classifierStore = mockStore({ workflow: mockWorkflow })

  describe('demo mode disabled by default', function () {
    it('should render null', function () {
      render(
        <Provider classifierStore={classifierStore}>
          <ExpertOptionsConnector />
        </Provider>
      )
      expect(
        screen.queryByLabelText('TaskArea.Tasks.ExpertOptions.label')
      ).to.be.null()
    })
  })
})
