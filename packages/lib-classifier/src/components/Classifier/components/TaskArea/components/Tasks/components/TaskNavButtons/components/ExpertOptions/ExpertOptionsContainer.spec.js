import React from 'react'
import { shallow } from 'enzyme'
import ExpertOptionsContainer from './ExpertOptionsContainer'
import sinon from 'sinon'

describe('TaskNavButtons > Component > ExpertOptionsContainer', function () {
  let wrapper

  describe('smoke test', function () {
    before(function () {
      wrapper = shallow(
        <ExpertOptionsContainer />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })
  })

  describe('when not in demo mode is not enabled', function () {
    before(function () {
      wrapper = shallow(
        <ExpertOptionsContainer />
      )
    })

    it('should render null', function () {
      expect(wrapper).to.be.empty()
    })
  })

  describe('when in demo mode is enabled by query param', function () {
    let originalLocation
    let setDemoModeSpy
    before(function () {
      setDemoModeSpy = sinon.spy()
      originalLocation = window.location
      Object.defineProperty(window, 'location', {
        value: {
          search: '?demo=true',
        },
        writable: true
      })
    })

    afterEach(function () {
      setDemoModeSpy.resetHistory()
    })

    after(function () {
      window.location = originalLocation
      Object.defineProperty(window, 'location', {
        writable: false
      })
    })

    it('should render ExpertOptions', function () {
      wrapper = shallow(
        <ExpertOptionsContainer setDemoMode={setDemoModeSpy} />
      )
      expect(wrapper).to.have.lengthOf(1)
    })

    describe('when the demo mode state is undefined', function () {
      it('should call setDemoMode with true', function () {
        wrapper = shallow(
          <ExpertOptionsContainer setDemoMode={setDemoModeSpy} />
        )
        expect(setDemoModeSpy).to.have.been.calledWith(true)
      })
    })

    describe('when the demo mode state is true', function () {
      it('should not call setDemoMode', function () {
        wrapper = shallow(
          <ExpertOptionsContainer setDemoMode={setDemoModeSpy} storeDemoMode />
        )
        expect(setDemoModeSpy).to.not.have.been.called()
      })
    })

    describe('when the demo mode state is false', function () {
      it('should not call setDemoMode', function () {
        wrapper = shallow(
          <ExpertOptionsContainer setDemoMode={setDemoModeSpy} storeDemoMode={false} />
        )
        expect(setDemoModeSpy).to.not.have.been.called()
      })
    })
  })
})