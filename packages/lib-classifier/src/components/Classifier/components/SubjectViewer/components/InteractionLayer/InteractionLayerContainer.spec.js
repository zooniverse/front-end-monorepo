import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'

const activeStepTasksWithDrawing = [
  {
    instruction: 'Draw a point and line',
    taskKey: 'T0',
    tools: [
      { type: 'point' },
      { type: 'line' }
    ],
    type: 'drawing'
  }
]

const activeStepTasksWithSingleChoice = [
  {
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: true,
    taskKey: 'T0',
    type: 'single'
  }
]

describe('Component > InteractionLayerContainer', function () {
  it('should render without crashing', function () {
    shallow(<InteractionLayerContainer.wrappedComponent />)
  })

  it('should render an InteractionLayer', function () {
    const wrapper = shallow(<InteractionLayerContainer.wrappedComponent />)
    expect(wrapper.find('InteractionLayer')).to.have.lengthOf(1)
  })

  describe('with active workflow step including a drawing task', function () {
    it('should render a DrawingContainer', function () {
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent activeStepTasks={activeStepTasksWithDrawing} />)
      expect(wrapper.find('inject-DrawingContainer')).to.have.lengthOf(1)
    })
  })

  describe('with active workflow step excluding a drawing task', function () {
    it('should not render a DrawingContainer', function () {
      const wrapper = shallow(<InteractionLayerContainer.wrappedComponent activeStepTasks={activeStepTasksWithSingleChoice} />)
      expect(wrapper.find('inject-DrawingContainer')).to.have.lengthOf(0)
    })
  })
})
