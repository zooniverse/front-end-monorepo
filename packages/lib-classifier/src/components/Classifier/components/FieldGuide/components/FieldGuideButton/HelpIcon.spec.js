import { shallow } from 'enzyme'
import HelpIcon from './HelpIcon'

describe('Component > HelpIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<HelpIcon />)
    expect(wrapper).to.be.ok()
  })
})
