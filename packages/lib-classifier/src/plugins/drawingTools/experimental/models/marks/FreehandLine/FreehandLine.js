import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'

const MINIMUM_POINTS = 20

const singleCoord = types.model({
  x: types.maybe(types.number),
  y: types.maybe(types.number)
})

const FreehandLineModel = types
  .model('FreehandLineModel', {
    points: types.array(singleCoord)
  })
  .views((self) => ({
    get coords() {
      return {
        // TODO: check length before returning
        x: self.points[0]?.x,
        y: self.points[0]?.y
      }
    },

    deleteButtonPosition(scale) {
      // will be moved into toolbar later
      const BUFFER = 16
      return { x: self.points[0].x - BUFFER, y: self.points[0].y - BUFFER }
    },

    get isValid() {
      return self.points.length > MINIMUM_POINTS
    },

    get tool() {
      return getParentOfType(self, FreehandLineTool)
    },

    get path() {
      const [firstCoord, ...otherCoords] = self.points
      if (!firstCoord) {
        return ''
      }
      let path = `M ${firstCoord.x},${firstCoord.y} `
      otherCoords.forEach(({ x, y }) => {
        path = path + `L ${x},${y}`
      })
      return path
    },

    get toolComponent() {
      return FreehandLineComponent
    }
  }))
  .actions((self) => ({
    initialPosition({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    initialDrag({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    move() {
      return
    }
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
