import { shallow } from 'enzyme'
import { AboutSidebar } from './AboutSidebar'
import AboutNavLink from './AboutNavLink'

describe('Component > AboutSidebar', () => {
  let wrapper

  const router = {
    query: {
      owner: 'test-owner',
      project: 'test-project'
    }
  }

  before(() => {
    wrapper = shallow(
      <AboutSidebar aboutNavLinks={[]} router={router} />
    )
  })

  it('should render without crashing', () => {
    expect(wrapper).to.be.ok()
  })

  it('should always render at least two links: Research and The Team', () => {
    const links = wrapper.find(AboutNavLink)
    expect(links).to.have.lengthOf(2)
  })

  it('should render other links passed in the aboutNavLinks array', () => {
    wrapper = shallow(
      <AboutSidebar
        aboutNavLinks={['research', 'team', 'results']}
        router={router}
      />
    )
    const links = wrapper.find(AboutNavLink)
    expect(links).to.have.lengthOf(3)
  })
})
