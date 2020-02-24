import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Controls, { StyledPlainButton } from './Controls'
import zooTheme from '@zooniverse/grommet-theme'

describe.only('VariableStarViewer > Component > Controls', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Controls />)
    expect(wrapper).to.be.ok()
  })

  describe('y-axis inversion', function () {
    it('should call props.setYAxisInversion when the flip button is clicked', function () {
      const setYAxisInversionSpy = sinon.spy()
      const wrapper = mount(<Controls setYAxisInversion={setYAxisInversionSpy} />, { theme: zooTheme })
      console.log(wrapper.debug())
      wrapper.find(StyledPlainButton).simulate('click')
      expect(setYAxisInversionSpy).to.have.been.calledOnce()
    })
  })
})