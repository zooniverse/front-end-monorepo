import { shallow } from 'enzyme'
import React from 'react'
import PreviousMarks from './PreviousMarks'
import DrawingToolMarks from '../DrawingToolMarks'
import SHOWN_MARKS from '@helpers/shownMarks'

describe('Component > PreviousMarks', function () {
  const interactionTaskAnnotations = [{
    task: 'T2',
    value: [
      { id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200 }
    ]
  }, {
    task: 'T3',
    value: [
      { id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200 },
      { id: 'line2', frame: 0, toolIndex: 0, x1: 200, y1: 300, x2: 250, y2: 300 },
      { id: 'line3', frame: 1, toolIndex: 0, x1: 150, y1: 250, x2: 100, y2: 250 },
      { id: 'line4', frame: 1, toolIndex: 0, x1: 250, y1: 350, x2: 200, y2: 350 }
    ]
  }]

  it('should render without crashing', function () {
    const wrapper = shallow(<PreviousMarks />)
    expect(wrapper).to.be.ok()
  })

  it('should pass scale along as a prop to each DrawingToolMarks component', function ()  {
    const wrapper = shallow(<PreviousMarks interactionTaskAnnotations={interactionTaskAnnotations} scale={2} />)
    expect(wrapper.find(DrawingToolMarks).first().props().scale).to.equal(2)
    expect(wrapper.find(DrawingToolMarks).last().props().scale).to.equal(2)
  })

  describe('when there are no interaction task annotations', function () {
    it('should render null', function () {
      const wrapper = shallow(<PreviousMarks />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('when there are interaction task annotations', function () {
    it('should render a DrawingToolMarks for each annotation', function ()  {
      const wrapper = shallow(<PreviousMarks interactionTaskAnnotations={interactionTaskAnnotations} />)
      expect(wrapper.find(DrawingToolMarks)).to.have.lengthOf(2)
      expect(wrapper.find(DrawingToolMarks).first().key()).to.equal(interactionTaskAnnotations[0].task)
      expect(wrapper.find(DrawingToolMarks).last().key()).to.equal(interactionTaskAnnotations[1].task)
    })

    it('should pass along the correct number of marks per task by frame', function () {
      const wrapper = shallow(<PreviousMarks interactionTaskAnnotations={interactionTaskAnnotations} />)
      let firstAnnotationMarks = wrapper.find(DrawingToolMarks).first().props().marks
      let secondAnnotationMarks = wrapper.find(DrawingToolMarks).last().props().marks
      expect(firstAnnotationMarks).to.have.lengthOf(1)
      expect(firstAnnotationMarks[0]).to.deep.equal(interactionTaskAnnotations[0].value[0])
      expect(secondAnnotationMarks).to.have.lengthOf(2)
      expect(secondAnnotationMarks[0]).to.deep.equal(interactionTaskAnnotations[1].value[0])
      expect(secondAnnotationMarks[1]).to.deep.equal(interactionTaskAnnotations[1].value[1])
      wrapper.setProps({ frame: 1 })
      firstAnnotationMarks = wrapper.find(DrawingToolMarks).first().props().marks
      secondAnnotationMarks = wrapper.find(DrawingToolMarks).last().props().marks
      expect(firstAnnotationMarks).to.have.lengthOf(0)
      expect(secondAnnotationMarks).to.have.lengthOf(2)
      expect(secondAnnotationMarks[0]).to.deep.equal(interactionTaskAnnotations[1].value[2])
      expect(secondAnnotationMarks[1]).to.deep.equal(interactionTaskAnnotations[1].value[3])
    })
  })

  describe('when shown marks is USER', function () {
    it('should not render DrawingToolMarks if there are not annotations', function () {
      const wrapper = shallow(<PreviousMarks shownMarks={SHOWN_MARKS.USER} />)
      expect(wrapper.html()).to.be.null()
    })

    it('should render DrawingToolMarks if there are also annotations', function () {
      const wrapper = shallow(<PreviousMarks interactionTaskAnnotations={interactionTaskAnnotations} shownMarks={SHOWN_MARKS.USER} />)
      expect(wrapper.find(DrawingToolMarks)).to.have.lengthOf(2)
    })
  })

  describe('when shown marks is NONE', function () {
    it('should render null', function ()  {
      const wrapper = shallow(<PreviousMarks shownMarks={SHOWN_MARKS.NONE} />)
      expect(wrapper.html()).to.be.null()
    })
  })
})