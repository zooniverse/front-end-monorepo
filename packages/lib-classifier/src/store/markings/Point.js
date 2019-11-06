import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { filter, skipUntil } from 'rxjs/operators'

import Mark from './Mark'

const PointModel = types
  .model('PointModel', {
    coordinatesArray: types.array(types.model({
      x: types.number,
      y: types.number
    }))
  })
  .views(self => ({
    get coordinates () {
      if (self.coordinatesArray && self.coordinatesArray.length === 1) {
        return self.coordinatesArray[0]
      }
      return null
    }
  }))
  .volatile(self => ({
    coordinatesSubscription: null,
    stopSubscription: null
  }))
  .actions(self => {
    function afterAttach () {
      createDrawingTaskObserver()
    }

    function createDrawingTaskObserver () {
      const drawingTaskDisposer = autorun(() => {
        const validDrawingTaskReference = isValidReference(() => getRoot(self).drawing.activeDrawingTask)
        if (validDrawingTaskReference) {
          self.setCoordinatesSubscription()
          self.setStopSubscription()
        }
      }, { name: 'PointStore DrawingTask Observer autorun' })
      addDisposer(self, drawingTaskDisposer)
    }

    function setCoordinates (event) {
      self.coordinatesArray = [{ x: event.x, y: event.y }]
    }

    function setCoordinatesSubscription () {
      if (self.coordinatesSubscription === null) {
        const pointerDownStream = getRoot(self).drawing.eventStream.pipe(
          filter(event => event.type === 'pointerdown')
        )
        self.coordinatesSubscription = getRoot(self).drawing.eventStream
          .pipe(skipUntil(pointerDownStream))
          .subscribe(event => {
            self.setCoordinates(event)
          })
      }
    }

    function stop () {
      self.coordinatesSubscription.unsubscribe()
      self.stopSubscription.unsubscribe()
      getRoot(self).drawing.createMark()
    }

    function setStopSubscription () {
      if (self.stopSubscription === null) {
        const pointerUpStream = getRoot(self).drawing.eventStream.pipe(
          filter(event => event.type === 'pointerup')
        )
        self.stopSubscription = pointerUpStream.subscribe(event => {
          self.stop()
        })
      }
    }

    return {
      afterAttach,
      setCoordinates,
      setCoordinatesSubscription,
      stop,
      setStopSubscription
    }
  })

const Point = types.compose('Point', Mark, PointModel)

export default Point
