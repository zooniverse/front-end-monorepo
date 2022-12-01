import { shallow } from 'enzyme'
import MoveIcon from './MoveIcon'

describe('Component > MoveIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MoveIcon />)
    expect(wrapper).to.be.ok()
  })
})
