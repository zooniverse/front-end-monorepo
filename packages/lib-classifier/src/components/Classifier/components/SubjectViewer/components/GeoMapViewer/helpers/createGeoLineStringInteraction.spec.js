import { Map, View, Feature } from 'ol'
import LineStringGeom from 'ol/geom/LineString'
import { Select } from 'ol/interaction'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import createGeoLineStringInteraction from './createGeoLineStringInteraction'

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
})
