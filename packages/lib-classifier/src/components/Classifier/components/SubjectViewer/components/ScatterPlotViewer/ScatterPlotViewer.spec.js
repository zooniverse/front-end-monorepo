import { shallow } from 'enzyme'
import React from 'react'
import { genRandomNormalPoints } from '@vx/mock-data'
import { Group } from '@vx/group'
import Axes from './components/Axes'
import ScatterPlotViewer from './ScatterPlotViewer'
import { MARGIN, PADDING } from './helpers/constants'

const parentWidth = 768
const parentHeight = 384

const randomPoints = genRandomNormalPoints()
const xPoints = randomPoints.map((point) => {
  return point[0]
})
const yPoints = randomPoints.map((point) => {
  return point[1]
})

const data = {
  x: xPoints,
  y: yPoints
}

const transformMatrix = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

describe.only('Component > ScatterPlotViewer', function () {
  describe('render', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <ScatterPlotViewer
          data={data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          transformMatrix={transformMatrix}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })
  })
})