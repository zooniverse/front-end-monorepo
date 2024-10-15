import { render, waitFor } from '@testing-library/react'
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
    wrapper = render(
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

  it('should enable zoom in', async function () {
    onZoom('zoomin', 1)
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('18.5 9.5 363 181')
    })
  })

  it('should enable zoom out', async function () {
    onZoom('zoomin', 1)
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('18.5 9.5 363 181')
    })
    onZoom('zoomout', -1)
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('0 0 400 200')
    })
  })

  describe('panning', function () {
    describe('left', function () {
      it('should move the viewbox left', async function () {
        let viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(-1, 0)
        await waitFor(() => {
          const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
          expect(viewBox).to.equal('-10 0 400 200')
        })
      })
    })

    describe('right', function () {
      it('should move the viewbox right', async function () {
        let viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(1, 0)
        await waitFor(() => {
          const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
          expect(viewBox).to.equal('10 0 400 200')
        })
      })
    })
    describe('up', function () {
      it('should move the viewbox up', async function () {
        let viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(0, -1)
        await waitFor(() => {
          const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
          expect(viewBox).to.equal('0 -10 400 200')
        })
      })
    })
    describe('down', function () {
      it('should move the viewbox down', async function () {
        let viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onPan(0, 1)
        await waitFor(() => {
          const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
          expect(viewBox).to.equal('0 10 400 200')
        })
      })
    })
  })

  it('should should pan horizontally on drag', async function () {
    onDrag({}, { x: -15, y: 0 })
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('13.5 0 400 200')
    })
  })

  it('should should pan vertically on drag', async function () {
    onDrag({}, { x: 0, y: -15 })
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('0 13.5 400 200')
    })
  })

  it('should reset pan with new src', async function () {
    onPan(-1, 0)
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('-10 0 400 200')
    })

    wrapper.rerender(
      <SVGPanZoom
        img={img}
        naturalHeight={400}
        naturalWidth={200}
        setOnDrag={callback => { onDrag = callback }}
        setOnPan={callback => { onPan = callback }}
        setOnZoom={callback => { onZoom = callback }}
        src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg'
      >
        <svg />
      </SVGPanZoom>
    )
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('0 0 200 400')
    })
  })

  it('should reset zoom with new src', async function () {
    onZoom('zoomin', 1)
    await waitFor(() => {
      const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
      expect(viewBox).to.equal('18.5 9.5 363 181')
    })

    wrapper.rerender(
      <SVGPanZoom
        img={img}
        naturalHeight={400}
        naturalWidth={200}
        setOnDrag={callback => { onDrag = callback }}
        setOnPan={callback => { onPan = callback }}
        setOnZoom={callback => { onZoom = callback }}
        src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg'
      >
        <svg />
      </SVGPanZoom>
    )
    const viewBox = document.querySelector('svg[viewBox]')?.getAttribute('viewBox')
    await waitFor(() => expect(viewBox).to.equal('0 0 200 400'))
  })

  describe('when zooming function is controlled by prop', function () {
    let setOnDragSpy, setOnPanSpy, setOnZoomSpy, wrapper
    beforeEach(function () {
      setOnDragSpy = sinon.spy()
      setOnPanSpy = sinon.spy()
      setOnZoomSpy = sinon.spy()
      wrapper = render(
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
      wrapper.rerender(
        <SVGPanZoom
          img={img}
          naturalHeight={200}
          naturalWidth={400}
          setOnDrag={setOnDragSpy}
          setOnPan={setOnPanSpy}
          setOnZoom={setOnZoomSpy}
          src={src}
          zooming={true}
        >
          <svg />
        </SVGPanZoom>
      )
      expect(setOnDragSpy).to.have.been.called()
      expect(setOnPanSpy).to.have.been.called()
      expect(setOnZoomSpy).to.have.been.called()
    })

    it('should unregister the handler when zooming is set to false', function () {
      wrapper.rerender(
        <SVGPanZoom
          img={img}
          naturalHeight={200}
          naturalWidth={400}
          setOnDrag={setOnDragSpy}
          setOnPan={setOnPanSpy}
          setOnZoom={setOnZoomSpy}
          src={src}
          zooming={true}
        >
          <svg />
        </SVGPanZoom>
      )
      wrapper.rerender(
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
      expect(setOnDragSpy).to.have.been.calledTwice()
      expect(setOnPanSpy).to.have.been.calledTwice()
      expect(setOnZoomSpy).to.have.been.calledTwice()
    })
  })
})
