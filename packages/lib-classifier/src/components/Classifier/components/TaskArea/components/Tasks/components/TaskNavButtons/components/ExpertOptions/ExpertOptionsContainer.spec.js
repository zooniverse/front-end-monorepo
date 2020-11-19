import React from 'react'
import { mount, shallow } from 'enzyme'
import ExpertOptionsContainer from './ExpertOptionsContainer'

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

  describe('when not in demo mode', function () {
    before(function () {
      wrapper = shallow(
        <ExpertOptionsContainer />
      )
    })

    it('should render null', function () {
      expect(wrapper).to.be.empty()
    })
  })

  describe('when in demo mode by query param', function () {
    let originalLocation
    before(function () {
      originalLocation = window.location
      Object.defineProperty(window, 'location', {
        value: {
          search: { demo: 'true' },
        },
        writable: true
      })
      wrapper = mount(
        <ExpertOptionsContainer />
      )
    })

    after(function () {
      window.location = originalLocation
      Object.defineProperty(window, 'location', {
        writable: false
      })
    })

    it('should render ExpertOptions', function () {
      expect(wrapper).to.have.lengthOf(1)
    })
  })

  describe('when in demo mode by prop', function () {
    let originalLocation
    before(function () {
      originalLocation = window.location
      Object.defineProperty(window, 'location', {
        value: {},
        writable: true
      })
      wrapper = mount(
        <ExpertOptionsContainer demo />
      )
    })

    after(function () {
      window.location = originalLocation
      Object.defineProperty(window, 'location', {
        writable: false
      })
    })

    it('should render ExpertOptions', function () {
      expect(wrapper).to.have.lengthOf(1)
    })
  })
})