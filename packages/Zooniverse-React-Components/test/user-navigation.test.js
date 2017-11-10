// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import { UserNavigation } from '../src/components/layout/user-navigation';

describe('<UserNavigation />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<UserNavigation />);
  });

  it('renders without crashing', function() {});

  it('renders grommet components', function() {
    expect(wrapper.find('Anchor')).to.have.lengthOf(2);
    expect(wrapper.find('Menu')).to.have.lengthOf(1);
  });
});
