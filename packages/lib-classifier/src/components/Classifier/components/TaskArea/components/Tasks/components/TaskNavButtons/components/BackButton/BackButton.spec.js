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
      wrapper = shallow(<BackButton canUndo />)
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

  describe('on click', function () {
    let wrapper
    let onClickSpy
    before(function () {
      onClickSpy = sinon.spy()
      wrapper = shallow(<BackButton canUndo onClick={onClickSpy} />)
    })

    it('should call onClick', function () {
      wrapper.find(Button).simulate('click')
      expect(onClickSpy).to.have.been.calledOnce()
    })
  })

  describe('StyledBackButtonToolTip behavior', function () {
    describe('when annotations are not persisted', function () {
      let wrapper
      beforeEach(function () {
        wrapper = shallow(<BackButton canUndo />)
      })

      it('should not render a StyledBackButtonToolTip', function () {
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
      })

      it('should render a StyledBackButtonToolTip on mouse enter', function () {
        wrapper.find(Button).simulate('mouseenter')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(1)
      })

      it('should hide the StyledBackButtonToolTip on mouse leave', function () {
        wrapper.find(Button).simulate('mouseenter')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(1)
        wrapper.find(Button).simulate('mouseleave')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
      })

      it('should render a StyledBackButtonToolTip on focus', function () {
        wrapper.find(Button).simulate('focus')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(1)
      })

      it('should hide the StyledBackButtonToolTip on blur', function () {
        wrapper.find(Button).simulate('focus')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(1)
        wrapper.find(Button).simulate('blur')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
      })
    })

    describe('when annotations are persisted', function () {
      let wrapper
      beforeEach(function () {
        wrapper = shallow(<BackButton canUndo persistAnnotations />)
      })

      it('should not render a StyledBackButtonToolTip', function () {
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
      })

      it('should not render a StyledBackButtonToolTip on mouse enter', function () {
        wrapper.find(Button).simulate('mouseenter')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
      })

      it('should not render a StyledBackButtonToolTip on focus', function () {
        wrapper.find(Button).simulate('focus')
        expect(wrapper.find(StyledBackButtonToolTip)).to.have.lengthOf(0)
      })
    })
  })
})
