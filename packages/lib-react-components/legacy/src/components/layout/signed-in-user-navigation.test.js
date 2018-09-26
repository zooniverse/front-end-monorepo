// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import SignedInUserNavigation from './signed-in-user-navigation';

const userMenuNavList = [
  <a href="#">a link</a>
];

describe('<SignedInUserNavigation />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<SignedInUserNavigation userMenuNavList={userMenuNavList} />);
  });

  it('renders without crashing', function() {});

  it('renders components UserMenu, UserNavigation, and MobileNavigationMenu', function() {
    expect(wrapper.find('UserMenu')).to.have.lengthOf(1);
    expect(wrapper.find('WithMobileView(UserNavigation)')).to.have.lengthOf(1);
    expect(wrapper.find('WithMobileView(MobileNavigationMenu)')).to.have.lengthOf(1);
  });
});
