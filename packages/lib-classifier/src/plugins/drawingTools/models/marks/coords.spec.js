import { types } from 'mobx-state-tree'
import * as tools from '@plugins/drawingTools/models/tools'

const GenericTool = types.union(...Object.values(tools))

// The radial feedback reducer scores marks by their coords, so every tool it
// supports must expose them.
const TOOL_TYPES = [
  'circle',
  'ellipse',
  'point',
  'rectangle',
  'rotateRectangle'
]

describe('Drawing tools > mark coords', function () {
  TOOL_TYPES.forEach(function (type) {
    it(`should be defined for ${type} marks`, function () {
      const tool = GenericTool.create({ type })
      const mark = tool.createMark({ id: 'mark1' })

      expect(mark.coords).to.have.all.keys('x', 'y')
    })
  })
})
