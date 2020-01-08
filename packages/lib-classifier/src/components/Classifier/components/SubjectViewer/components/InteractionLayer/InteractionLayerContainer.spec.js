import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'
import InteractionLayer from './InteractionLayer'
import DrawingToolMarks from './components/DrawingToolMarks'

describe('Component > InteractionLayerContainer', function () {
  it('should render without crashing', function () {
    shallow(<InteractionLayerContainer.wrappedComponent />)
  })

  describe('with an active drawing task and drawing tool', function () {
    it('should render an InteractionLayer', function () {
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent activeDrawingTask activeTool />)
      expect(wrapper.find(InteractionLayer)).to.have.lengthOf(1)
    })
  })

  describe('with annotations from previous drawing tasks', function () {
    it('should render DrawingToolMarks', function () {
      const drawingAnnotations = [{
        task: 'T2',
        value: [
          { id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200 }
        ]
      }, {
        task: 'T3',
        value: [
          { id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200 }
        ]
      }]
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent drawingAnnotations={drawingAnnotations} />)
      expect(wrapper.find(DrawingToolMarks)).to.have.lengthOf(2)
    })
  })
})
