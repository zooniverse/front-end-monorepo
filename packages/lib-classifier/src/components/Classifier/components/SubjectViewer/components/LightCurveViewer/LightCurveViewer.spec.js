import * as d3 from 'd3'
import { render } from 'enzyme'
import { zip } from 'lodash'

import LightCurveViewer from './LightCurveViewer'
import kepler from '../../helpers/mockLightCurves/kepler'

let wrapper

describe('Component > LightCurveViewer', function () {
  before(function () {
    const dataPoints = zip(kepler.x, kepler.y)
    const dataExtent = {
      x: d3.extent(kepler.x),
      y: d3.extent(kepler.y)
    }

    // Use mount() instead of shallow() since d3 logic exists outside of render()
    wrapper = render(<LightCurveViewer dataPoints={dataPoints} dataExtent={dataExtent} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
