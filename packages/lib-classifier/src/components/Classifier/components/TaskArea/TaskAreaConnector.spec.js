import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import { Provider } from 'mobx-react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import TaskAreaConnector from './TaskAreaConnector'

describe('TaskAreaConnector', function () {
  const mockStore = {
    annotatedSteps: {
      latest: {
        isComplete: () => {},
        tasks: []
      }
    },
    classifications: {
      active: { id: '10' },
      demoMode: false
    },
    subjects: {
      active: { id: '2' }
    },
    subjectViewer: {
      loadingState: 'success'
    },
    tutorials: {
      disableTutorialTab: false,
      setActiveTutorial: () => {},
      tutorial: { id: '1' }
    },
    workflows: {
      active: {
        configuration: {},
        id: '5'
      },
      loadingState: 'success'
    },
    workflowSteps: {
      active: {
        isComplete: () => {},
        tasks: []
      },
      isThereTaskHelp: false
    },
  }
  const renderedComponent = render(
    <Grommet theme={zooTheme}>
      <Provider classifierStore={mockStore}>
        <TaskAreaConnector />
      </Provider>
    </Grommet>
  )

  it('should render without crashing', function () {
    expect(renderedComponent).to.be.ok()
  })
})