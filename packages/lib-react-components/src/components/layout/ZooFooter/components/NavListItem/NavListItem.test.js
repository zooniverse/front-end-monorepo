/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { mount, shallow } from 'enzyme';
import zooTheme from '@zooniverse/grommet-theme';

import NavListItem, { StyledNavListItem } from './NavListItem';

describe.only('NavListItem', function () {
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

  it('should apply certain styles only to the first child', function () {
    manyNavListItems = mount((
      <div>
        {[{ label, url }, { label: 'another link', url: 'https://google.com' }].map((link) => {
          return (<NavListItem key={link.url} label={link.label} url={link.url} />)
        })}
      </div>
    ))
    const firstNavListItem = manyNavListItems.find(NavListItem).first().dive().find(StyledNavListItem);
    const secondNavListItem = manyNavListItems.find(NavListItem).at(1).dive().find(StyledNavListItem);
    console.log(firstNavListItem.props(), secondNavListItem)
    // expect(firstNavListItem)
  });

  xdescribe('light theme')
})