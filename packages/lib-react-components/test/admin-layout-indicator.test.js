/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { shallow } from 'enzyme';
import AdminLayoutIndicator from '../src/components/layout/admin-layout-indicator';

describe('<AdminLayoutIndicator />', function() {
  it('renders without crashing', function() {
    const wrapper = shallow(<AdminLayoutIndicator />);
    expect(wrapper.type()).to.equal('div');
  });
});