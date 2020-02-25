import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import Controls, { FlipButton } from './Controls'
import zooTheme from '@zooniverse/grommet-theme'

describe('VariableStarViewer > Component > Controls', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Controls />)
    expect(wrapper).to.be.ok()
  })

  describe('y-axis inversion', function () {
    it('should call props.setYAxisInversion when the flip button is clicked', function () {
      const setYAxisInversionSpy = sinon.spy()
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Controls setYAxisInversion={setYAxisInversionSpy} />
        </Grommet>
      )
      wrapper.find(FlipButton).simulate('click')
      expect(setYAxisInversionSpy).to.have.been.calledOnce()
    })
  })
})