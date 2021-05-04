import { shallow } from 'enzyme'
import { AboutDropContent, AboutDropdownNav } from './AboutDropdownNav'
import AboutNavLink from './AboutNavLink'

describe('Component > AboutDropdownNav', () => {
  let wrapper

  const router = {
    query: {
      owner: 'test-owner',
      project: 'test-project'
    }
  }

  before(() => {
    wrapper = shallow(<AboutDropdownNav aboutNavLinks={[]} router={router} />)
  })

  it('should render without crashing', () => {
    expect(wrapper).to.be.ok()
  })
})

describe('Component > AboutDropContent', () => {
  let wrapper

  const router = {
    query: {
      owner: 'test-owner',
      project: 'test-project'
    }
  }

  before(() => {
    wrapper = shallow(<AboutDropContent aboutNavLinks={[]} router={router} />)
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
      <AboutDropContent
        aboutNavLinks={['research', 'team', 'results']}
        router={router}
      />
    )
    const links = wrapper.find(AboutNavLink)
    expect(links).to.have.lengthOf(3)
  })
})
