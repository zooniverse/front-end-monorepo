import { Map, View, Feature } from 'ol'
import LineStringGeom from 'ol/geom/LineString'
import PointGeom from 'ol/geom/Point'
import { Select } from 'ol/interaction'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import createGeoLineStringModifyInteraction, { hasLineStringFeature } from './createGeoLineStringModifyInteraction'

function buildMap(source) {
  const layer = new VectorLayer({ source })
  const map = new Map({
    layers: [layer],
    view: new View({ center: [0, 0], zoom: 1 })
  })
  return { map, layer }
}

describe('helpers > hasLineStringFeature', function () {
  it('returns false for an empty or missing features array', function () {
    expect(hasLineStringFeature([])).to.equal(false)
    expect(hasLineStringFeature(null)).to.equal(false)
    expect(hasLineStringFeature(undefined)).to.equal(false)
  })

  it('returns false when only non-LineString features are present', function () {
    const point = new Feature({ geometry: new PointGeom([0, 0]) })
    expect(hasLineStringFeature([point])).to.equal(false)
  })

  it('returns true when at least one feature is a LineString', function () {
    const line = new Feature({ geometry: new LineStringGeom([[0, 0], [1, 1]]) })
    expect(hasLineStringFeature([line])).to.equal(true)
  })

  it('returns true in a mixed collection containing a LineString', function () {
    const point = new Feature({ geometry: new PointGeom([0, 0]) })
    const line = new Feature({ geometry: new LineStringGeom([[0, 0], [1, 1]]) })
    expect(hasLineStringFeature([point, line])).to.equal(true)
  })
})

describe('helpers > createGeoLineStringModifyInteraction', function () {
  let source, map, selectInteraction

  beforeEach(function () {
    source = new VectorSource()
    const built = buildMap(source)
    map = built.map
    selectInteraction = new Select({ layers: [built.layer] })
    map.addInteraction(selectInteraction)
  })

  afterEach(function () {
    map.setTarget(undefined)
  })

  it('returns a closure with isModifying / setActive / destroy', function () {
    const interaction = createGeoLineStringModifyInteraction({ map, selectInteraction })
    expect(interaction).to.have.property('isModifying').that.is.a('function')
    expect(interaction).to.have.property('setActive').that.is.a('function')
    expect(interaction).to.have.property('destroy').that.is.a('function')
    interaction.destroy()
  })

  it('starts inactive and not-modifying', function () {
    const interaction = createGeoLineStringModifyInteraction({ map, selectInteraction })
    const modifyInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Modify')
    expect(modifyInteraction).to.exist
    expect(modifyInteraction.getActive()).to.equal(false)
    expect(interaction.isModifying()).to.equal(false)
    interaction.destroy()
  })

  it('setActive(true) activates the underlying Modify', function () {
    const interaction = createGeoLineStringModifyInteraction({ map, selectInteraction })
    interaction.setActive(true)
    const modifyInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Modify')
    expect(modifyInteraction.getActive()).to.equal(true)
    interaction.destroy()
  })

  it('destroy() removes the Modify from the map', function () {
    const interaction = createGeoLineStringModifyInteraction({ map, selectInteraction })
    expect(map.getInteractions().getArray().some(i => i.constructor.name === 'Modify')).to.equal(true)
    interaction.destroy()
    expect(map.getInteractions().getArray().some(i => i.constructor.name === 'Modify')).to.equal(false)
  })

  it('binds modify to selectInteraction features so the modify scope follows selection', function () {
    const lineFeature = new Feature({ geometry: new LineStringGeom([[0, 0], [10, 10], [20, 0]]) })
    source.addFeature(lineFeature)
    selectInteraction.getFeatures().push(lineFeature)

    const interaction = createGeoLineStringModifyInteraction({ map, selectInteraction })
    interaction.setActive(true)

    const modifyInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Modify')
    expect(selectInteraction.getFeatures().getLength()).to.equal(1)
    expect(modifyInteraction.getActive()).to.equal(true)
    interaction.destroy()
  })

  it('tracks isModifying across modifystart / modifyend; calls onModifyEnd on release', function () {
    let endCount = 0
    const interaction = createGeoLineStringModifyInteraction({
      map,
      selectInteraction,
      onModifyEnd: () => { endCount += 1 }
    })
    const modifyInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Modify')

    expect(interaction.isModifying()).to.equal(false)

    modifyInteraction.dispatchEvent({ type: 'modifystart', features: selectInteraction.getFeatures() })
    expect(interaction.isModifying()).to.equal(true)
    expect(endCount).to.equal(0)

    modifyInteraction.dispatchEvent({ type: 'modifyend', features: selectInteraction.getFeatures() })
    expect(interaction.isModifying()).to.equal(false)
    expect(endCount).to.equal(1)

    interaction.destroy()
  })

  it('setActive(false) resets isModifying even if no modifyend fires', function () {
    const interaction = createGeoLineStringModifyInteraction({ map, selectInteraction })
    const modifyInteraction = map.getInteractions().getArray().find(i => i.constructor.name === 'Modify')

    modifyInteraction.dispatchEvent({ type: 'modifystart', features: selectInteraction.getFeatures() })
    expect(interaction.isModifying()).to.equal(true)

    interaction.setActive(false)
    expect(interaction.isModifying()).to.equal(false)

    interaction.destroy()
  })
})
