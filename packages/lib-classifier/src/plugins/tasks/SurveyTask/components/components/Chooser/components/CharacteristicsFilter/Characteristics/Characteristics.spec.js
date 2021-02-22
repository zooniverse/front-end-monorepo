import { mount } from 'enzyme'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import Characteristics from './Characteristics'

describe('Component > Characteristics', function () {
  let wrapper, onFilterSpy

  before(function () {
    onFilterSpy = sinon.spy()
    wrapper = mount(
      <Characteristics
        onFilter={onFilterSpy}
      />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
