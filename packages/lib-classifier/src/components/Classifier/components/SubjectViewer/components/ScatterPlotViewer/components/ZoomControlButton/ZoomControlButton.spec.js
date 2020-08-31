import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import ZoomControlButton from './ZoomControlButton'
import { MetaToolsButton } from '@zooniverse/react-components'
import en from './locales/en'

describe('Component > ZoomControlButton', function () {
  let wrapper, onClickSpy
  beforeEach(function () {
    onClickSpy = sinon.spy()
    wrapper = shallow(
      <ZoomControlButton onClick={onClickSpy} />
    )
  })
  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should label text the button according to the zooming prop', function () {
    expect(wrapper.find(MetaToolsButton).props().text).to.equal(en.ZoomControlButton.enable)
    wrapper.setProps({ zooming: true })
    expect(wrapper.find(MetaToolsButton).props().text).to.equal(en.ZoomControlButton.disable)
  })

  it('should set the aria-checked state according to the zooming prop', function () {
    expect(wrapper.find(MetaToolsButton).props()['aria-checked']).to.be.false()
    wrapper.setProps({ zooming: true })
    expect(wrapper.find(MetaToolsButton).props()['aria-checked']).to.be.true()
  })

  it('should call the onClick prop on the click event', function () {
    wrapper.find(MetaToolsButton).simulate('click')
    expect(onClickSpy).to.have.been.calledOnce()
  })
})