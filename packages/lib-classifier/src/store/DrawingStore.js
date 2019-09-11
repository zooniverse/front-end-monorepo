import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Subject } from 'rxjs'
import { filter, map, skipUntil } from 'rxjs/operators'

const DrawingStore = types
  .model('DrawingStore', {
    activeDrawingTool: types.optional(types.number, 0),
    svg: types.frozen()
  })
  .views(self => ({
    get drawingInActiveWorkflowStepBoolean () {
      return getRoot(self).workflowSteps.activeStepTasks
        .some(task => task.type === 'drawing')
    },
    get activeDrawingTask () {
      const [task] = getRoot(self).workflowSteps.activeStepTasks
        .filter(task => task.type === 'drawing')
      return task
    },
    get coordinateStream () {
      const pointerDownStream = self.eventStream.pipe(
        filter(event => event.type === 'pointerdown')
      )

      const coordinateStream = self.eventStream.pipe(
        skipUntil(pointerDownStream),
        map(event => self.convertEvent(event))
      )

      return coordinateStream
    }
  }))
  .volatile(self => ({
    eventStream: new Subject()
  }))
  .actions(self => {
    function afterAttach () {
      createClassificationObserver()
      createWorkflowStepsObserver()
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self).classifications, (call) => {
          if (call.name === 'completeClassification') self.reset()
        })
      })
      addDisposer(self, classificationDisposer)
    }

    function createWorkflowStepsObserver () {
      const workflowStepsDisposer = autorun(() => {
        onAction(getRoot(self).workflowSteps, (call) => {
          if (call.name === 'selectStep') self.reset()
        })
      })

      addDisposer(self, workflowStepsDisposer)
    }

    function reset () {
      self.activeDrawingTool = 0
    }

    function setActiveDrawingTool (toolIndex) {
      self.activeDrawingTool = toolIndex
    }

    function addToStream (event) {
      self.eventStream.next(event)
    }

    function storeSVG (svg) {
      self.svg = svg
    }

    function convertEvent (event) {
      const type = event.type

      const clientX = event.clientX
      const clientY = event.clientY
      const svgEventOffset = self.getEventOffset(clientX, clientY)

      const svgCoordinateEvent = {
        type,
        x: svgEventOffset.x,
        y: svgEventOffset.y
      }

      return svgCoordinateEvent
    }

    function getEventOffset (x, y) {
      const svgEvent = self.svg.createSVGPoint()
      svgEvent.x = x
      svgEvent.y = y
      const svgEventOffset = svgEvent.matrixTransform(self.svg.getScreenCTM().inverse())

      return svgEventOffset
    }

    return {
      addToStream,
      afterAttach,
      convertEvent,
      getEventOffset,
      reset,
      setActiveDrawingTool,
      storeSVG
    }
  })

export default DrawingStore
