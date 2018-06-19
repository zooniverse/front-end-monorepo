// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { MobileNavigationMenu } from '../src/components/layout/mobile-navigation-menu';

describe('<MobileNavigationMenu />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<MobileNavigationMenu isMobile={true} />);
  });

  it('renders without crashing', function() {});

  it('renders grommet Menu and Anchor components', function() {
    expect(wrapper.find('Menu')).to.have.lengthOf(1);
    expect(wrapper.find('Anchor')).to.have.lengthOf(6);
  });

  it('renders another grommet Anchor if props.isAdmin is true', function() {
    wrapper.setProps({ isAdmin: true });
    expect(wrapper.find('Anchor')).to.have.lengthOf(7);
  });

  it('renders null if props.isMobile is false', function() {
    wrapper.setProps({ isMobile: false });
    expect(wrapper.type()).to.be.null();
  })
});
