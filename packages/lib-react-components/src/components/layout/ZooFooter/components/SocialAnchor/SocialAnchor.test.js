/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { mount, shallow } from 'enzyme';
import zooTheme from '@zooniverse/grommet-theme';
import { FacebookOption, Twitter, Instagram } from 'grommet-icons';

import SocialAnchor from './SocialAnchor';

describe('SocialAnchor', function () {
  it('should render without crashing', function () {
    shallow(<SocialAnchor service="facebook" />)
  });

  describe('facebook render', function () {
    let wrapper;
    before(function () {
      wrapper = shallow(<SocialAnchor service="facebook" />)
    });

    // Test for this might work if I could mount...
    xit('should set the icon prop to use the facebook icon when the service prop is "facebook"', function () {
      expect(wrapper.find('Styled(Anchor)').props().icon).to.be.an.instanceOf(FacebookOption)
    });

    it('should use the service prop as the a11y title', function () {
      expect(wrapper.find('Styled(Anchor)').props().a11yTitle).to.equal('facebook')
    });

    it('should use the expected url in the href', function () {
      expect(wrapper.find('Styled(Anchor)').props().href).to.equal('https://www.facebook.com/therealzooniverse')
    });
  });

  describe('twitter render', function () {
    let wrapper;
    before(function () {
      wrapper = shallow(<SocialAnchor service="twitter" />)
    });

    xit('should render a twitter icon when the service prop is "twitter"', function () {
      expect(wrapper.find(Twitter)).to.have.lengthOf(1)
    });

    it('should use the service prop as the a11y title', function () {
      expect(wrapper.find('Styled(Anchor)').props().a11yTitle).to.equal('twitter')
    });

    it('should use the expected url in the href', function () {
      expect(wrapper.find('Styled(Anchor)').props().href).to.equal('https://twitter.com/the_zooniverse')
    });
  });

  describe('instagram render', function () {
    let wrapper;
    before(function () {
      wrapper = shallow(<SocialAnchor service="instagram" />)
    });

    xit('should render an instagram icon when the service prop is "instagram"', function () {
      expect(wrapper.find(Instagram)).to.have.lengthOf(1)
    });

    it('should use the service prop as the a11y title', function () {
      expect(wrapper.find('Styled(Anchor)').props().a11yTitle).to.equal('instagram')
    });

    it('should use the expected url in the href', function () {
      expect(wrapper.find('Styled(Anchor)').props().href).to.equal('https://www.instagram.com/the.zooniverse/')
    });
  });
});
