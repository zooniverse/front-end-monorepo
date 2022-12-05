import { shallow } from 'enzyme'
import FullscreenIcon from './FullscreenIcon'

describe('Component > FullscreenIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FullscreenIcon />)
    expect(wrapper).to.be.ok()
  })
})
