import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import InteractionLayer, { StyledRect } from './InteractionLayer'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'
import DrawingTask from '@plugins/tasks/DrawingTask'
import { Line, Point } from '@plugins/drawingTools/components'

describe('Component > InteractionLayer', function () {
  let wrapper
  let activeTool
  const mockMark = {
    initialDrag: sinon.stub(),
    initialPosition: sinon.stub(),
    setCoordinates: sinon.stub(),
    setSubTaskVisibility: sinon.stub()
  }
  const mockSVGPoint = {
    x: 100,
    y: 200,
    matrixTransform: sinon.stub().callsFake(() => ({
      x: 100,
      y: 200
    }))
  }
  const mockScreenCTM = {
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 1,
    f: 1,
    inverse: () => ({
      a: 1,
      b: 1,
      c: 1,
      d: 1,
      e: 1,
      f: 1
    })
  }
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.createSVGPoint = () => mockSVGPoint
  const getScreenCTM = () => mockScreenCTM

  describe('when enabled', function () {
    beforeEach(function () {
      const mockDrawingTask = DrawingTask.TaskModel.create({
        activeToolIndex: 0,
        instruction: 'draw a mark',
        taskKey: 'T0',
        tools: [
          {
            marks: {},
            max: 2,
            toolComponent: Point,
            type: 'point'
          },
          {
            marks: {},
            toolComponent: Line,
            type: 'line'
          }
        ],
        type: 'drawing'
      })
      const setActiveMarkStub = sinon.stub().callsFake(() => mockMark)
      activeTool = mockDrawingTask.activeTool
      sinon.stub(activeTool, 'createMark').callsFake(() => mockMark)
      sinon.stub(activeTool, 'handlePointerDown').callsFake(() => mockMark)
      wrapper = shallow(
        <InteractionLayer
          activeMark={mockMark}
          activeTool={activeTool}
          frame={2}
          setActiveMark={setActiveMarkStub}
          height={400}
          width={600}
        />
      )
    })

    afterEach(function () {
      mockMark.initialDrag.resetHistory()
      mockMark.initialPosition.resetHistory()
      mockMark.setCoordinates.resetHistory()
      activeTool.createMark.restore()
      activeTool.handlePointerDown.restore()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a transparent rect', function () {
      const rect = wrapper.find(StyledRect)
      expect(rect.exists()).to.be.true()
      expect(rect.prop('fill')).to.equal('transparent')
    })

    it('should render TranscribedLines', function () {
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(1)
    })

    it('should render SubTaskPopup', function () {
      expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
    })

    describe('on pointer events', function () {
      let mockedContext
      before(function () {
        mockedContext = sinon.stub(React, 'useContext').callsFake(() => { return { svg, getScreenCTM } })
      })

      after(function () {
        mockedContext.restore()
      })

      it('should create a mark on pointer down', function () {
        const fakeEvent = {
          pointerId: 'fakePointer',
          type: 'pointerdown',
          target: {
            setPointerCapture: sinon.stub(),
            releasePointerCapture: sinon.stub()
          }
        }
        wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
        expect(activeTool.createMark).to.have.been.calledOnce()
      })

      it('should create a mark with current frame', function () {
        const fakeEvent = {
          pointerId: 'fakePointer',
          type: 'pointerdown',
          target: {
            setPointerCapture: sinon.stub(),
            releasePointerCapture: sinon.stub()
          }
        }
        wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
        const createMarkArgs = activeTool.createMark.args[0][0]
        expect(createMarkArgs.frame).to.equal(2)
      })

      it('should place a new mark on pointer down', function () {
        const fakeEvent = {
          pointerId: 'fakePointer',
          type: 'pointerdown',
          target: {
            setPointerCapture: sinon.stub(),
            releasePointerCapture: sinon.stub()
          }
        }
        wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
        expect(mockMark.initialPosition).to.have.been.calledOnce()
      })

      it('should drag the new mark on pointer down + move', function () {
        const fakeEvent = {
          pointerId: 'fakePointer',
          type: 'pointer',
          target: {
            setPointerCapture: sinon.stub(),
            releasePointerCapture: sinon.stub()
          }
        }
        wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
        wrapper.simulate('pointermove', fakeEvent)
        expect(mockMark.initialDrag).to.have.been.calledOnce()
      })

      it('should capture the pointer on pointer down + move', function () {
        const fakeEvent = {
          pointerId: 'fakePointer',
          type: 'pointer',
          target: {
            setPointerCapture: sinon.stub(),
            releasePointerCapture: sinon.stub()
          }
        }
        wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
        wrapper.simulate('pointermove', fakeEvent)
        expect(fakeEvent.target.setPointerCapture.withArgs('fakePointer')).to.have.been.calledOnce()
      })

      describe('onPointerDown when creating', function () {
        it('should call the handlePointerDown function', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointer',
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
          wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
          expect(activeTool.handlePointerDown).to.have.been.calledOnce()
        })
      })
    })
  })

  describe('when disabled', function () {
    beforeEach(function () {
      const mockDrawingTask = DrawingTask.TaskModel.create({
        activeToolIndex: 0,
        instruction: 'draw a mark',
        taskKey: 'T0',
        tools: [
          {
            marks: {},
            max: 2,
            toolComponent: Point,
            type: 'point'
          },
          {
            marks: {},
            toolComponent: Line,
            type: 'line'
          }
        ],
        type: 'drawing'
      })
      activeTool = mockDrawingTask.activeTool
      sinon.stub(activeTool, 'createMark').callsFake(() => mockMark)
      activeTool.createMark.resetHistory()
      wrapper = shallow(
          <InteractionLayer
            activeTool={activeTool}
            disabled
            height={400}
            width={600}
          />, {
          wrappingComponent: SVGContext.Provider,
          wrappingComponentProps: { value: { svg, getScreenCTM } }
        }
      )
    })

    afterEach(function () {
      mockMark.initialDrag.resetHistory()
      mockMark.initialPosition.resetHistory()
      mockMark.setCoordinates.resetHistory()
      activeTool.createMark.restore()
    })

    it('should not create a mark on pointer down', function () {
      const fakeEvent = {
        pointerId: 'fakePointer',
        type: 'pointer',
        target: {
          setPointerCapture: sinon.stub(),
          releasePointerCapture: sinon.stub()
        }
      }
      wrapper.find(StyledRect).simulate('pointerdown', fakeEvent)
      expect(activeTool.createMark).to.have.not.been.called()
    })
  })
})
