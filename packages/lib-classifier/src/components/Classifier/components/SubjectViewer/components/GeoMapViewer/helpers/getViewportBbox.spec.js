import { Map, View } from 'ol'

import getViewportBbox from './getViewportBbox'

describe('helpers > getViewportBbox', function () {
  it('returns null when the map has no size', function () {
    const map = new Map({ view: new View({ center: [0, 0], zoom: 2 }) })
    expect(getViewportBbox(map)).to.equal(null)
  })

  it('returns the viewport extent as an EPSG:4326 bbox', function () {
    const map = new Map({ view: new View({ center: [0, 0], zoom: 2 }) })
    map.setSize([800, 600])
    const bbox = getViewportBbox(map)
    expect(bbox).to.have.length(4)
    const [minLon, minLat, maxLon, maxLat] = bbox
    expect(minLon).to.be.lessThan(maxLon)
    expect(minLat).to.be.lessThan(maxLat)
    expect(minLon).to.be.at.least(-180.001)
    expect(maxLat).to.be.at.most(90.001)
  })

  it('returns null without a map', function () {
    expect(getViewportBbox(null)).to.equal(null)
  })
})
