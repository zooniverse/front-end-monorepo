import zooTheme from '@zooniverse/grommet-theme'
import React, { Component } from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import SingleImageViewer from '@viewers/components/SingleImageViewer'
import { SubjectFactory } from '@test/factories'

export const subject = SubjectFactory.build({
  locations: [
    { 'image/jpeg': 'http://placekitten.com/1000/600' }
  ]
})

export const subTasksSnapshot = [
  {
    instruction: 'Name your favourite fruit.',
    taskKey: 'T0.0',
    type: 'text'
  },
  {
    answers: [{ label: "yes" }, { label: "no" }],
    help: "",
    question: "Is it tasty?",
    taskKey: 'T0.1',
    type: 'single'
  },
  {
    answers: [{ label: "cat" }, { label: "dog" }, { label: "bird" }],
    help: "",
    question: "Select your favourite animals.",
    taskKey: 'T0.2',
    type: 'multiple'
  }
]

export function updateStores({ activeMark, finished, subtask }, mockBounds, stores) {
  const [ drawingTask ] = stores.workflowSteps.activeStepTasks
  const [ mark ] = drawingTask.marks
  if (finished) {
    drawingTask.setActiveMark(mark.id)
    mark.finish && mark.finish()
  }
  mark.setSubTaskVisibility(subtask, mockBounds)
  if (activeMark) {
    drawingTask.setActiveMark(mark.id)
  } else {
    drawingTask.setActiveMark(undefined)
  }
}

export class DrawingStory extends Component {
  constructor() {
    super()

    this.state = {
      loadingState: asyncStates.initialized
    }
  }

  componentDidMount() {
    // what needs this time to make the svg ref to be defined?
    // 100ms isn't enough time 1000ms is
    setTimeout(() => this.setState({ loadingState: asyncStates.success }), 1000)
  }

  render() {
    return (
      <Provider classifierStore={this.props.stores}>
        <Grommet
          background={{
            dark: 'dark-1',
            light: 'light-1'
          }}
          theme={zooTheme}
          themeMode='light'
        >
          <Box height='medium' width='large'>
            <SingleImageViewer
              loadingState={this.state.loadingState}
              subject={subject}
            />
          </Box>
        </Grommet>
      </Provider>
    )
  }
}
