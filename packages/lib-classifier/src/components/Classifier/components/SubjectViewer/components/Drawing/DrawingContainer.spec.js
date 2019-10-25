import { shallow } from 'enzyme'
import React from 'react'
import DrawingContainer from './DrawingContainer'

const activeDrawingTask = {
  instruction: 'Draw a point and line',
  taskKey: 'T0',
  tools: [
    { type: 'point' },
    { type: 'line' }
  ],
  type: 'drawing'
}

describe('Component > DrawingContainer', function () {
  it('should render without crashing', function () {
    shallow(
      <DrawingContainer.wrappedComponent
        activeDrawingToolIndex={0}
        activeDrawingTask={activeDrawingTask}
        // TEMP CODE UNTIL TOOL STORES
        coordinateStream={{ subscribe: () => {} }}
      />)
  })

  it('it should render the activeMark tool component', function () {
    const wrapper = shallow(
      <DrawingContainer.wrappedComponent
        activeDrawingToolIndex={0}
        activeDrawingTask={activeDrawingTask}
        // TEMP CODE UNTIL TOOL STORES
        coordinateStream={{ subscribe: () => {} }}
      />
    )
    expect(wrapper.find('Point')).to.have.lengthOf(1)
  })

  it('should render current workflow step inactive marks', function () {
    const wrapper = shallow(
      <DrawingContainer.wrappedComponent
        activeDrawingToolIndex={0}
        activeDrawingTask={activeDrawingTask}
        // TEMP CODE UNTIL TOOL STORES
        coordinateStream={{ subscribe: () => {} }}
      />
    )
    expect(wrapper.find('Point')).to.have.lengthOf(1)
    const marks = new Map()
    marks.set(1234, { id: 1234, tool: { type: 'point' }, coordinates: { x: 100, y: 200 } })
    wrapper.setState({
      activeMark: {
        id: 5678,
        tool: { type: 'point' }
      },
      marks: marks
    })
    expect(wrapper.find('Point')).to.have.lengthOf(2)
  })
})
