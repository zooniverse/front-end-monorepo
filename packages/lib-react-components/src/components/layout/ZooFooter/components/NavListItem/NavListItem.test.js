/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { mount, shallow } from 'enzyme';
import zooTheme from '@zooniverse/grommet-theme';

import NavListItem, { StyledNavListItem } from './NavListItem';

describe('NavListItem', function () {
  const label = 'My link';
  const url = 'https://www.zooniverse.org';
  let wrapper;
  let manyNavListItems;
  before(function () {
    wrapper = shallow(<NavListItem label={label} url={url} />)
  });

  it('should render without crashing', function () {});

  it('should match its snapshot', function () {
    expect(wrapper).to.matchSnapshot();
  });

  xdescribe('light theme')
})