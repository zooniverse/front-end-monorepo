import { shallow } from 'enzyme'
import EditIcon from './EditIcon'

describe('Component > EditIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<EditIcon />)
    expect(wrapper).to.be.ok()
  })
})
