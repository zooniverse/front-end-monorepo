/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react'
import { mount, shallow } from 'enzyme'
import { FacebookOption, Twitter, Instagram } from 'grommet-icons'

import SocialAnchor from './SocialAnchor'

const THEME = { dark: false }

describe('SocialAnchor', function () {
  const SOCIAL_LINKS = [
    {
      service: 'facebook',
      component: FacebookOption,
      url: 'https://www.facebook.com/therealzooniverse'
    },
    {
      service: 'twitter',
      component: Twitter,
      url: 'https://twitter.com/the_zooniverse'
    },
    {
      service: 'instagram',
      component: Instagram,
      url: 'https://www.instagram.com/the.zooniverse/'
    }
  ]

  it('should render without crashing', function () {
    shallow(<SocialAnchor service='facebook' theme={THEME} />)
  })

  SOCIAL_LINKS.forEach(function testSocialLink (link) {
    describe(`${link.service} link`, function () {
      let wrapper

      it(`should render a ${link.service} icon`, function () {
        wrapper = mount(<SocialAnchor service={link.service} theme={THEME} />)
        expect(wrapper.find(link.component)).to.have.lengthOf(1)
      })

      it(`should have ${link.service} a11y title`, function () {
        wrapper = shallow(<SocialAnchor service={link.service} theme={THEME} />)
        expect(wrapper.props().a11yTitle).to.equal(link.service)
      })

      it(`should link to ${link.url}`, function () {
        wrapper = shallow(<SocialAnchor service={link.service} theme={THEME} />)
        expect(wrapper.props().href).to.equal(link.url)
      })
    })
  })
})
