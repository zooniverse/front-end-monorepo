import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import BackButton, {
  StyledBackButton,
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
      expect(wrapper).to.be.ok
    })

    it('should render a ThemeProvider', function () {
      expect(wrapper.find('ThemeProvider')).to.have.lengthOf(1)
    })

    it('should render a StyledBackButtonWrapper', function () {
      expect(wrapper.find(StyledBackButtonWrapper)).to.have.lengthOf(1)
    })

    it('should render a StyledBackButton', function () {
      expect(wrapper.find(StyledBackButton)).to.have.lengthOf(1)
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
      wrapper.find('Styled(WithTheme(Button))').simulate('click')
      expect(onClickSpy.calledOnce).to.be.true
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
      wrapper.find('Styled(WithTheme(Button))').simulate('mouseenter')
      expect(showWarningSpy.calledOnce).to.be.true
    })

    it('should call showWarning on the onFocus event', function () {
      wrapper.find('Styled(WithTheme(Button))').simulate('focus')
      expect(showWarningSpy.calledOnce).to.be.true
    })

    it('should call hideWarning on the onMouseLeave event', function () {
      wrapper.find('Styled(WithTheme(Button))').simulate('mouseleave')
      expect(hideWarningSpy.calledOnce).to.be.true
    })

    it('should call hideWarning on the onBlur event', function () {
      wrapper.find('Styled(WithTheme(Button))').simulate('blur')
      expect(hideWarningSpy.calledOnce).to.be.true
    })

    it('should not call setState if props.areAnnotationsNotPersisted is false', function () {
      wrapper.find('Styled(WithTheme(Button))').simulate('mouseenter')
      expect(setStateSpy.calledOnce).to.be.false
      expect(wrapper.state().showWarning).to.be.false
    })

    it('should call setState if props.areAnnotationsNotPersisted is true', function () {
      const previousShowWarningState = wrapper.state().showWarning
      wrapper.setProps({ areAnnotationsNotPersisted: true })
      wrapper.find('Styled(WithTheme(Button))').simulate('mouseenter')
      expect(setStateSpy.calledOnce).to.be.true
      expect(previousShowWarningState).to.be.false
      expect(wrapper.state().showWarning).to.be.true
      expect(previousShowWarningState).to.not.equal(wrapper.state().showWarning)
    })
  })
})
