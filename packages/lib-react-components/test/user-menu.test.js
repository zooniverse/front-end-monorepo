// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import Anchor from 'grommet/components/Anchor';
import UserMenu from '../src/components/layout/user-menu';
import LogoutButton from '../src/components/layout/logout-button';

const login = 'zoouser';

const userMenuNavList = [
  <Anchor href={`https://www.zooniverse.org/users/${login}`}>Profile</Anchor>,
  <Anchor href="https://www.zooniverse.org/settings">Settings</Anchor>,
  <Anchor href={`https://www.zooniverse.org/collections/${login}`}>Collections</Anchor>,
  <Anchor href={`https://www.zooniverse.org/favorites/${login}`}>Favorites</Anchor>,
  <LogoutButton logout={() => {}} />
];

describe('<UserMenu />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<UserMenu userMenuNavList={userMenuNavList} />);
  });

  it('renders without crashing', function() {});

  it('renders grommet components', function() {
    expect(wrapper.find('Menu')).to.have.lengthOf(1);
  });
});
