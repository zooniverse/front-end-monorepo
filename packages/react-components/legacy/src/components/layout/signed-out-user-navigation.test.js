// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import SignedOutUserNavigation from './signed-out-user-navigation';

describe('<SignedOutUserNavigation />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<SignedOutUserNavigation />);
  });

  it('renders without crashing', function() {});

  it('renders components LoginButton and MobileNavigationMenu', function() {
    expect(wrapper.find('LoginButton')).to.have.lengthOf(1);
    expect(wrapper.find('WithMobileView(MobileNavigationMenu)')).to.have.lengthOf(1);
  });

  it('does not render OauthModal if prop.useOauth is false', function() {
    expect(wrapper.find('OauthModal')).to.have.lengthOf(0);
  });

  it('renders OauthModal if prop.useOauth is true', function() {
    wrapper.setProps({ useOauth: true });
    expect(wrapper.find('OauthModal')).to.have.lengthOf(1);
  });
});
