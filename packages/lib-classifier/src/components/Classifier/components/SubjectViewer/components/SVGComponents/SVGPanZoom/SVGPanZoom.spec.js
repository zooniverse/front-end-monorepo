import { mount } from 'enzyme'
import sinon from 'sinon'
import SVGPanZoom from './SVGPanZoom'

describe('Components > SVGPanZoom', function () {
  let wrapper
  let onDrag
  let onPan
  let onZoom
  const img = {
    getBoundingClientRect() {
      return {
        height: 100,
        width: 200
      }
    }
  }
  const src = 'https://example.com/image.png'

  beforeEach(function () {
    wrapper = mount(
      <SVGPanZoom
        img={img}
        naturalHeight={200}
        naturalWidth={400}
        setOnDrag={callback => { onDrag = callback }}
        setOnPan={callback => { onPan = callback }}
        setOnZoom={callback => { onZoom = callback }}
        src={src}
      >
        <svg />
      </SVGPanZoom>
    )
  })
  
  it('should enable zoom in', function () {
    onZoom('zoomin', 1)
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
  })

  it('should enable zoom out', function () {
    onZoom('zoomin', 1)
    wrapper.update()
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
    onZoom('zoomout', -1)
    wrapper.update()
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 400 200')
  })

  describe('panning', function () {
    describe('left', function () {
      it('should move the viewbox left', function () {
        let viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(-1, 0)
        wrapper.update()
        viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('-10 0 400 200')
      })
    })

    describe('right', function () {
      it('should move the viewbox right', function () {
        let viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(1, 0)
        wrapper.update()
        viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('10 0 400 200')
      })
    })
    describe('up', function () {
      it('should move the viewbox up', function () {
        let viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(0, -1)
        wrapper.update()
        viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('0 -10 400 200')
      })
    })
    describe('down', function () {
      it('should move the viewbox down', function () {
        let viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(0, 1)
        wrapper.update()
        viewBox = wrapper.find('svg').prop('viewBox')
        expect(viewBox).to.equal('0 10 400 200')
      })
    })
  })

  it('should should pan horizontally on drag', function () {
    onDrag({}, { x: -15, y: 0 })
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('10 0 400 200')
  })

  it('should should pan vertically on drag', function () {
    onDrag({}, { x: 0, y: -15 })
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 10 400 200')
  })

  it('should reset pan with new src', function () {
    onPan(-1, 0)
    wrapper.update()
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('-10 0 400 200')

    wrapper.setProps({ naturalHeight: 400, naturalWidth: 200, src: 'http://placekitten.com/200/400' })
    wrapper.update()
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 200 400')
  })

  it('should reset zoom with new src', function () {
    onZoom('zoomin', 1)
    wrapper.update()
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')

    wrapper.setProps({ naturalHeight: 400, naturalWidth: 200, src: 'http://placekitten.com/200/400' })
    wrapper.update()
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 200 400')
  })

  describe('when zooming function is controlled by prop', function () {
    let setOnDragSpy, setOnPanSpy, setOnZoomSpy, wrapper
    before(function () {
      setOnDragSpy = sinon.spy()
      setOnPanSpy = sinon.spy()
      setOnZoomSpy = sinon.spy()
      wrapper = mount(
        <SVGPanZoom
          img={img}
          naturalHeight={200}
          naturalWidth={400}
          setOnDrag={setOnDragSpy}
          setOnPan={setOnPanSpy}
          setOnZoom={setOnZoomSpy}
          src={src}
          zooming={false}
        >
          <svg />
        </SVGPanZoom>
      )
    })

    it('should not register onZoom, onPan, onDrag on mount', function () {
      expect(setOnDragSpy).to.not.have.been.called()
      expect(setOnPanSpy).to.not.have.been.called()
      expect(setOnZoomSpy).to.not.have.been.called()
    })

    it('should register the handlers when zooming is set to true', function () {
      wrapper.setProps({ zooming: true })
      expect(setOnDragSpy).to.have.been.called()
      expect(setOnPanSpy).to.have.been.called()
      expect(setOnZoomSpy).to.have.been.called()
    })

    it('should unregister the handler when zooming is set to false', function () {
      wrapper.setProps({ zooming: false })
      expect(setOnDragSpy).to.have.been.calledTwice()
      expect(setOnPanSpy).to.have.been.calledTwice()
      expect(setOnZoomSpy).to.have.been.calledTwice()
    })
  })
})
