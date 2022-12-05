import { shallow } from 'enzyme'
import ResetIcon from './ResetIcon'

describe('Component > ResetIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ResetIcon />)
    expect(wrapper).to.be.ok()
  })
})
