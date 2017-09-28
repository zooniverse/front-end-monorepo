// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import OauthModal from '../src/components/layout/oauth-modal';

describe('<OauthModal />', function() {
  const loginSpy = sinon.spy();
  const loginWithGoogleSpy = sinon.spy();

  let wrapper;
  before(function() {
    wrapper = shallow(<OauthModal login={loginSpy} loginWithGoogle={loginWithGoogleSpy} />);
  });

  it('renders without crashing', function() {});

  it('renders null if showOauthModal is false', function() {
    expect(wrapper.html()).to.be.null;
  })

  it('renders grommet components if showOauthModal is true', function() {
    wrapper.setProps({ showOauthModal: true });
    expect(wrapper.find('Layer')).to.have.lengthOf(1);
    expect(wrapper.find('Box')).to.have.lengthOf(1);
    expect(wrapper.find('Heading')).to.have.lengthOf(1);
    expect(wrapper.find('Box')).to.have.lengthOf(1);
    expect(wrapper.find('Button')).to.have.lengthOf(2);
  });

  it('calls login when the login button is clicked', function() {
    const loginButton = wrapper.find('Button').first();
    loginButton.simulate('click');
    expect(loginSpy.calledOnce).to.be.true;
  });

  it('calls loginWithGoogle when the login with Googel button is clicked', function() {
    const loginWithGoogleButton = wrapper.find('Button').last();
    loginWithGoogleButton.simulate('click');
    expect(loginWithGoogleSpy.calledOnce).to.be.true;
  });
});
