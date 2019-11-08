import { shallow } from 'enzyme'
import React from 'react'
import DrawingContainer from './DrawingContainer'
import { Line, Point } from '@store/markings'

const activeDrawingTask = {
  instruction: 'Draw a point and line',
  taskKey: 'T0',
  tools: [
    { type: 'point' },
    { type: 'line' }
  ],
  type: 'drawing'
}

const pointMarkMock = Point.create({
  id: '123',
  toolIndex: 0,
  coordinatesArray: [{ x: 100, y: 200 }]
})

const lineMarkMock = Line.create({
  id: '456',
  toolIndex: 1,
  coordinatesArray: [{ x: 100, y: 200 }, { x: 300, y: 400 }]
})

const activeMarkMock = pointMarkMock

const marksMock = new Map([['123', pointMarkMock], ['456', lineMarkMock]])

describe('Component > DrawingContainer', function () {
  it('should render without crashing', function () {
    shallow(
      <DrawingContainer.wrappedComponent
        activeDrawingTask={activeDrawingTask}
        activeMark={activeMarkMock}
        marks={marksMock}
      />)
  })

  it('it should render the markings tool components', function () {
    const wrapper = shallow(
      <DrawingContainer.wrappedComponent
        activeDrawingTask={activeDrawingTask}
        activeMark={activeMarkMock}
        marks={marksMock}
      />
    )
    expect(wrapper.find('Point')).to.have.lengthOf(1)
    expect(wrapper.find('Line')).to.have.lengthOf(1)
  })
})
