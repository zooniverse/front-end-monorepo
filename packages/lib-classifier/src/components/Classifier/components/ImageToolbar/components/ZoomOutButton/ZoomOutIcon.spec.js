import { shallow } from 'enzyme'
import ZoomOutIcon from './ZoomOutIcon'

describe('Component > ZoomOutIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomOutIcon />)
    expect(wrapper).to.be.ok()
  })
})
