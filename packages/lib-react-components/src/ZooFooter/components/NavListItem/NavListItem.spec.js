/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react'
import { mount, shallow } from 'enzyme'
import zooTheme from '@zooniverse/grommet-theme'

import NavListItem, { StyledNavListItem } from './NavListItem'

describe('NavListItem', function () {
  const label = 'My link'
  const url = 'https://www.zooniverse.org'
  let wrapper
  before(function () {
    wrapper = shallow(<NavListItem label={label} url={url} />)
  })

  it('should render without crashing', function () {})

  // Testing styled-components requires mount to work, but it currently isn't
  // Patch in enzyme React 16 adapter may be coming soon:
  // https://github.com/airbnb/enzyme/pull/1592
  xdescribe('light theme')
})
