import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'

import { MAX_FIT_ZOOM } from './constants'
import { fitViewToExtent } from './mapSelection'

const VIEWPORT = [1100, 800]
const LATITUDE = 47.5612

// A 1 km grid cell at latitude 47.5, the shape of a Beaver Seeker subject.
const CELL_EXTENT = [
  ...fromLonLat([-91.9465, 47.5612]),
  ...fromLonLat([-91.9375, 47.5702])
]
// A georeferencing subject is a single point with no bbox, so its extent has no area.
const POINT_EXTENT = [...fromLonLat([-91.9465, 47.5612]), ...fromLonLat([-91.9465, 47.5612])]

// The view reports Mercator resolution; ground resolution needs the latitude scale.
function groundResolution(map) {
  return map.getView().getResolution() * Math.cos((LATITUDE * Math.PI) / 180)
}

describe('helpers > fitViewToExtent', function () {
  let map

  beforeEach(function () {
    map = new Map({ view: new View({ center: [0, 0], zoom: 1 }) })
    map.setSize(VIEWPORT)
    // jsdom has no laid-out viewport, so the view never learns the map's size.
    map.getView().setViewportSize(VIEWPORT)
  })

  // A 1 km cell wants zoom 16.2, so at the current cap it is clamped. While the cap is
  // low enough to clamp it, there is no assertion to make about a cell being workable.
  it('should never fit closer than the cap', function () {
    fitViewToExtent(map, CELL_EXTENT, 0)
    expect(map.getView().getZoom()).to.be.at.most(MAX_FIT_ZOOM)
  })

  it('should fit a subject with no area at the cap', function () {
    fitViewToExtent(map, POINT_EXTENT, 0)
    // Nothing else can decide it: fitting a zero-area extent wants infinite zoom.
    expect(map.getView().getZoom()).to.equal(MAX_FIT_ZOOM)
  })

  it('should open a subject with no area on enough ground to place it', function () {
    fitViewToExtent(map, POINT_EXTENT, 0)
    // Georeferencing subjects carry one point and an uncertainty radius of up to several
    // km, and ask the volunteer to adjust both. Opening on a few hundred metres puts the
    // radius off screen and leaves nothing to orient against.
    expect(groundResolution(map) * VIEWPORT[0]).to.be.at.least(1000)
  })

  it('should keep a large subject fitted rather than zoomed in', function () {
    const lakeExtent = [...fromLonLat([-91.05, 47.96]), ...fromLonLat([-90.97, 48.01])]
    fitViewToExtent(map, lakeExtent, 0)
    expect(map.getView().getZoom()).to.be.lessThan(14)
  })
})
