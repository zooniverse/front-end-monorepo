/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react'
import { mount, shallow } from 'enzyme'
import { FacebookOption, Twitter, Instagram } from 'grommet-icons'

import SocialAnchor from './SocialAnchor'

describe('SocialAnchor', function () {
  it('should render without crashing', function () {
    shallow(<SocialAnchor service='facebook' />)
  })

  describe('facebook render', function () {
    let wrapper

    it('should render a facebook icon when the service prop is "facebook"', function () {
      wrapper = mount(<SocialAnchor service='facebook' />)
      expect(wrapper.find(FacebookOption)).to.have.lengthOf(1)
    })

    it('should use the service prop as the a11y title', function () {
      wrapper = shallow(<SocialAnchor service='facebook' />)
      expect(wrapper.find('ForwardRef').props().a11yTitle).to.equal('facebook')
    })

    it('should use the expected url in the href', function () {
      wrapper = shallow(<SocialAnchor service='facebook' />)
      expect(wrapper.find('ForwardRef').props().href).to.equal('https://www.facebook.com/therealzooniverse')
    })
  })

  describe('twitter render', function () {
    let wrapper

    it('should render a twitter icon when the service prop is "twitter"', function () {
      wrapper = mount(<SocialAnchor service='twitter' />)
      expect(wrapper.find(Twitter)).to.have.lengthOf(1)
    })

    it('should use the service prop as the a11y title', function () {
      wrapper = shallow(<SocialAnchor service='twitter' />)
      expect(wrapper.find('ForwardRef').props().a11yTitle).to.equal('twitter')
    })

    it('should use the expected url in the href', function () {
      wrapper = shallow(<SocialAnchor service='twitter' />)
      expect(wrapper.find('ForwardRef').props().href).to.equal('https://twitter.com/the_zooniverse')
    })
  })

  describe('instagram render', function () {
    let wrapper

    it('should render an instagram icon when the service prop is "instagram"', function () {
      wrapper = mount(<SocialAnchor service='instagram' />)
      expect(wrapper.find(Instagram)).to.have.lengthOf(1)
    })

    it('should use the service prop as the a11y title', function () {
      wrapper = shallow(<SocialAnchor service='instagram' />)
      expect(wrapper.find('ForwardRef').props().a11yTitle).to.equal('instagram')
    })

    it('should use the expected url in the href', function () {
      wrapper = shallow(<SocialAnchor service='instagram' />)
      expect(wrapper.find('ForwardRef').props().href).to.equal('https://www.instagram.com/the.zooniverse/')
    })
  })
})
