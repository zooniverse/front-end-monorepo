import { Map, View, Feature } from 'ol'
import PointGeom from 'ol/geom/Point'
import LineStringGeom from 'ol/geom/LineString'
import { Select } from 'ol/interaction'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import createGeoPointInteraction from './createGeoPointInteraction'

function buildMap(source) {
  const layer = new VectorLayer({ source })
  const map = new Map({
    layers: [layer],
    view: new View({ center: [0, 0], zoom: 1 })
  })
  return { map, layer }
}

function taggedPoint(coordinates, toolIndex) {
  const feature = new Feature({ geometry: new PointGeom(coordinates) })
  if (typeof toolIndex === 'number') feature.set('toolIndex', toolIndex)
  return feature
}

describe('helpers > createGeoPointInteraction', function () {
  let source, map, geoDrawingTask, selectInteraction

  beforeEach(function () {
    source = new VectorSource()
    const built = buildMap(source)
    map = built.map
    geoDrawingTask = { activeToolIndex: 0, activeTool: { type: 'Point', max: 3 } }
    selectInteraction = new Select({ layers: [built.layer] })
    map.addInteraction(selectInteraction)
  })

  afterEach(function () {
    map.setTarget(undefined)
  })

  it('returns a closure with setActive and destroy', function () {
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask, selectInteraction })
    expect(interaction).to.have.property('setActive').that.is.a('function')
    expect(interaction).to.have.property('destroy').that.is.a('function')
    interaction.destroy()
  })

  it('starts inactive', function () {
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction).to.exist
    expect(drawInteraction.getActive()).to.equal(false)
    interaction.destroy()
  })

  it('setActive(true) activates the underlying Draw', function () {
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask, selectInteraction })
    interaction.setActive(true)
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction.getActive()).to.equal(true)
    interaction.destroy()
  })

  it('refuses to activate when the tool max is 0 (creation disabled)', function () {
    const moveOnlyTask = { activeToolIndex: 0, activeTool: { type: 'Point', max: 0 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: moveOnlyTask, selectInteraction })
    interaction.setActive(true)
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction.getActive()).to.equal(false)
    interaction.destroy()
  })

  it('tags new features with toolIndex on drawend', function () {
    const task = { activeToolIndex: 2, activeTool: { type: 'Point', max: 3 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: task, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    const feature = new Feature({ geometry: new PointGeom([5, 5]) })
    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    expect(feature.get('toolIndex')).to.equal(2)
    interaction.destroy()
  })

  it('dispatches select on the new feature after drawend (microtask)', async function () {
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    const feature = new Feature({ geometry: new PointGeom([5, 5]) })
    source.addFeature(feature)

    let selectedFeatures
    selectInteraction.on('select', (event) => { selectedFeatures = event.selected })

    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    await Promise.resolve()

    expect(selectedFeatures).to.have.length(1)
    expect(selectedFeatures[0]).to.equal(feature)
    interaction.destroy()
  })

  it('refuses to activate when source already holds activeTool.max Points for the active tool', function () {
    source.addFeature(taggedPoint([0, 0], 0))
    source.addFeature(taggedPoint([1, 1], 0))

    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 2 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

    interaction.setActive(true)

    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction.getActive()).to.equal(false)
    interaction.destroy()
  })

  it('deactivates after drawend brings the count to activeTool.max', function () {
    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })
    interaction.setActive(true)

    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction.getActive()).to.equal(true)

    const feature = new Feature({ geometry: new PointGeom([5, 5]) })
    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    expect(drawInteraction.getActive()).to.equal(false)
    interaction.destroy()
  })

  it('reactivates when a point is removed below the cap', function () {
    const f1 = taggedPoint([0, 0], 0)
    source.addFeature(f1)
    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })
    interaction.setActive(true)

    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    expect(drawInteraction.getActive()).to.equal(false)

    source.removeFeature(f1)
    expect(drawInteraction.getActive()).to.equal(true)
    interaction.destroy()
  })

  it('exposes isCapped() reflecting whether the active tool has hit its max', function () {
    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 2 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

    expect(interaction.isCapped()).to.equal(false)
    source.addFeature(taggedPoint([0, 0], 0))
    expect(interaction.isCapped()).to.equal(false)
    source.addFeature(taggedPoint([1, 1], 0))
    expect(interaction.isCapped()).to.equal(true)
    interaction.destroy()
  })

  it('isCapped() returns true when max is 0 (creation disabled)', function () {
    const moveOnlyTask = { activeToolIndex: 0, activeTool: { type: 'Point', max: 0 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: moveOnlyTask, selectInteraction })
    expect(interaction.isCapped()).to.equal(true)
    interaction.destroy()
  })

  it('isCapped() ignores subject-provided points (no toolIndex)', function () {
    source.addFeature(taggedPoint([0, 0]))

    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

    expect(interaction.isCapped()).to.equal(false)
    interaction.destroy()
  })

  it('isCapped() ignores features tagged for another tool', function () {
    source.addFeature(taggedPoint([0, 0], 1))
    source.addFeature(taggedPoint([1, 1], 1))

    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 2 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

    expect(interaction.isCapped()).to.equal(false)
    interaction.destroy()
  })

  it('isCapped() ignores non-Point geometries', function () {
    const line = new Feature({ geometry: new LineStringGeom([[0, 0], [1, 1]]) })
    line.set('toolIndex', 0)
    source.addFeature(line)

    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

    expect(interaction.isCapped()).to.equal(false)
    interaction.destroy()
  })

  it('destroy() removes the Draw from the map', function () {
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask, selectInteraction })
    expect(map.getInteractions().getArray().some(i => i.constructor.name === 'Draw')).to.equal(true)
    interaction.destroy()
    expect(map.getInteractions().getArray().some(i => i.constructor.name === 'Draw')).to.equal(false)
  })
})
