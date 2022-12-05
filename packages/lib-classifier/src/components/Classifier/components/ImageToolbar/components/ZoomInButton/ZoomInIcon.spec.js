import { shallow } from 'enzyme'
import ZoomInIcon from './ZoomInIcon'

describe('Component > ZoomInIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomInIcon />)
    expect(wrapper).to.be.ok()
  })
})
