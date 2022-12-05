import { shallow } from 'enzyme'
import FlipIcon from './FlipIcon'

describe('VariableStarViewer > Component > FlipIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FlipIcon />)
    expect(wrapper).to.be.ok()
  })
})