import Feature from 'ol/Feature'
import { LineString, Point } from 'ol/geom'
import { isStateTreeNode } from 'mobx-state-tree'

import asMSTFeature from './asMSTFeature'

describe('helpers > asMSTFeature', function () {
  it('resolves a LineString OL feature to a SegmentedLine MST model that produces styles', function () {
    const feature = new Feature({
      geometry: new LineString([[0, 0], [10, 10], [20, 5]])
    })
    const mstFeature = asMSTFeature(feature)
    expect(mstFeature).to.not.equal(null)
    expect(isStateTreeNode(mstFeature)).to.equal(true)
    const styles = mstFeature.getStyles({ feature, geoDrawingTask: null, isSelected: false })
    expect(styles).to.be.an('array')
    expect(styles.length).to.be.greaterThan(0)
  })

  it('resolves a Point OL feature to an MST model', function () {
    const feature = new Feature({ geometry: new Point([1, 2]) })
    const mstFeature = asMSTFeature(feature)
    expect(mstFeature).to.not.equal(null)
    expect(isStateTreeNode(mstFeature)).to.equal(true)
  })

  it('returns null for an unsupported geometry type', function () {
    const feature = new Feature({})
    expect(asMSTFeature(feature)).to.equal(null)
  })
})
