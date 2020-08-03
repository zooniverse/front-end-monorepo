import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import ZoomEnableButton from './ZoomEnableButton'
import { MetaToolsButton } from '@zooniverse/react-components'
import en from '../../locales/en'

describe('Component > ZoomEnableButton', function () {
  let wrapper, onClickSpy
  beforeEach(function () {
    onClickSpy = sinon.spy()
    wrapper = shallow(
      <ZoomEnableButton onClick={onClickSpy} />
    )
  })
  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should label text the button according to the zooming prop', function () {
    expect(wrapper.find(MetaToolsButton).props().text).to.equal(en.VariableStarViewer.enableZoom)
    wrapper.setProps({ zooming: true })
    expect(wrapper.find(MetaToolsButton).props().text).to.equal(en.VariableStarViewer.zoomEnabled)
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