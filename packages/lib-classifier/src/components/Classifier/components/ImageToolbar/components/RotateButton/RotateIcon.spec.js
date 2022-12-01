import { shallow } from 'enzyme'
import RotateIcon from './RotateIcon'

describe('Component > RotateIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<RotateIcon />)
    expect(wrapper).to.be.ok()
  })
})
