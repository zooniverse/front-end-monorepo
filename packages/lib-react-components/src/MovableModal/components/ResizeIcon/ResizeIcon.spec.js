import { shallow } from 'enzyme'
import { ResizeIcon } from './ResizeIcon'

describe('SubTaskPopup > Components > ResizeIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ResizeIcon />)
    expect(wrapper).to.be.ok()
  })
})