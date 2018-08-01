/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AdminCheckbox from './AdminCheckbox';

describe('<AdminCheckbox />', function() {
  let wrapper;
  const onChangeSpy = sinon.spy();
  before(function() {
    wrapper = shallow(<AdminCheckbox onChange={onChangeSpy} />);
  });

  it('renders without crashing', function() {});

  it('renders a grommet <CheckBox />', function() {
    expect(wrapper.find('CheckBox')).to.have.lengthOf(1);
  });

  it('calls onChange prop when clicked', function() {
    wrapper.find('CheckBox').simulate('change');
    expect(onChangeSpy.calledOnce).to.be.true();
  });
});