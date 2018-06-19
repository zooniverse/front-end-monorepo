// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { mount } from 'enzyme';
import withMobileView from '../src/components/layout/with-mobile-view';

describe('withMobileView', function() {
  let wrapper;
  before(function() {
    function MockComponent() {
      return (<div></div>);
    }

    const WrappedMockComponent = withMobileView(MockComponent);
    wrapper = mount(<WrappedMockComponent />);
  });

  it('renders without crashing', function() {});

  it('renders the MockComponent', function() {
    expect(wrapper.find('div')).to.have.lengthOf(1);
  });

  it('passes along props to child component', function() {
    wrapper.setProps({ mockProp: true });
    expect(wrapper.find('MockComponent').prop('mockProp')).to.be.true();
    expect(wrapper.find('MockComponent').prop('isMobile')).to.be.false();
  })
});
