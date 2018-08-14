// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import OauthGoogleIcon from './oauth-google-icon';

describe('<OauthGoogleIcon />', function() {
  it('renders without crashing', function() {
    const wrapper = shallow(<OauthGoogleIcon />);
    expect(wrapper.find('svg')).to.have.lengthOf(1);
  })
})
