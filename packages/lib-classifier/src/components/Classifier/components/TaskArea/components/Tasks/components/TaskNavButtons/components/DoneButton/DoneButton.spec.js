import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import DoneButton, { StyledDoneButton } from './DoneButton'

describe('DoneButton', function () {
  it('should render without crashing', function () {
    const wrapper = mount(<DoneButton />)
    expect(wrapper).to.be.ok
  })

  describe('when props.completed is true', function () {
    it('should render null', function () {
      const wrapper = mount(<DoneButton completed />)
      expect(wrapper.html()).to.be.null
    })
  })

  it('should call props.onClick for the onClick event', function () {
    const onClickSpy = sinon.spy()
    const wrapper = mount(<DoneButton onClick={onClickSpy} />)
    wrapper.find('button').simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })

  describe('when props.completed is false', function () {
    it('should render a ThemeProvider', function () {
      const wrapper = mount(<DoneButton />)
      expect(wrapper.find('ThemeProvider')).to.have.lengthOf(1)
    })

    it('should render a StyledDoneButton', function () {
      const wrapper = mount(<DoneButton />)
      expect(wrapper.find(StyledDoneButton)).to.have.lengthOf(1)
    })
  })

  xdescribe('props.goldStandardMode', function () {
    it('should not render a star icon if props.goldStandardMode is false', function () {
      const wrapper = mount(<DoneButton />)
      expect(wrapper.find('i.fa-star')).to.have.lengthOf(0)
    })

    it('should render a star icon if props.goldStandardMode is true', function () {
      const wrapper = mount(<DoneButton goldStandardMode />)
      expect(wrapper.find('i.fa-star')).to.have.lengthOf(1)
    })
  })

  xdescribe('props.demoMode', function () {
    it('should not render a trash icon if props.demoMode is false', function () {
      const wrapper = mount(<DoneButton />)
      expect(wrapper.find('i.fa-trash')).to.have.lengthOf(0)
    })

    it('should render a trash icon if props.demoMode is true', function () {
      const wrapper = mount(<DoneButton demoMode />)
      expect(wrapper.find('i.fa-trash')).to.have.lengthOf(1)
    })
  })
})
