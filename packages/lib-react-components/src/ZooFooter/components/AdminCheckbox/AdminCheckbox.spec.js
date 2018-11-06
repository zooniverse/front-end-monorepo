/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import AdminCheckbox, { StyledAdminCheckbox } from './AdminCheckbox'

describe('<AdminCheckbox />', function () {
  let wrapper
  const onChangeSpy = sinon.spy()
  before(function () {
    wrapper = shallow(<AdminCheckbox onChange={onChangeSpy} />)
  })

  it('renders without crashing', function () {})

  it('calls onChange prop when clicked', function () {
    wrapper.find('ForwardRef').simulate('change')
    expect(onChangeSpy.calledOnce).to.be.true()
  })

  // Can't test this yet. See comment in component code
  xdescribe('theme styles', function () {
    it('should use the expected light theme colors', function () {
      const wrapper = <StyledAdminCheckbox theme='light' />
    })
  })
})
