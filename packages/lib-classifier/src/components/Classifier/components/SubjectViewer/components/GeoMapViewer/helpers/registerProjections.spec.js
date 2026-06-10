import { get as getProjection } from 'ol/proj'
import './registerProjections'

describe('helpers > registerProjections', function () {
  it('registers EPSG:26915 (UTM 15N) so non-web-mercator COGs can reproject', function () {
    expect(getProjection('EPSG:26915')).to.not.equal(null)
  })
})
