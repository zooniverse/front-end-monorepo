import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'

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
      console.log(self.points[0]?.x)
      console.log(self.points[0]?.y)
      return {
        // TODO: check length before returning
        x: self.points[0]?.x,
        y: self.points[0]?.y
      }
    },

    deleteButtonPosition(scale) {
      // every mark expects this, but will be moved into toolbar later
      const BUFFER = 16
      // const d = self.d + BUFFER / scale
      return { x: self.points[0].x + BUFFER, y: self.points[0].y + BUFFER }
    },

    get isValid() {
      return self.points.length > 5
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
    // fires 1st
    initialPosition({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    initialDrag({ x, y }) {
      self.points.push({ x: x, y: y })
    }

    // setCoordinates({ x, y }) {
    //   self.x = x
    //   self.y = y
    // }
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
