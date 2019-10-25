import cuid from 'cuid'
import { addDisposer, getRoot, getType, isValidReference, onAction, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Subject } from 'rxjs'
import { filter, map, skipUntil } from 'rxjs/operators'

import { LineStore, PointStore } from './markings'

const markStores = {
  line: LineStore,
  point: PointStore
}

function getMarkStore (toolType) {
  return markStores[toolType] || null
}

const DrawingStore = types
  .model('DrawingStore', {
    activeDrawingTool: types.optional(types.number, 0),
    activeMark: types.safeReference(types.union({
      dispatcher: (snapshot) => {
        const snapshotType = getType(snapshot)
        if (snapshotType.name === 'LineStore') return LineStore
        if (snapshotType.name === 'PointStore') return PointStore
        return undefined
      }
    }, LineStore, PointStore)),
    marks: types.map(types.union({
      dispatcher: (snapshot) => {
        const snapshotType = getType(snapshot)
        if (snapshotType.name === 'LineStore') return LineStore
        if (snapshotType.name === 'PointStore') return PointStore
        return undefined
      }
    }, LineStore, PointStore))
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
      createDrawingTaskObserver()
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

    function createDrawingTaskObserver () {
      const drawingTaskDisposer = autorun(() => {
        const validDrawingTaskReference = isValidReference(() => getRoot(self).drawing.activeDrawingTask)
        if (validDrawingTaskReference) {
          self.createMark()
        }
      }, { name: 'DrawingStore DrawingTask Observer autorun' })
      addDisposer(self, drawingTaskDisposer)
    }

    function createMark () {
      const MarkStore = getMarkStore(self.activeDrawingTask.tools[self.activeDrawingTool].type)

      const tempId = cuid()

      const newMark = MarkStore.create({
        id: tempId,
        toolIndex: self.activeDrawingTool
      })

      self.marks.put(newMark)
      self.activeMark = tempId
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
      // TODO:
      // self.activeMark
      // self.marks
    }

    function setActiveDrawingTool (toolIndex) {
      self.activeDrawingTool = toolIndex
      self.activeMark.stop()
    }

    function setSVG (svg) {
      self.svg = svg
    }

    return {
      addToStream,
      afterAttach,
      convertEvent,
      createMark,
      getEventOffset,
      reset,
      setActiveDrawingTool,
      setEventStream,
      setSVG
    }
  })

export default DrawingStore
