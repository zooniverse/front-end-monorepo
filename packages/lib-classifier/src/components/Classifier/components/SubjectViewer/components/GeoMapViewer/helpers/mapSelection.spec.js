import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'

import { fitViewToExtent } from './mapSelection'

// A 1 km grid cell at latitude 47.5, the shape of a Beaver Seeker subject.
const CELL_EXTENT = [
  ...fromLonLat([-91.9465, 47.5612]),
  ...fromLonLat([-91.9375, 47.5702])
]
const POINT_EXTENT = [...fromLonLat([-91.9465, 47.5612]), ...fromLonLat([-91.9465, 47.5612])]

describe('helpers > fitViewToExtent', function () {
  let map

  beforeEach(function () {
    map = new Map({ view: new View({ center: [0, 0], zoom: 1 }) })
    map.setSize([1100, 800])
    // jsdom has no laid-out viewport, so the view never learns the map's size.
    map.getView().setViewportSize([1100, 800])
  })

  it('should fit a small subject close enough to work on', function () {
    fitViewToExtent(map, CELL_EXTENT, 0)
    // Ground resolution, not the Mercator resolution the view reports.
    const groundResolution = map.getView().getResolution() * Math.cos((47.5662 * Math.PI) / 180)
    expect(groundResolution).to.be.lessThan(2)
  })

  it('should not cap a subject extent at the zoom that made 1 km subjects unusable', function () {
    fitViewToExtent(map, CELL_EXTENT, 0)
    expect(map.getView().getZoom()).to.be.greaterThan(12)
  })

  it('should still cap a degenerate extent at usable imagery', function () {
    fitViewToExtent(map, POINT_EXTENT, 0)
    expect(map.getView().getZoom()).to.be.at.most(19)
  })

  it('should keep a large subject fitted rather than zoomed in', function () {
    const lakeExtent = [...fromLonLat([-91.05, 47.96]), ...fromLonLat([-90.97, 48.01])]
    fitViewToExtent(map, lakeExtent, 0)
    expect(map.getView().getZoom()).to.be.lessThan(14)
  })
})
