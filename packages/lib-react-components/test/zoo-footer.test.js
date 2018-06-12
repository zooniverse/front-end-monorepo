/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { shallow } from 'enzyme';
import ZooFooter from '../src/components/layout/zoo-footer';

describe('<ZooFooter />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<ZooFooter />);
  });

  it('renders without crashing', function() {});

  it('renders grommet components', function() {
    expect(wrapper.find('Footer')).to.have.lengthOf(1);
    expect(wrapper.find('Section')).to.have.lengthOf(4);
    expect(wrapper.find('Columns')).to.have.lengthOf(1);
    expect(wrapper.find('Menu')).to.have.lengthOf(8);
    expect(wrapper.find('Anchor')).to.have.lengthOf(25);
    expect(wrapper.find('Button')).to.have.lengthOf(3);
    expect(wrapper.find('Image')).to.have.lengthOf(1);
  });

  it('renders <ZooniverseLogotype />', function() {
    expect(wrapper.find('ZooniverseLogotype')).to.have.lengthOf(1);
  });
});
