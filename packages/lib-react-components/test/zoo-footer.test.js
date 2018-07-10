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
  StyledEasterEgg
} from '../src/components/layout/zoo-footer';

describe('<ZooFooter />', function () {
  let wrapper;
  before(function () {
    wrapper = shallow(<ZooFooter />);
  });

  it('renders without crashing', function () {});

  it('renders grommet components', function () {
    expect(wrapper.find(StyledFooterBox)).to.have.lengthOf(1);
    expect(wrapper.find(StyledFooterSection)).to.have.lengthOf(3);
    expect(wrapper.find(StyledDivider)).to.have.lengthOf(1);
    expect(wrapper.find(StyledNavListHeader)).to.have.lengthOf(6);
    expect(wrapper.find(StyledNavListItem)).to.have.lengthOf(21);
    expect(wrapper.find('.social-media')).to.have.lengthOf(3);
    expect(wrapper.find(StyledEasterEgg)).to.have.lengthOf(1);
  });

  it('renders <ZooniverseLogotype />', function () {
    expect(wrapper.find('ZooniverseLogotype')).to.have.lengthOf(1);
  });
});
