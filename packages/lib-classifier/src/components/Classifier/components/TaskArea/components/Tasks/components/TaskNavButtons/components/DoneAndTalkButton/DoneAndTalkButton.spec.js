import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import DoneAndTalkButton, { StyledDoneAndTalkButton } from './DoneAndTalkButton'

describe('DoneAndTalkButton', function () {
  it('should render without crashing', function () {
    const wrapper = mount(<DoneAndTalkButton />)
    expect(wrapper).to.be.ok
  })
  
  describe('when props.completed is true', function () {
    it('should render null', function () {
      const wrapper = mount(<DoneAndTalkButton completed />)
      expect(wrapper.html()).to.be.null
    })
  })

  it('should call props.onClick for the onClick event', function () {
    const onClickSpy = sinon.spy()
    const wrapper = mount(<DoneAndTalkButton onClick={onClickSpy} />)
    wrapper.find('button').simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })

  describe('when props.completed is false', function () {
    it('should render a ThemeProvider', function () {
      const wrapper = mount(<DoneAndTalkButton />)
      expect(wrapper.find('ThemeProvider')).to.have.lengthOf(1)
    })

    it('should render a StyledDoneAndTalkButton', function () {
      const wrapper = mount(<DoneAndTalkButton />)
      expect(wrapper.find(StyledDoneAndTalkButton)).to.have.lengthOf(1)
    })
  })

  xdescribe('props.goldStandardMode', function () {
    it('should not render a star icon if props.goldStandardMode is false', function () {
      const wrapper = mount(<DoneAndTalkButton />)
      expect(wrapper.find('i.fa-star')).to.have.lengthOf(0)
    })

    it('should render a star icon if props.goldStandardMode is true', function () {
      const wrapper = mount(<DoneAndTalkButton goldStandardMode />)
      expect(wrapper.find('i.fa-star')).to.have.lengthOf(1)
    })
  })

  xdescribe('props.demoMode', function () {
    it('should not render a trash icon if props.demoMode is false', function () {
      const wrapper = mount(<DoneAndTalkButton />)
      expect(wrapper.find('i.fa-trash')).to.have.lengthOf(0)
    })

    it('should render a trash icon if props.demoMode is true', function () {
      const wrapper = mount(<DoneAndTalkButton demoMode />)
      expect(wrapper.find('i.fa-trash')).to.have.lengthOf(1)
    })
  })
})
