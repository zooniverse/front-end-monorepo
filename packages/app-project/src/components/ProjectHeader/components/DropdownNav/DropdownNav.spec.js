import { shallow } from 'enzyme'

import { DropdownNav, StyledDropButton } from './DropdownNav'
import NavLink from '@shared/components/NavLink'

describe('Component > Nav', function () {
  let wrapper

  const BASE_URL = `/projects/foo/bar`
  const LINKS = [
    { text: 'About', href: `${BASE_URL}/about` },
    { text: 'Classify', href: `${BASE_URL}/classify` },
    { text: 'Talk', href: `${BASE_URL}/talk` },
    { text: 'Collect', href: `${BASE_URL}/collections` },
    { text: 'Recents', href: `${BASE_URL}/recents` }
  ]

  before(function () {
    wrapper = shallow(<DropdownNav navLinks={LINKS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a link for each item passed in the `navLinks` prop', function () {
    const dropButton = wrapper.find(StyledDropButton).first()
    const { dropContent } = dropButton?.props()
    const links = shallow(dropContent)?.find(NavLink)
    expect(links?.length).to.equal(LINKS.length)
  })
})
