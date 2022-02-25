import { mount } from 'enzyme'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { CloseButton, Media } from '@zooniverse/react-components'

import FilterButton, { StyledFilter } from './FilterButton'

describe('Component > FilterButton', function () {
  let wrapper, onFilterSpy

  before(function () {
    onFilterSpy = sinon.spy()
    wrapper = mount(
      <FilterButton
        characteristicId='LK'
        checked={false}
        onFilter={onFilterSpy}
        valueImageSrc='bird-icon.svg'
        valueLabel='bird'
      />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the characteristic value media', function () {
    expect(wrapper.find(Media)).to.have.lengthOf(1)
    expect(wrapper.find(Media).props().src).to.equal('bird-icon.svg')
  })

  it('should render the media with an alt of the value label', function () {
    expect(wrapper.find(Media).props().alt).to.equal('bird')
  })

  it('should have a background color neutral-6', function () {
    expect(wrapper.find(StyledFilter).props().background.color).to.equal('neutral-6')
  })

  it('should not render a CloseButton', function () {
    expect(wrapper.find(CloseButton)).to.have.lengthOf(0)
  })

  describe('when checked', function () {
    before(function () {
      wrapper.setProps({ checked: true })
    })

    it('should have a background color of accent-1', function () {
      expect(wrapper.find(StyledFilter).props().background.color).to.equal('accent-1')
    })

    it('should call onFilter on click of the CloseButton', function () {
      wrapper.find(CloseButton).at(0).simulate('click')
      expect(onFilterSpy).to.have.been.calledOnceWith('LK')
    })
  })
})
