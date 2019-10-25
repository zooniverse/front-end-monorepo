import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { filter, skip } from 'rxjs/operators'

import Mark from './Mark'

const Line = types
  .model('LineStore', {
    coordinatesArray: types.maybeNull(
      types.array(types.model({
        x: types.number,
        y: types.number
      }))
    )
  })
  .views(self => ({
    get coordinates () {
      if (self.coordinatesArray && self.coordinatesArray.length === 2) {
        const coordinates = {
          x1: self.coordinatesArray[0].x,
          y1: self.coordinatesArray[0].y,
          x2: self.coordinatesArray[1].x,
          y2: self.coordinatesArray[1].y
        }
        return coordinates
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
      }, { name: 'LineStore DrawingTask Observer autorun' })
      addDisposer(self, drawingTaskDisposer)
    }

    function setCoordinates (event) {
      if (!self.coordinatesArray) {
        self.coordinatesArray = [event, event]
      } else {
        const newCoordinatesArray = Array.from(self.coordinatesArray)
        newCoordinatesArray.splice(1, 1, event)
        self.coordinatesArray = newCoordinatesArray
      }
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
          filter(event => event.type === 'pointerup'),
          skip(1)
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

const LineStore = types.compose('LineStore', Mark, Line)

export default LineStore
