import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Button } from 'grommet'
import {
  BackButton,
  StyledBackButtonWrapper,
  StyledBackButtonToolTip
} from './BackButton'

describe('BackButton', function () {
  describe('rendering', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<BackButton />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a StyledBackButtonWrapper', function () {
      expect(wrapper.find(StyledBackButtonWrapper)).to.have.lengthOf(1)
    })

    it('should render a Button', function () {
      expect(wrapper.find(Button)).to.have.lengthOf(1)
    })
  })

  describe('onClick event', function () {
    let wrapper
    let onClickSpy
    before(function () {
      onClickSpy = sinon.spy()
      wrapper = shallow(<BackButton showButton onClick={onClickSpy} />)
    })

    it('should call props.onClick on the onClick event', function () {
      wrapper.find(Button).simulate('click')
      expect(onClickSpy).to.have.been.calledOnce()
    })
  })

  describe('StyledBackButtonToolTip behavior', function () {
    let wrapper
    let showWarningSpy
    let hideWarningSpy
    let setStateSpy
    before(function () {
      showWarningSpy = sinon.spy(BackButton.prototype, 'showWarning')
      hideWarningSpy = sinon.spy(BackButton.prototype, 'hideWarning')
      setStateSpy = sinon.spy(BackButton.prototype, 'setState')
      wrapper = shallow(<BackButton showButton />)
    })

    afterEach(function () {
      wrapper.setState({ showWarning: false })
      showWarningSpy.resetHistory()
      hideWarningSpy.resetHistory()
      setStateSpy.resetHistory()
    })

    after(function () {
      showWarningSpy.restore()
      hideWarningSpy.restore()
      setStateSpy.restore()
    })

    it('should not render a StyledBackButtonToolTip when state.showWarning is false', function () {
      expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
    })

    it('should render a StyledBackButtonToolTip when state.showWarning is true', function () {
      wrapper.setState({ showWarning: true })
      expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(1)
    })

    it('should should call showWarning on the onMouseEnter event', function () {
      wrapper.find(Button).simulate('mouseenter')
      expect(showWarningSpy).to.have.been.calledOnce()
    })

    it('should call showWarning on the onFocus event', function () {
      wrapper.find(Button).simulate('focus')
      expect(showWarningSpy).to.have.been.calledOnce()
    })

    it('should call hideWarning on the onMouseLeave event', function () {
      wrapper.find(Button).simulate('mouseleave')
      expect(hideWarningSpy).to.have.been.calledOnce()
    })

    it('should call hideWarning on the onBlur event', function () {
      wrapper.find(Button).simulate('blur')
      expect(hideWarningSpy).to.have.been.calledOnce()
    })

    it('should not call setState if props.areAnnotationsNotPersisted is false', function () {
      wrapper.find(Button).simulate('mouseenter')
      expect(setStateSpy).to.have.not.been.called()
      expect(wrapper.state().showWarning).to.be.false()
    })

    it('should call setState if props.areAnnotationsNotPersisted is true', function () {
      const previousShowWarningState = wrapper.state().showWarning
      wrapper.setProps({ areAnnotationsNotPersisted: true })
      wrapper.find(Button).simulate('mouseenter')
      expect(setStateSpy).to.have.been.calledOnce()
      expect(previousShowWarningState).to.be.false()
      expect(wrapper.state().showWarning).to.be.true()
      expect(previousShowWarningState).to.not.equal(wrapper.state().showWarning)
    })
  })
})
