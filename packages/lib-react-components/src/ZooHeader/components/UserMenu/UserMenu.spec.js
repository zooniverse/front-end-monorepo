import { shallow } from 'enzyme'
import UserMenu from './UserMenu'

describe('UserMenu', function () {
  let wrapper
  const user = { display_name: 'zootester1', login: 'zootester1' }
  before(function () {
    wrapper = shallow(<UserMenu signOut={() => {}} user={user} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
