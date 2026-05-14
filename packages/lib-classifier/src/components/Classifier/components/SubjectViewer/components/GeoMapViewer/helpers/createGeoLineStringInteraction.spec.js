import { Map, View, Feature } from 'ol'
import LineStringGeom from 'ol/geom/LineString'
import PointGeom from 'ol/geom/Point'
import { Select } from 'ol/interaction'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import createGeoLineStringInteraction, { buildSketchStyleFn } from './createGeoLineStringInteraction'

function buildMap(source) {
  const layer = new VectorLayer({ source })
  const map = new Map({
    layers: [layer],
    view: new View({ center: [0, 0], zoom: 1 })
  })
  return { map, layer }
}

describe('helpers > createGeoLineStringInteraction', function () {
  let source, map, geoDrawingTask, selectInteraction

  beforeEach(function () {
    source = new VectorSource()
    const built = buildMap(source)
    map = built.map
    geoDrawingTask = { activeToolIndex: 0 }
    selectInteraction = new Select({ layers: [built.layer] })
    map.addInteraction(selectInteraction)
  })

  afterEach(function () {
    map.setTarget(undefined)
  })

  it('returns a closure with setActive and destroy', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    expect(interaction).to.have.property('setActive').that.is.a('function')
    expect(interaction).to.have.property('destroy').that.is.a('function')
    interaction.destroy()
  })

  it('starts inactive', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction).to.exist
    expect(drawInteraction.getActive()).to.equal(false)
    interaction.destroy()
  })

  it('setActive(true) activates the underlying Draw', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    interaction.setActive(true)
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction.getActive()).to.equal(true)
    interaction.destroy()
  })

  it('tags new features with toolIndex on drawend', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask: { activeToolIndex: 2 }, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    const feature = new Feature({ geometry: new LineStringGeom([[0, 0], [10, 10]]) })
    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    expect(feature.get('toolIndex')).to.equal(2)
    interaction.destroy()
  })

  it('dispatches select on the new feature after drawend (microtask)', async function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    const feature = new Feature({ geometry: new LineStringGeom([[0, 0], [10, 10]]) })
    source.addFeature(feature)

    let selectedFeatures
    selectInteraction.on('select', (event) => { selectedFeatures = event.selected })

    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    await Promise.resolve()

    expect(selectedFeatures).to.have.length(1)
    expect(selectedFeatures[0]).to.equal(feature)
    interaction.destroy()
  })

  it('destroy() removes the Draw from the map', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    expect(map.getInteractions().getArray().some(i => i.constructor.name === 'Draw')).to.equal(true)
    interaction.destroy()
    expect(map.getInteractions().getArray().some(i => i.constructor.name === 'Draw')).to.equal(false)
  })

  it('tracks isDrawing across drawstart / drawend / drawabort', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    expect(interaction.isDrawing()).to.equal(false)

    drawInteraction.dispatchEvent({ type: 'drawstart' })
    expect(interaction.isDrawing()).to.equal(true)

    const feature = new Feature({ geometry: new LineStringGeom([[0, 0], [10, 10]]) })
    drawInteraction.dispatchEvent({ type: 'drawend', feature })
    expect(interaction.isDrawing()).to.equal(false)

    drawInteraction.dispatchEvent({ type: 'drawstart' })
    expect(interaction.isDrawing()).to.equal(true)
    drawInteraction.dispatchEvent({ type: 'drawabort' })
    expect(interaction.isDrawing()).to.equal(false)

    interaction.destroy()
  })

  it('setActive(false) resets isDrawing even if no drawend fires', function () {
    const interaction = createGeoLineStringInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    drawInteraction.dispatchEvent({ type: 'drawstart' })
    expect(interaction.isDrawing()).to.equal(true)

    interaction.setActive(false)
    expect(interaction.isDrawing()).to.equal(false)

    interaction.destroy()
  })

  describe('buildSketchStyleFn - suppresses the sketch-point preview when hovering an existing feature without an in-progress sketch', function () {
    let featuresLayer, originalHasFeatureAtPixel, originalGetPixelFromCoordinate

    beforeEach(function () {
      featuresLayer = map.getLayers().getArray().find(layer => layer.getSource() === source)
      originalHasFeatureAtPixel = map.hasFeatureAtPixel.bind(map)
      originalGetPixelFromCoordinate = map.getPixelFromCoordinate.bind(map)
      map.getPixelFromCoordinate = () => [100, 100]
    })

    afterEach(function () {
      map.hasFeatureAtPixel = originalHasFeatureAtPixel
      map.getPixelFromCoordinate = originalGetPixelFromCoordinate
    })

    it('returns null for the sketch point when not drawing and the cursor is over a feature on featuresLayer', function () {
      map.hasFeatureAtPixel = () => true
      const styleFn = buildSketchStyleFn({ map, featuresLayer, getIsDrawing: () => false })
      const sketchPoint = new Feature({ geometry: new PointGeom([5, 5]) })
      expect(styleFn(sketchPoint)).to.equal(null)
    })

    it('returns the default Point style when not drawing and the cursor is NOT over a feature', function () {
      map.hasFeatureAtPixel = () => false
      const styleFn = buildSketchStyleFn({ map, featuresLayer, getIsDrawing: () => false })
      const sketchPoint = new Feature({ geometry: new PointGeom([5, 5]) })
      const result = styleFn(sketchPoint)
      expect(result).to.not.equal(null)
      expect(result).to.not.equal(undefined)
    })

    it('returns the default style mid-sketch even when the cursor is over a feature (mid-sketch always shows the preview)', function () {
      map.hasFeatureAtPixel = () => true
      const styleFn = buildSketchStyleFn({ map, featuresLayer, getIsDrawing: () => true })
      const sketchPoint = new Feature({ geometry: new PointGeom([5, 5]) })
      const result = styleFn(sketchPoint)
      expect(result).to.not.equal(null)
      expect(result).to.not.equal(undefined)
    })
  })
})
