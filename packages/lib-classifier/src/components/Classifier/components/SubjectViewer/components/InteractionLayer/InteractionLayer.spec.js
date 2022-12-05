import { shallow } from 'enzyme'
import sinon from 'sinon'

import InteractionLayer, { DrawingCanvas } from './InteractionLayer'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'
import DrawingTask from '@plugins/tasks/drawing'
import {
  Line,
  Point,
  TranscriptionLine
} from '@plugins/drawingTools/components'
import { expect } from 'chai'

describe('Component > InteractionLayer', function () {
  let wrapper
  let activeTool
  const mockMark = {
    finish: sinon.stub(),
    initialDrag: sinon.stub(),
    initialPosition: sinon.stub(),
    setCoordinates: sinon.stub(),
    setSubTaskVisibility: sinon.stub(),
    setVideoTime: sinon.stub()
  }

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
      const annotation = mockDrawingTask.createAnnotation()
      const setActiveMarkStub = sinon.stub().callsFake(() => mockMark)
      activeTool = mockDrawingTask.activeTool
      wrapper = shallow(
        <InteractionLayer
          activeMark={mockMark}
          activeTool={activeTool}
          annotation={annotation}
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
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a transparent rect', function () {
      const rect = wrapper.find(DrawingCanvas)
      expect(rect.exists()).to.be.true()
      expect(rect.prop('fill')).to.equal('transparent')
    })

    it('should render TranscribedLines', function () {
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(1)
    })

    it('should render SubTaskPopup', function () {
      expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
    })

    describe('pointer events', function () {
      describe('onPointerDown', function () {
        it('should cancel the event', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointerdown',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          expect(fakeEvent.preventDefault).to.have.been.calledOnce()
          expect(fakeEvent.stopPropagation).to.have.been.calledOnce()
        })

        it('should create a mark', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointerdown',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          expect(activeTool.marks.size).to.equal(1)
        })

        it('should create a mark with current frame', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointerdown',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          const mark = activeTool.marks.values().next().value
          expect(mark.frame).to.equal(2)
        })

        it('should place a new mark', function () {
          const fakeEvent = {
            clientX: 10,
            clientY: 20,
            pointerId: 'fakePointer',
            type: 'pointerdown',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          const mark = activeTool.marks.values().next().value
          expect(mark.x).to.equal(10)
          expect(mark.y).to.equal(20)
        })

        it('should drag the new mark on pointer down + move', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointer',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          wrapper.find(DrawingCanvas).simulate('pointermove', fakeEvent)
          expect(mockMark.initialDrag).to.have.been.calledOnce()
        })

        it('should cancel the event on pointer down + move', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointer',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          wrapper.find(DrawingCanvas).simulate('pointermove', fakeEvent)
          expect(fakeEvent.preventDefault).to.have.been.calledTwice()
          expect(fakeEvent.stopPropagation).to.have.been.calledTwice()
        })

        it('should capture the pointer', function () {
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointer',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          wrapper.simulate('pointermove', fakeEvent)
          expect(
            fakeEvent.target.setPointerCapture.withArgs('fakePointer')
          ).to.have.been.calledOnce()
        })

        describe('with a TranscriptionLine mark already in progress', function () {
          it('should finish the line', function () {
            const mockDrawingTask = DrawingTask.TaskModel.create({
              activeToolIndex: 0,
              instruction: 'draw a mark',
              taskKey: 'T0',
              tools: [
                {
                  marks: {},
                  max: 2,
                  toolComponent: TranscriptionLine,
                  type: 'transcriptionLine'
                }
              ],
              type: 'drawing'
            })
            activeTool = mockDrawingTask.activeTool
            const annotation = mockDrawingTask.createAnnotation()

            wrapper = shallow(
              <InteractionLayer
                activeMark={mockMark}
                activeTool={activeTool}
                annotation={annotation}
                frame={2}
                height={400}
                width={600}
              />
            )

            const fakeEvent = {
              pointerId: 'fakePointer',
              stopPropagation: sinon.stub(),
              type: 'pointer',
              preventDefault: sinon.stub(),
              stopPropagation: sinon.stub(),
              target: {
                setPointerCapture: sinon.stub(),
                releasePointerCapture: sinon.stub()
              }
            }
            wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
            const mark = activeTool.marks.values().next().value
            expect(mark.finished).to.be.false()
            wrapper.setProps({ activeMark: mark })
            wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
            expect(mark.finished).to.be.true()
          })
        })
      })
    })

    describe('onPointerUp', function () {
      it('should cancel the event', function () {
        const fakeEvent = {
          pointerId: 'fakePointer',
          type: 'pointer',
          preventDefault: sinon.stub(),
          stopPropagation: sinon.stub(),
          target: {
            setPointerCapture: sinon.stub(),
            releasePointerCapture: sinon.stub()
          }
        }
        wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
        wrapper.find(DrawingCanvas).simulate('pointerup', fakeEvent)
        expect(fakeEvent.preventDefault).to.have.been.calledTwice()
        expect(fakeEvent.stopPropagation).to.have.been.calledTwice()
      })

      describe('when the mark is valid', function () {
        it('should set the mark to finished', function () {
          mockMark.finish.resetHistory()
          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointer',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            }
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          wrapper.find(DrawingCanvas).simulate('pointerup', fakeEvent)
          expect(mockMark.finish).to.have.been.calledOnce()
        })
      })

      describe('when the mark is invalid', function () {
        it('should delete the mark', function () {
          const mockMark = {
            finished: true,
            isValid: false,
            finish: sinon.stub(),
            initialDrag: sinon.stub(),
            initialPosition: sinon.stub(),
            setCoordinates: sinon.stub(),
            setSubTaskVisibility: sinon.stub(),
            setVideoTime: sinon.stub()
          }
          const mockDrawingTask = DrawingTask.TaskModel.create({
            activeToolIndex: 0,
            instruction: 'draw a mark',
            taskKey: 'T0',
            tools: [
              {
                marks: {},
                max: 2,
                toolComponent: TranscriptionLine,
                type: 'transcriptionLine'
              }
            ],
            type: 'drawing'
          })
          activeTool = mockDrawingTask.activeTool
          const annotation = mockDrawingTask.createAnnotation()
          const setActiveMarkStub = sinon.stub()

          wrapper = shallow(
            <InteractionLayer
              activeMark={mockMark}
              activeTool={activeTool}
              annotation={annotation}
              frame={2}
              height={400}
              setActiveMark={setActiveMarkStub}
              width={600}
            />
          )

          const fakeEvent = {
            pointerId: 'fakePointer',
            type: 'pointer',
            preventDefault: sinon.stub(),
            stopPropagation: sinon.stub(),
            target: {
              setPointerCapture: sinon.stub(),
              releasePointerCapture: sinon.stub()
            },
            stopPropagation: sinon.stub()
          }
          wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
          setActiveMarkStub.resetHistory()
          wrapper.find(DrawingCanvas).simulate('pointerup', fakeEvent)
          expect(setActiveMarkStub).to.have.been.calledOnceWith(undefined)
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
      wrapper = shallow(
        <InteractionLayer
          activeTool={activeTool}
          disabled
          height={400}
          width={600}
        />
      )
    })

    afterEach(function () {
      mockMark.initialDrag.resetHistory()
      mockMark.initialPosition.resetHistory()
      mockMark.setCoordinates.resetHistory()
    })

    it('should not cancel the event', function () {
      const fakeEvent = {
        pointerId: 'fakePointer',
        type: 'pointer',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub(),
        target: {
          setPointerCapture: sinon.stub(),
          releasePointerCapture: sinon.stub()
        }
      }
      wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
      expect(fakeEvent.preventDefault).to.have.not.been.called()
      expect(fakeEvent.stopPropagation).to.have.not.been.called()
    })

    it('should not create a mark on pointer down', function () {
      const fakeEvent = {
        pointerId: 'fakePointer',
        type: 'pointer',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub(),
        target: {
          setPointerCapture: sinon.stub(),
          releasePointerCapture: sinon.stub()
        }
      }
      wrapper.find(DrawingCanvas).simulate('pointerdown', fakeEvent)
      expect(activeTool.marks).to.be.empty()
    })
  })
})
