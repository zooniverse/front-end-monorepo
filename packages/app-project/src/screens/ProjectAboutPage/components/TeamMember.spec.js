import { shallow } from 'enzyme'
import TeamMember from './TeamMember'

describe.only('Component > TeamMember', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<TeamMember />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
