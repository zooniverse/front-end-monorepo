import { Map, View } from 'ol'
import { createEmpty } from 'ol/extent'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import constrainMapToExtent, {
  EXTENT_PADDING_FACTOR,
  MASK_COVERAGE_FACTOR,
  clampToSubjectExtent,
  createExtentMaskLayer,
  isWithinSubjectExtent,
  padExtent
} from './extentConstraint'

function buildMap() {
  const source = new VectorSource({ features: [] })
  const layer = new VectorLayer({ source })
  const map = new Map({
    layers: [layer],
    view: new View({ center: [0, 0], zoom: 0 })
  })
  map.setSize([800, 600])
  return { map, layer }
}

const EXTENT = [0, 0, 1000, 500]

describe('helpers > extentConstraint', function () {
  describe('padExtent', function () {
    it('pads each axis by the padding factor', function () {
      expect(padExtent(EXTENT, 0.1)).to.deep.equal([-100, -50, 1100, 550])
    })

    it('defaults to a 10% padding factor', function () {
      expect(EXTENT_PADDING_FACTOR).to.equal(0.1)
      expect(padExtent(EXTENT)).to.deep.equal(padExtent(EXTENT, 0.1))
    })
  })

  describe('constrainMapToExtent', function () {
    it('constrains the view center to the padded extent', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      const view = map.getView()
      expect(view.getConstrainedCenter([50000, 50000])).to.deep.equal([1100, 550])
      expect(view.getConstrainedCenter([-50000, -50000])).to.deep.equal([-100, -50])
    })

    it('allows the view center to reach an extent corner', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      expect(map.getView().getConstrainedCenter([0, 0])).to.deep.equal([0, 0])
    })

    it('caps zoom-out so the subject cannot shrink away', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      expect(map.getView().getMinZoom()).to.be.above(0)
    })

    it('preserves the current center and zoom', function () {
      const { map } = buildMap()
      map.getView().setCenter([500, 250])
      map.getView().setZoom(18)
      constrainMapToExtent(map, EXTENT)
      expect(map.getView().getCenter()).to.deep.equal([500, 250])
      expect(map.getView().getZoom()).to.equal(18)
    })

    it('adds a mask layer below the drawing layer', function () {
      const { map, layer } = buildMap()
      constrainMapToExtent(map, EXTENT)
      const layers = map.getLayers().getArray()
      const maskIndex = layers.findIndex(l => l.get('extentMask'))
      expect(maskIndex).to.be.at.least(0)
      expect(maskIndex).to.be.below(layers.indexOf(layer))
    })

    it('does not stack mask layers across repeated calls', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      constrainMapToExtent(map, EXTENT)
      const masks = map.getLayers().getArray().filter(l => l.get('extentMask'))
      expect(masks).to.have.lengthOf(1)
    })

    it('ignores an empty extent', function () {
      const { map } = buildMap()
      const view = map.getView()
      constrainMapToExtent(map, createEmpty())
      expect(map.getView()).to.equal(view)
      expect(map.getLayers().getArray().some(l => l.get('extentMask'))).to.equal(false)
    })

    it('ignores a zero-area extent, e.g. a single point subject', function () {
      const { map } = buildMap()
      const view = map.getView()
      constrainMapToExtent(map, [100, 200, 100, 200])
      expect(map.getView()).to.equal(view)
      expect(map.getLayers().getArray().some(l => l.get('extentMask'))).to.equal(false)
    })
  })

  describe('createExtentMaskLayer', function () {
    it('builds a polygon with a hole at the subject extent', function () {
      const layer = createExtentMaskLayer(EXTENT)
      const [feature] = layer.getSource().getFeatures()
      const rings = feature.getGeometry().getCoordinates()
      expect(rings).to.have.lengthOf(2)
      const innerXs = rings[1].map(coord => coord[0])
      const innerYs = rings[1].map(coord => coord[1])
      expect(Math.min(...innerXs)).to.equal(EXTENT[0])
      expect(Math.min(...innerYs)).to.equal(EXTENT[1])
      expect(Math.max(...innerXs)).to.equal(EXTENT[2])
      expect(Math.max(...innerYs)).to.equal(EXTENT[3])
    })

    it('covers far beyond the subject extent so panning never reveals a gap', function () {
      const layer = createExtentMaskLayer(EXTENT)
      const [feature] = layer.getSource().getFeatures()
      const outerXs = feature.getGeometry().getCoordinates()[0].map(coord => coord[0])
      const outerWidth = Math.max(...outerXs) - Math.min(...outerXs)
      expect(outerWidth).to.be.at.least((EXTENT[2] - EXTENT[0]) * MASK_COVERAGE_FACTOR)
    })
  })

  describe('subject extent gating', function () {
    it('publishes the subject extent on the map', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      expect(map.get('subjectExtent')).to.deep.equal(EXTENT)
    })

    it('does not publish an extent when the constraint is skipped', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, [100, 200, 100, 200])
      expect(map.get('subjectExtent')).to.equal(undefined)
    })

    it('isWithinSubjectExtent allows everything when no extent is set', function () {
      const { map } = buildMap()
      expect(isWithinSubjectExtent(map, [99999, 99999])).to.equal(true)
    })

    it('isWithinSubjectExtent gates coordinates against the extent', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      expect(isWithinSubjectExtent(map, [500, 250])).to.equal(true)
      expect(isWithinSubjectExtent(map, [1500, 250])).to.equal(false)
    })

    it('clampToSubjectExtent clamps outside coordinates to the extent edge', function () {
      const { map } = buildMap()
      constrainMapToExtent(map, EXTENT)
      expect(clampToSubjectExtent(map, [1500, -300])).to.deep.equal([1000, 0])
      expect(clampToSubjectExtent(map, [500, 250])).to.deep.equal([500, 250])
    })

    it('clampToSubjectExtent is identity when no extent is set', function () {
      const { map } = buildMap()
      expect(clampToSubjectExtent(map, [1500, -300])).to.deep.equal([1500, -300])
    })
  })
})
