import { mount, render } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import AnimatedNumber from './AnimatedNumber'

const DURATION = 1000
const FORMATTED_VALUE = '1,000'
const NEW_FORMATTED_VALUE = '2,000'
const NEW_VALUE = 2000
const VALUE = 1000

describe('Component > AnimatedNumber', function () {
  it('should render without crashing', function () {
    render(<AnimatedNumber value={1000} />)
  })

  it('should render the `value` by default', function () {
    const wrapper = render(<AnimatedNumber duration={DURATION} value={VALUE} />)
    expect(wrapper.text()).to.equal(FORMATTED_VALUE)
  })

  describe('animation behaviour', function () {
    it('should animate from zero on mount', function () {
      const animateNumberSpy = sinon.spy(AnimatedNumber.prototype, 'animateValue')
      mount(<AnimatedNumber value={VALUE} />)
      expect(animateNumberSpy).to.have.been.calledWith(0)
      animateNumberSpy.restore()
    })

    it('should animate to the new `value` prop when it changes', function (done) {
      const DURATION = 50
      const wrapper = mount(<AnimatedNumber duration={DURATION} value={VALUE} />)
      expect(wrapper.render().text()).to.equal(FORMATTED_VALUE)
      wrapper.setProps({ value: NEW_VALUE })
      setTimeout(function () {
        expect(wrapper.render().text()).to.equal(NEW_FORMATTED_VALUE)
        done()
      }, DURATION + 50)
    })
  })
})
