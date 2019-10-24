import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Subject } from 'rxjs'
import { filter, map, skipUntil } from 'rxjs/operators'

const DrawingStore = types
  .model('DrawingStore', {
    activeDrawingTool: types.optional(types.number, 0)
  })
  .views(self => ({
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
    },
    get isDrawingInActiveWorkflowStep () {
      return getRoot(self).workflowSteps.activeStepTasks
        .some(task => task.type === 'drawing')
    }
  }))
  .volatile(self => ({
    eventStream: new Subject(),
    svg: null
  }))
  .actions(self => {
    function afterAttach () {
      createClassificationObserver()
      createWorkflowStepsObserver()
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

    function setEventStream (stream) {
      self.eventStream = stream
    }

    function addToStream (event) {
      self.eventStream.next(event)
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

    function reset () {
      self.activeDrawingTool = 0
    }

    function setActiveDrawingTool (toolIndex) {
      self.activeDrawingTool = toolIndex
    }

    function storeSVG (svg) {
      self.svg = svg
    }

    return {
      addToStream,
      afterAttach,
      convertEvent,
      getEventOffset,
      reset,
      setActiveDrawingTool,
      setEventStream,
      storeSVG
    }
  })

export default DrawingStore
