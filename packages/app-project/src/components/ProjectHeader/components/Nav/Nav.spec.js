import { shallow } from 'enzyme'

import Nav from './Nav'
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
    wrapper = shallow(<Nav navLinks={LINKS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a link for each item passed in the `navLinks` prop', function () {
    expect(wrapper.find(NavLink).length).to.equal(LINKS.length)
  })
})
