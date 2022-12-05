import { shallow } from 'enzyme'
import PointerIcon from './PointerIcon'

describe('Component > PointerIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<PointerIcon />)
    expect(wrapper).to.be.ok()
  })
})
