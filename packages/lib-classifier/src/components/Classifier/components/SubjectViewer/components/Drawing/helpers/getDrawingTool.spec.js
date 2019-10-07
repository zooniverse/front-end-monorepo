import getDrawingTool from './getDrawingTool'

import { Point } from '../tools'

describe('Helpers > getDrawingTool', function () {
  it('should return the `Point` component if passed `point`', function () {
    expect(getDrawingTool('point')).to.equal(Point)
  })

  it('should return null if it can\'t match a tool', function () {
    expect(getDrawingTool('foobar')).to.equal(null)
  })
})
