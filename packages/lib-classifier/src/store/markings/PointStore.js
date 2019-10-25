import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { filter } from 'rxjs/operators'

import Mark from './Mark'

const Point = types
  .model('PointStore', {
    coordinatesArray: types.maybeNull(
      types.array(types.model({
        x: types.number,
        y: types.number
      }))
    )
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
      self.coordinatesArray = [event]
    }

    function setCoordinatesSubscription () {
      if (self.coordinatesSubscription === null) {
        self.coordinatesSubscription = getRoot(self).drawing.coordinateStream.subscribe(event => {
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
        const pointerUpStream = getRoot(self).drawing.coordinateStream.pipe(
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

const PointStore = types.compose('PointStore', Mark, Point)

export default PointStore
