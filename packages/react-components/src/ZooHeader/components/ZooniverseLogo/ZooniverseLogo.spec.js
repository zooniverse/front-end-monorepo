import { mount } from 'enzyme'
import React from 'react'
import ZooniverseLogo from './ZooniverseLogo'

describe('ZooniverseLogo', function () {
  it('mounts ZooniverseLogo', function () {
    const wrapper = mount(<ZooniverseLogo />)
    expect(wrapper.find('ZooniverseLogo')).to.have.length(1)
  })

  it('has a unique aria-labelledby for each instance mounted', function () {
    const wrapper = mount(<div><ZooniverseLogo /><ZooniverseLogo /></div>)
    const firstSVGlabel = wrapper.find('svg').first().prop('aria-labelledby')
    const secondSVGlabel = wrapper.find('svg').last().prop('aria-labelledby')
    expect(firstSVGlabel).to.not.equal(secondSVGlabel)
  })
})
