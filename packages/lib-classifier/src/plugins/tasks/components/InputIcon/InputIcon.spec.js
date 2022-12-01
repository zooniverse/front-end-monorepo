import { shallow } from 'enzyme'
import InputIcon, { StyledInputIcon } from './InputIcon'

const icon = <svg />

describe('InputIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<InputIcon icon={icon} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a StyledInputIcon component', function () {
    const wrapper = shallow(<InputIcon icon={icon} />)
    expect(wrapper.find(StyledInputIcon)).to.have.lengthOf(1)
  })
})
