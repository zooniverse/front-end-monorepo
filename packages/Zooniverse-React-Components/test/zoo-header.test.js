// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import ZooHeader from './zoo-header';

const mainHeaderNavList = [
  <a href="#">a link</a>
];

describe('<ZooHeader />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<ZooHeader mainHeaderNavList={mainHeaderNavList} />);
  });

  it('renders without crashing', function() {});

  it('renders grommet components', function() {
    expect(wrapper.find('Header')).to.have.lengthOf(1);
    expect(wrapper.find('Menu')).to.have.lengthOf(1);
  });

  it('renders <ZooniverseLogo />', function() {
    expect(wrapper.find('ZooniverseLogo')).to.have.lengthOf(1);
  });

  it('renders nav items', function() {
    expect(wrapper.find('a')).to.have.lengthOf(1);
  });
});
