import { Map, View, Feature } from 'ol'
import PointGeom from 'ol/geom/Point'
import LineStringGeom from 'ol/geom/LineString'
import { Select } from 'ol/interaction'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import createGeoPointInteraction, { createDrawCondition, createSketchStyle } from './createGeoPointInteraction'

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

  it('initializes uncertainty_radius to 0 on drawend when the tool has uncertainty circles', function () {
    const task = { activeToolIndex: 0, activeTool: { type: 'Point', max: 3, uncertainty_circle: true } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: task, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    const feature = new Feature({ geometry: new PointGeom([5, 5]) })
    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    expect(feature.get('uncertainty_radius')).to.equal(0)
    interaction.destroy()
  })

  it('leaves uncertainty_radius unset on drawend when the tool has no uncertainty circles', function () {
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask, selectInteraction })
    const drawInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')

    const feature = new Feature({ geometry: new PointGeom([5, 5]) })
    drawInteraction.dispatchEvent({ type: 'drawend', feature })

    expect(feature.get('uncertainty_radius')).to.equal(undefined)
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

  it('isCapped() counts subject-provided points (no toolIndex) toward the max', function () {
    source.addFeature(taggedPoint([0, 0]))

    const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
    const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

    expect(interaction.isCapped()).to.equal(true)
    interaction.destroy()
  })

  it('counts subject-provided points only toward the first Point tool', function () {
    source.addFeature(taggedPoint([0, 0], 0))

    const taskWithSecondPointTool = {
      activeToolIndex: 1,
      activeTool: { type: 'Point', max: 1 },
      tools: [
        { type: 'Point', max: 1 },
        { type: 'Point', max: 1 }
      ]
    }
    const interaction = createGeoPointInteraction({
      map,
      source,
      geoDrawingTask: taskWithSecondPointTool,
      selectInteraction
    })

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

  describe('subject-supplied points occupying capacity', function () {
    function findDraw() {
      return map.getInteractions().getArray().find(i => i.constructor.name === 'Draw')
    }

    it('frees a drawing slot when the seed point is deleted', function () {
      const seed = taggedPoint([0, 0])
      source.addFeature(seed)
      const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
      const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })
      interaction.setActive(true)

      expect(findDraw().getActive()).to.equal(false)
      source.removeFeature(seed)
      expect(findDraw().getActive()).to.equal(true)

      source.addFeature(taggedPoint([1, 1], 0))
      expect(findDraw().getActive()).to.equal(false)
      interaction.destroy()
    })

    it('caps a full workflow until the seed is deleted, then allows max total points', function () {
      const seed = taggedPoint([0, 0])
      source.addFeature(seed)
      source.addFeature(taggedPoint([1, 1], 0))
      source.addFeature(taggedPoint([2, 2], 0))
      const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 3 } }
      const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })
      interaction.setActive(true)

      expect(findDraw().getActive()).to.equal(false)
      source.removeFeature(seed)
      expect(findDraw().getActive()).to.equal(true)

      source.addFeature(taggedPoint([3, 3], 0))
      expect(interaction.isCapped()).to.equal(true)
      expect(findDraw().getActive()).to.equal(false)
      interaction.destroy()
    })

    it('never activates when max is 0, even after the seed is deleted', function () {
      const seed = taggedPoint([0, 0])
      source.addFeature(seed)
      const moveOnlyTask = { activeToolIndex: 0, activeTool: { type: 'Point', max: 0 } }
      const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: moveOnlyTask, selectInteraction })
      interaction.setActive(true)

      source.removeFeature(seed)
      expect(findDraw().getActive()).to.equal(false)
      interaction.destroy()
    })

    it('ignores subject LineStrings for point capacity', function () {
      source.addFeature(new Feature({ geometry: new LineStringGeom([[0, 0], [1, 1]]) }))
      const taskWithCap = { activeToolIndex: 0, activeTool: { type: 'Point', max: 1 } }
      const interaction = createGeoPointInteraction({ map, source, geoDrawingTask: taskWithCap, selectInteraction })

      expect(interaction.isCapped()).to.equal(false)
      interaction.destroy()
    })
  })

  describe('createDrawCondition', function () {
    const primaryEvent = (coordinate) => ({
      coordinate,
      pixel: [10, 10],
      originalEvent: { pointerId: 1, isPrimary: true, button: 0, pointerType: 'mouse' }
    })

    it('accepts a primary click when no subject extent is set', function () {
      const condition = createDrawCondition({ map })
      expect(condition(primaryEvent([5, 5]))).to.equal(true)
    })

    it('accepts a primary click inside the subject extent', function () {
      map.set('subjectExtent', [0, 0, 100, 100])
      const condition = createDrawCondition({ map })
      expect(condition(primaryEvent([50, 50]))).to.equal(true)
    })

    it('rejects a click outside the subject extent', function () {
      map.set('subjectExtent', [0, 0, 100, 100])
      const condition = createDrawCondition({ map })
      expect(condition(primaryEvent([150, 50]))).to.equal(false)
    })

    it('rejects a non-primary click', function () {
      const condition = createDrawCondition({ map })
      const event = {
        coordinate: [5, 5],
        pixel: [10, 10],
        originalEvent: { pointerId: 1, isPrimary: true, button: 2, pointerType: 'mouse' }
      }
      expect(condition(event)).to.equal(false)
    })
  })

  describe('createSketchStyle', function () {
    function sketchPoint(coordinates) {
      return new Feature({ geometry: new PointGeom(coordinates) })
    }

    it('styles the sketch point when no subject extent is set', function () {
      const style = createSketchStyle({ map })
      expect(style(sketchPoint([5, 5]))).to.exist
    })

    it('styles the sketch point inside the subject extent', function () {
      map.set('subjectExtent', [0, 0, 100, 100])
      const style = createSketchStyle({ map })
      expect(style(sketchPoint([50, 50]))).to.exist
    })

    it('hides the sketch point outside the subject extent', function () {
      map.set('subjectExtent', [0, 0, 100, 100])
      const style = createSketchStyle({ map })
      expect(style(sketchPoint([150, 50]))).to.equal(null)
    })
  })
})
