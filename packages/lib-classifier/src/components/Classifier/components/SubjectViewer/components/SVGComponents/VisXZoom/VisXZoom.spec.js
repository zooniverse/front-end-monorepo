import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import sinon from 'sinon'
import { Zoom } from '@visx/zoom'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'
import {
  lightCurveMockData
} from '../../ScatterPlotViewer/helpers/mockData'
import VisXZoom from './VisXZoom'
import ZoomEventLayer from '../ZoomEventLayer'

describe('Component > VisXZoom', function () {
  function StubComponent ({ children }) {
    return (
      <svg height='100px' width='100px'>
        <rect fill='#fff' />
        {children}
      </svg>
    )
  }

  const mockData = lightCurveMockData.kepler

  const width = 1000
  const height = 1000

  const zoomInEventMock = {
    clientX: 50,
    clientY: 50,
    deltaY: -1,
    preventDefault: sinon.spy()
  }

  const store = mockStore()

  it('should render without crashing', function () {
    const wrapper = mount(
      <Grommet theme={zooTheme}>
        <Provider classifierStore={store}>
          <VisXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
          />
        </Provider>
      </Grommet>
    )
    expect(wrapper).to.be.ok()
  })

  describe('instantiation', function () {
    it('should call props.setOnZoom callback', function () {
      const setOnZoomSpy = sinon.spy()
      mount(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <VisXZoom
              data={mockData}
              height={height}
              width={width}
              setOnZoom={setOnZoomSpy}
              zoomingComponent={StubComponent}
            />
          </Provider>
        </Grommet>
      )
      expect(setOnZoomSpy).to.have.been.calledOnce()
    })
  })

  describe('VisX Zoom wrapping component', function () {
    it('should set scale min and max using props', function () {
      const zoomConfiguration = {
        direction: 'both',
        minZoom: -10,
        maxZoom: 100,
        zoomInValue: 1.2,
        zoomOutValue: 0.8
      }

      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <VisXZoom
              data={mockData}
              height={height}
              width={width}
              zoomingComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
            />
          </Provider>
        </Grommet>
      )

      expect(wrapper.find(Zoom).props().scaleXMin).to.equal(zoomConfiguration.minZoom)
      expect(wrapper.find(Zoom).props().scaleXMax).to.equal(zoomConfiguration.maxZoom)
      expect(wrapper.find(Zoom).props().scaleYMin).to.equal(zoomConfiguration.minZoom)
      expect(wrapper.find(Zoom).props().scaleYMax).to.equal(zoomConfiguration.maxZoom)
    })

    it('should set the height and width using props', function () {
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <VisXZoom
              data={mockData}
              height={height}
              width={width}
              zoomingComponent={StubComponent}
            />
          </Provider>
        </Grommet>
      )
      expect(wrapper.find(Zoom).props().height).to.equal(height)
      expect(wrapper.find(Zoom).props().width).to.equal(width)
    })

    it('should set the left and top position using props', function () {
      function StoreAndGrommet({ children }) {
        return (
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              {children}
            </Provider>
          </Grommet>
        )
      }

      const wrapper = mount(
          <VisXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
          />,
          {
            wrappingComponent: StoreAndGrommet
          }
        )
        expect(wrapper.find(Zoom).props().left).to.equal(0)
        expect(wrapper.find(Zoom).props().top).to.equal(0)
        wrapper.setProps({ left: 10, top: 10 })
        expect(wrapper.find(Zoom).props().left).to.equal(10)
        expect(wrapper.find(Zoom).props().top).to.equal(10)
    })

    it('should pass along the constrain function set in props', function () {
      const constrainSpy = sinon.spy()
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <VisXZoom
              constrain={constrainSpy}
              data={mockData}
              height={height}
              width={width}
              zoomingComponent={StubComponent}
            />
          </Provider>
        </Grommet>
      )
      expect(wrapper.find(Zoom).props().constrain).to.equal(constrainSpy)
    })
  })

  describe('zooming component', function () {
    it('should render the zooming component', function () {
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <VisXZoom
              data={mockData}
              height={height}
              width={width}
              zoomingComponent={StubComponent}
            />
          </Provider>
        </Grommet>
      )

      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('should pass the Zoom child function return value transformMatrix as a prop', function () {
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <VisXZoom
              data={mockData}
              height={height}
              width={width}
              zoomingComponent={StubComponent}
            />
          </Provider>
        </Grommet>
      )

      const { transformMatrix } = wrapper.find(StubComponent).props()
      const expectedTransform = {
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0
      }

      expect(transformMatrix).to.deep.equal(expectedTransform)
    })

    describe('ZoomEventLayer', function () {
      it('should render ZoomEventLayer as a child', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
              />
            </Provider>
          </Grommet>
        )

        expect(wrapper.find(StubComponent).find(ZoomEventLayer)).to.have.lengthOf(1)
      })

      it('should set the height and width by props', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
              />
            </Provider>
          </Grommet>
        )

        const zoomEventLayer = wrapper.find(StubComponent).find(ZoomEventLayer)
        expect(zoomEventLayer.props().height).to.equal(height)
        expect(zoomEventLayer.props().width).to.equal(width)
      })
    })
  })

  describe('zooming', function () {
    function testNoZoom ({ currentTransformMatrix, previousTransformMatrix }) {
      expect(currentTransformMatrix).to.deep.equal(previousTransformMatrix)
    }

    describe('when zooming is disabled', function () {
      function testEventPrevention ({ wrapper, type, event }) {
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        wrapper.find(ZoomEventLayer).simulate(type, event)
        if (event) expect(event.preventDefault).to.have.been.called()
        const currentTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
        testNoZoom(currentTransformMatrix, initialTransformMatrix)
      }

      it('should not scale the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
              />
            </Provider>
          </Grommet>
        )

        testEventPrevention({ wrapper, type: 'wheel' })
      })

      it('should not scale the transform matrix on double click', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
              />
            </Provider>
          </Grommet>
        )
        testEventPrevention({ wrapper, type: 'dblclick', event: { preventDefault: sinon.spy() } })
      })

      it('should not scale the transform matrix on key down', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
              />
            </Provider>
          </Grommet>
        )
        testEventPrevention({ wrapper, type: 'keydown' })
      })

      it('should not scale the transform matrix when zoom callback is called', function () {
        let zoomCallback

        function setZoomCallback (callback) {
          zoomCallback = sinon.stub().callsFake(type => {
            return callback(type)
          })
        }

        function testZoomCallback ({ wrapper, zoomType }) {
          const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
          const zoomValues = {
            'zoomin': 1.2,
            'zoomout': 0.8,
            'zoomto': 1
          }
          const zoomValue = zoomValues[zoomType]

          // if (zoomType === 'zoomin') {
//             expect(transformMatrix).to.deep.equal(initialTransformMatrix)
//           } else {
//             // currently zoomed in to test zoom out and reset
//             expect(transformMatrix).to.not.deep.equal(initialTransformMatrix)
//           }

          const previousTransformMatrix = (zoomType !== 'zoomto') ? transformMatrix : initialTransformMatrix
          zoomCallback(zoomType)
          wrapper.update()
          const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          testTransformations({
            currentTransformMatrix: zoomedTransformMatrix,
            previousTransformMatrix,
            zoomValue
          })
          zoomCallback.resetHistory()
        }

        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                setOnZoom={setZoomCallback}
                zoomingComponent={StubComponent}
              />
            </Provider>
          </Grommet>
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        const zoomTypes = ['zoomin', 'zoomout', 'zoomto']

        zoomTypes.forEach((type) => {
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
          zoomCallback(type)
          const transformMatrixAfterZoomInCall = wrapper.find(StubComponent).props().transformMatrix
          testNoZoom({
            currentTransformMatrix: transformMatrixAfterZoomInCall,
            previousTransformMatrix: initialTransformMatrix
          })
        })
        zoomCallback.resetHistory()
      })
    })

    describe('when zooming is enabled', function () {
      function testTransformations ({ currentTransformMatrix, previousTransformMatrix, zoomValue }) {
        expect(currentTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX * zoomValue)
        expect(currentTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY * zoomValue)
      }

      function testEvent ({ wrapper, type, event, previousTransformMatrix }) {
        const eventMock = event || {
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }
        // these are defaults set in the VisXZoom component
        const baseZoomValue = (eventMock.deltaY < 0) ? 1.2 : 0.8
        const wheelZoomValue = (eventMock.deltaY < 0) ? 1.1 : 0.9
        const zoomValue = (type === 'wheel') ? wheelZoomValue : baseZoomValue
        wrapper.find(ZoomEventLayer).simulate(type, eventMock)
        const currentTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
        testTransformations({ currentTransformMatrix, previousTransformMatrix, zoomValue })
      }

      it('should define overflow styles on the document body on pointer enter and on pointer leave', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )

        expect(document.body.style.overflow).to.be.empty()
        wrapper.find(ZoomEventLayer).simulate('pointerenter')
        expect(document.body.style.overflow).to.equal('hidden')
        wrapper.find(ZoomEventLayer).simulate('pointerleave')
        expect(document.body.style.overflow).to.be.empty()
      })

      it('should scale in the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'wheel', previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale out the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        const zoomInEvent = {
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
        const zoomedInTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

        const zoomOutEvent = {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        }

        testEvent({ wrapper, type: 'wheel', event: zoomOutEvent, previousTransformMatrix: zoomedInTransformMatrix })
      })

      it('should scale in the transform matrix on double click', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'dblclick', previousTransformMatrix: initialTransformMatrix })
      })

      /*
        These tests should be testing the wrapped component, which uses useKeyZoom to handle
        keyboard events.
      */
      xit('should scale in the transform matrix on key down with =', function () {
        const keyDownEvent = {
          key: '=',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                onKeyDown={sinon.stub()}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix: initialTransformMatrix })
      })

      xit('should scale in the transform matrix on key down with +', function () {
        const keyDownEvent = {
          key: '+',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                onKeyDown={sinon.stub()}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix: initialTransformMatrix })
      })

      xit('should scale out the transform matrix on key down with -', function () {
        const zoomInEvent = {
          key: '+',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }
        const keyDownEvent = {
          key: '-',
          clientX: 50,
          clientY: 50,
          deltaY: 1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                onKeyDown={sinon.stub()}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first so we don't hit the minimum constraint
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        const previousTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix })
      })

      xit('should scale out the transform matrix on key down with _', function () {
        const zoomInEvent = {
          key: '+',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }
        const keyDownEvent = {
          key: '_',
          clientX: 50,
          clientY: 50,
          deltaY: 1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                onKeyDown={sinon.stub()}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first so we don't hit the minimum constraint
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        const previousTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix })
      })

      describe('when zoom callback is called', function () {
        let zoomCallback

        function setZoomCallback (callback) {
          zoomCallback = sinon.stub().callsFake(type => {
            return callback(type)
          })
        }

        function testZoomCallback ({ wrapper, zoomType }) {
          const { initialTransformMatrix, transformMatrix } = wrapper.find(StubComponent).props()
          const zoomValues = {
            'zoomin': 1.2,
            'zoomout': 0.8,
            'zoomto': 1
          }
          const zoomValue = zoomValues[zoomType]

          // if (zoomType === 'zoomin') {
//             expect(transformMatrix).to.deep.equal(initialTransformMatrix)
//           } else {
//             // currently zoomed in to test zoom out and reset
//             expect(transformMatrix).to.not.deep.equal(initialTransformMatrix)
//           }

          const previousTransformMatrix = (zoomType !== 'zoomto') ? transformMatrix : initialTransformMatrix
          zoomCallback(zoomType)
          wrapper.update()
          const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          testTransformations({
            currentTransformMatrix: zoomedTransformMatrix,
            previousTransformMatrix,
            zoomValue
          })
          zoomCallback.resetHistory()
        }

        it('should scale transform matrix when zooming in', function () {
          const wrapper = mount(
            <Grommet theme={zooTheme}>
              <Provider classifierStore={store}>
                <VisXZoom
                  data={mockData}
                  height={height}
                  width={width}
                  setOnZoom={setZoomCallback}
                  zoomingComponent={StubComponent}
                  zooming
                />
              </Provider>
            </Grommet>
          )

          testZoomCallback({ wrapper, zoomType: 'zoomin' })
        })

        it('should scale transform matrix when zooming out', function () {
          const wrapper = mount(
            <Grommet theme={zooTheme}>
              <Provider classifierStore={store}>
                <VisXZoom
                  data={mockData}
                  height={height}
                  width={width}
                  setOnZoom={setZoomCallback}
                  zoomingComponent={StubComponent}
                  zooming
                />
              </Provider>
            </Grommet>
          )
          // zoom in first
          zoomCallback('zoomin')
          wrapper.update()
          zoomCallback('zoomin')
          wrapper.update()

          testZoomCallback({ wrapper, zoomType: 'zoomout' })
        })

        it('should scale transform matrix when resetting zoom', function () {
          const wrapper = mount(
            <Grommet theme={zooTheme}>
              <Provider classifierStore={store}>
                <VisXZoom
                  data={mockData}
                  height={height}
                  width={width}
                  setOnZoom={setZoomCallback}
                  zoomingComponent={StubComponent}
                  zooming
                />
              </Provider>
            </Grommet>
          )

          // zooming in first
          zoomCallback('zoomin')
          testZoomCallback({ wrapper, zoomType: 'zoomto' })
        })
      })
    })
  })

  describe('panning', function () {
    describe('when panning is disabled', function () {
      it('should not translate the SVG position', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
          </Provider>
          </Grommet>
        )

        const events = ['keydown', 'mousedown', 'mouseup', 'mousemove', 'mouseleave']
        const eventMock = {
          preventDefault: sinon.spy()
        }

        events.forEach((event) => {
          wrapper.find(ZoomEventLayer).simulate(event, eventMock)
          const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        })
      })
    })

    describe('when panning is enabled', function () {
      it('should translate the SVG position using mouse events', function () {
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                panning
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const eventLayer = wrapper.find(ZoomEventLayer)

        const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // We enable zooming and zoom in a bit so we don't run into the data boundary constraints
        eventLayer.simulate('dblclick', {
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        })
        const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
        // Now to simulate the panning
        // visx switched to typescript and are type checking the event
        // We have to add `nativeEvent: new Event('test)` to make sure these test pass the type check
        eventLayer.simulate('pointerdown', {
          clientX: 55,
          clientY: 55,
          nativeEvent: new Event('test')
        })
        eventLayer.simulate('pointermove', {
          clientX: 60,
          clientY: 60,
          nativeEvent: new Event('test')
        })
        eventLayer.simulate('pointerup', {
          nativeEvent: new Event('test')
        })

        const pannedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
        expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
        expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
        expect(pannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX + 5)
        expect(pannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY + 5)
      })

      describe('keydown', function () {
        let wrapper
        beforeEach(function () {
          wrapper = mount(
            <Grommet theme={zooTheme}>
              <Provider classifierStore={store}>
                <VisXZoom
                  data={mockData}
                  panning
                  height={height}
                  onKeyDown={sinon.stub()}
                  width={width}
                  zoomingComponent={StubComponent}
                  zooming
                />
              </Provider>
            </Grommet>
          )
        })

        xit('should translate the SVG position using ArrowRight', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          // Now to simulate the panning
          eventLayer.simulate('keydown', {
            key: 'ArrowRight'
          })
          const rightPannedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          expect(rightPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(rightPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(rightPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX - 20)
          expect(rightPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY)
        })

        xit('should translate the SVG position using ArrowDown', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

          eventLayer.simulate('keydown', {
            key: 'ArrowDown'
          })
          const downPannedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          expect(downPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(downPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(downPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX)
          expect(downPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY - 20)
        })

        xit('should translate the SVG position using ArrowLeft', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

          eventLayer.simulate('keydown', {
            key: 'ArrowLeft'
          })
          const leftPannedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          expect(leftPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(leftPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(leftPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX + 20)
          expect(leftPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY)
        })

        xit('should translate the SVG position using ArrowUp', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

          eventLayer.simulate('keydown', {
            key: 'ArrowUp',
          })

          const upPannedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
          expect(upPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(upPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(upPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX)
          expect(upPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY + 20)
        })
      })
    })
  })

  describe('data boundary constraints', function () {
    describe('when zooming', function () {
      it('should not zoom in beyond maximum zoom configuration', function () {
        const zoomConfiguration = {
          direction: 'both',
          minZoom: 1,
          maxZoom: 5,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                panning
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // multiplying the scale 1.2 nine times is 5.159780352,
        // so the eighth double click event is the last one before the max zoom boundary is hit.
        let eightTimesZoomedMatrix
        for (let i = 0; i < 10; i++) {
          wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
          if (i === 8) { // eighth event
            eightTimesZoomedMatrix = wrapper.find(StubComponent).props().transformMatrix
          }
        }
        const zoomedTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

        expect(zoomedTransformMatrix).to.not.deep.equal(transformMatrix)
        expect(zoomedTransformMatrix.scaleX).to.be.below(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.scaleY).to.be.below(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.scaleX).to.equal(eightTimesZoomedMatrix.scaleX)
        expect(zoomedTransformMatrix.scaleY).to.equal(eightTimesZoomedMatrix.scaleY)
        expect(zoomedTransformMatrix.translateX).to.equal(eightTimesZoomedMatrix.translateX)
        expect(zoomedTransformMatrix.translateY).to.equal(eightTimesZoomedMatrix.translateY)
      })

      it('should not zoom out beyond the minimum zoom configuration and reset the zoom', function () {
        const zoomConfiguration = {
          direction: 'both',
          minZoom: 1,
          maxZoom: 5,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
        const wrapper = mount(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={store}>
              <VisXZoom
                data={mockData}
                panning
                height={height}
                width={width}
                zoomingComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming
              />
            </Provider>
          </Grommet>
        )
        const { transformMatrix, initialTransformMatrix } = wrapper.find(StubComponent).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zoom in first
        wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
        wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
        expect(zoomedInTransformMatrix).to.not.deep.equal(initialTransformMatrix)

        // zoom out by mouse wheel until we stop at the minimum zoom
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        const firstZoomedOutTransformMatrix = wrapper.find(StubComponent).props().transformMatrix
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        const secondZoomedOutTransformMatrix = wrapper.find(StubComponent).props().transformMatrix

        expect(secondZoomedOutTransformMatrix.scaleX).to.be.above(zoomConfiguration.minZoom)
        expect(secondZoomedOutTransformMatrix.scaleY).to.be.above(zoomConfiguration.minZoom)
        expect(secondZoomedOutTransformMatrix).to.not.deep.equal(zoomedInTransformMatrix)
        // The default visx behavior is to return the previous transform matrix
        expect(secondZoomedOutTransformMatrix).to.deep.equal(firstZoomedOutTransformMatrix)
      })
    })
  })
})
