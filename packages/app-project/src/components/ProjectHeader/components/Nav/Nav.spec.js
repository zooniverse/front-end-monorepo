import { shallow } from 'enzyme'
import React from 'react'

import Nav from './Nav'
import NavLink from './components/NavLink'

let wrapper

const BASE_URL = `/projects/foo/bar`
const LINKS = [
  { text: 'About', href: `${BASE_URL}/about` },
  { text: 'Classify', href: `${BASE_URL}/classify` },
  { text: 'Talk', href: `${BASE_URL}/talk` },
  { text: 'Collect', href: `${BASE_URL}/collections` },
  { text: 'Recents', href: `${BASE_URL}/recents` }
]

describe('Component > Nav', function () {
  before(function () {
    wrapper = shallow(<Nav navLinks={LINKS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a link for each item passed in the `navLinks` prop', function () {
    expect(wrapper.find(NavLink).length).to.equal(LINKS.length)
    LINKS.forEach(function (LINK) {
      // The `href` property is passed down by Next.js's `<Link />` component,
      // so we can't assert on it at the same time as `text`.
      expect(wrapper.find({ href: LINK.href })).to.have.lengthOf(1)
      expect(wrapper.find({ text: LINK.text })).to.have.lengthOf(1)
    })
  })
})
