import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { Component } from 'react'
import { Box } from 'grommet'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import cuid from 'cuid'
import SingleImageViewer from '@viewers/components/SingleImageViewer'
import { PointTool } from '@plugins/drawingTools/models/tools'
import ClassificationStore from '@store/ClassificationStore'
import SubjectViewerStore from '@store/SubjectViewerStore'
import DrawingTask from '@plugins/tasks/DrawingTask/models/DrawingTask'
import Point from './Point'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'

const id = cuid()

const subject = SubjectFactory.build({
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' }
  ]
})

const project = ProjectFactory.build()
const workflow = WorkflowFactory.build()

const drawingTask = DrawingTask.create({
  instruction: 'Draw a point',
  taskKey: 'T1',
  tools: [{
    color: zooTheme.global.colors['drawing-red'],
    type: 'point'
  }],
  type: 'drawing'
})
drawingTask.setActiveTool(0)
const point = drawingTask.activeTool.createMark()
point.move({ x: 100, y: 100 })
console.log('point', point)
const drawingAnnotation = { id, task: 'T1', taskType: 'drawing', value: [point] }

const mockStore = {
  classifications: ClassificationStore.create(),
  subjects: {
    active: subject
  },
  subjectViewer: SubjectViewerStore.create(),
  workflows: {
    active: { id: cuid() }
  },
  workflowSteps: {
    activeStepTasks: [drawingTask]
  }
}

mockStore.classifications.createClassification(subject, workflow, project)
mockStore.workflowSteps.activeStepTasks[0].updateAnnotation()


class DrawingStory extends Component {
  render () {
    return (
      <Provider classifierStore={mockStore}>
        <Box height='medium' width='large'>
          <SingleImageViewer
            loadingState='success'
            subject={subject}
          />
        </Box>
      </Provider>
    )
  }
}
storiesOf('Drawing tools | Point', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('complete', function () {
    return (
      <DrawingStory />
    )
  })
  .add('active', function () {
    return (
      <DrawingStory />
    )
  })
