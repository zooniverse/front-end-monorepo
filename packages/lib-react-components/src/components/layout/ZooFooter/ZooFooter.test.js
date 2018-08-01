/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react';
import { shallow } from 'enzyme';
import ZooFooter, {
  StyledFooterBox,
  StyledFooterSection,
  StyledDivider,
  StyledNavListHeader,
  StyledNavListItem,
  StyledZooniverseLogotype,
  StyledEasterEgg
} from './ZooFooter';

describe('<ZooFooter />', function () {
  let wrapper;
  before(function () {
    wrapper = shallow(<ZooFooter />);
  });

  it('renders without crashing', function () {});

  it('should match snapshot', function () {
    expect(wrapper).to.matchSnapshot();
  });
});
