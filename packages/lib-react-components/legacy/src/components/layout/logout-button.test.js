// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LogoutButton from './logout-button';

describe('<LogoutButton />', function() {
  let wrapper;
  const onClickSpy = sinon.spy();
  before(function() {
    wrapper = shallow(<LogoutButton logout={onClickSpy} />);
  });

  it('renders without crashing', function() {});

  it('renders grommet Button component', function() {
    expect(wrapper.find('Button')).to.have.lengthOf(1);
  });

  it('calls login prop', function() {
    wrapper.find('Button').simulate('click');
    expect(onClickSpy.calledOnce).to.be.true();
  });
});
