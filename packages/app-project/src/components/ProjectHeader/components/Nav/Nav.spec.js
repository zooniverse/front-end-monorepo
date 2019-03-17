import { shallow } from 'enzyme'
import React from 'react'

import { Nav } from './Nav'

let wrapper

const OWNER = 'foo'
const PROJECT = 'bar'
const ROUTER = {
  query: {
    owner: OWNER,
    project: PROJECT
  }
}
const BASE_URL = `/projects/${OWNER}/${PROJECT}`
const LINKS = [
  { text: 'About', href: `${BASE_URL}/about` },
  { text: 'Classify', href: `${BASE_URL}/classify` },
  { text: 'Talk', href: `${BASE_URL}/talk` },
  { text: 'Collect', href: `${BASE_URL}/collections` },
  { text: 'Recents', href: `${BASE_URL}/recents` }
]

describe.only('Component > Nav', function () {
  before(function () {
    wrapper = shallow(<Nav router={ROUTER} isLoggedIn={true} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('Links', function () {
    LINKS.map(link => {
      it(`should show a \`${link.text}\` link`, function () {
        const innerWrapper = wrapper.dive().shallow()
        expect(innerWrapper.find({ ...link })).to.have.lengthOf(1)
      })
    })

    it('should hide the `Recents` link if not logged in', function () {
      let innerWrapper = wrapper.dive().shallow()
      expect(innerWrapper.find({ ...LINKS[4] })).to.have.lengthOf(1)
      wrapper.setProps({ isLoggedIn: false })
      innerWrapper = wrapper.dive().shallow()
      expect(innerWrapper.find({ ...LINKS[4] })).to.have.lengthOf(0)
    })
  })
})
