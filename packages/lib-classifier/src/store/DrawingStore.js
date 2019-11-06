import cuid from 'cuid'
import { addDisposer, getRoot, getType, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Subject } from 'rxjs'

import { Line, Point } from './markings'

const markModels = {
  line: Line,
  point: Point
}

function getMarkModel (toolType) {
  return markModels[toolType] || null
}

const DrawingStore = types
  .model('DrawingStore', {
    activeDrawingToolIndex: types.optional(types.number, 0),
    activeMark: types.safeReference(types.union({
      dispatcher: getType
    }, Line, Point)),
    marks: types.map(types.union({
      dispatcher: getType
    }, Line, Point))
  })
  .views(self => ({
    get activeDrawingTask () {
      const [task] = getRoot(self).workflowSteps.activeStepTasks
        .filter(task => task.type === 'drawing')
      return task
    },
    get isDrawingInActiveWorkflowStep () {
      return getRoot(self).workflowSteps.activeStepTasks
        .some(task => task.type === 'drawing')
    }
  }))
  .volatile(self => ({
    eventStream: new Subject(),
    svg: null,
    createSVGPoint: null,
    getScreenCTMInverse: null
  }))
  .actions(self => {
    function afterAttach () {
      createDrawingTaskObserver()
      createClassificationObserver()
      createWorkflowStepsObserver()
    }

    function createDrawingTaskObserver () {
      const drawingTaskDisposer = autorun(() => {
        if (self.isDrawingInActiveWorkflowStep) {
          self.createMark()
        }
      }, { name: 'DrawingStore DrawingTask Observer autorun' })
      addDisposer(self, drawingTaskDisposer)
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
          if (call.name === 'completeClassification') self.reset()
        })
      }, { name: 'DrawingStore Classification Observer autorun' })
      addDisposer(self, classificationDisposer)
    }

    function createWorkflowStepsObserver () {
      const workflowStepsDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
          if (call.name === 'selectStep') self.reset()
        })
      }, { name: 'DrawingStore WorkflowStep Observer autorun' })

      addDisposer(self, workflowStepsDisposer)
    }

    function createMark () {
      const MarkModel = getMarkModel(self.activeDrawingTask.tools[self.activeDrawingToolIndex].type)

      const tempId = cuid()

      const newMark = MarkModel.create({
        id: tempId,
        toolIndex: self.activeDrawingToolIndex
      })

      self.marks.put(newMark)
      self.activeMark = tempId
    }

    function addToStream (event) {
      const svgEvent = self.convertEvent(event)
      self.eventStream.next(svgEvent)
    }

    function convertEvent (event) {
      const type = event.type

      const clientX = event.clientX
      const clientY = event.clientY
      const svgEventOffset = self.getEventOffset(clientX, clientY)

      const svgCoordinateEvent = {
        pointerId: event.pointerId,
        type,
        x: svgEventOffset.x,
        y: svgEventOffset.y
      }

      return svgCoordinateEvent
    }

    function getEventOffset (x, y) {
      const svgEvent = self.createSVGPoint
      svgEvent.x = x
      svgEvent.y = y
      const svgEventOffset = svgEvent.matrixTransform(self.getScreenCTMInverse)

      return svgEventOffset
    }

    function reset () {
      self.activeDrawingToolIndex = 0
      self.marks.clear()
    }

    function setActiveDrawingTool (toolIndex) {
      self.activeDrawingToolIndex = toolIndex
      if (self.activeMark) {
        self.activeMark.stop()
      }
    }

    function setCreateSVGPoint (createSVGPoint) {
      self.createSVGPoint = createSVGPoint
    }

    function setGetScreenCTMInverse (getScreenCTMInverse) {
      self.getScreenCTMInverse = getScreenCTMInverse
    }

    return {
      addToStream,
      afterAttach,
      convertEvent,
      createMark,
      getEventOffset,
      reset,
      setActiveDrawingTool,
      setCreateSVGPoint,
      setGetScreenCTMInverse
    }
  })

export default DrawingStore
