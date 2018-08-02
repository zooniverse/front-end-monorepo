/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { shallow } from 'enzyme';
import zooTheme from '@zooniverse/grommet-theme';

import ZooFooter from './ZooFooter';

describe('<ZooFooter />', function () {
  let wrapper;
  before(function () {
    wrapper = shallow(<ZooFooter />);
  });

  it('renders without crashing', function () {});

  it('should match snapshot', function () {
    expect(wrapper).to.matchSnapshot();
  });

  describe('light theme', function () {
    it('should use a white background for its wrapping Box component', function () {
      const boxWrapper = wrapper.find('Box').first()
      expect(boxWrapper.props().background).to.equal('#fff')
    })
  })

  describe('dark theme', function () {
    it('should use the dark theme background color for its wrapping Box component', function () {
      wrapper.setProps({ colorTheme: 'dark' })
      const boxWrapper = wrapper.find('Box').first()
      expect(boxWrapper.props().background).to.equal(zooTheme.dark.colors.background.default)
    })

    after(function() {
      wrapper.setProps({ colorTheme: 'light' })
    })
  })
});
