import { shallow } from 'enzyme'
import { Image } from 'grommet'
import { TeamMember, StyledDisplayName, StyledRole, StyledUsername} from './TeamMember'

describe('Component > TeamMember', function () {
  let wrapper

  const user = {
    avatar_src: '',
    display_name: 'Test User',
    id: '123',
    login: 'test-user',
    roles: ['owner', 'scientist']
  }

  const router = {
    query: {
      owner: 'test-user',
      project: 'test-project'
    }
  }

  before(function () {
    wrapper = shallow(<TeamMember user={user} router={router} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display the user display name', function () {
    const name = wrapper.find(StyledDisplayName)
    expect(name.text()).to.equal('Test User')
  })

  it('should display username (login) as a NavLink to user profile', function () {
    const username = wrapper.find(StyledUsername)
    expect(username.props().link.text).to.equal('@test-user')
    expect(username.props().link.href).to.equal('/projects/test-user/test-project/users/test-user')
  })

  it('should display a placeholder avatar image if user has no avatar src', function () {
    const avatar = wrapper.find(Image)
    expect(avatar.props().alt).to.equal('Placeholder Avatar')
    expect(avatar.props().src).to.equal('/simple-avatar.png')
  })

  it('should display all roles in roles array', function () {
    const roles = wrapper.find(StyledRole)
    expect(roles).to.have.lengthOf(2)
  })

  it('should display scientist role as researcher', function () {
    const roles = wrapper.find(StyledRole)
    expect(roles.last().text()).to.equal('researcher')
  })
})
