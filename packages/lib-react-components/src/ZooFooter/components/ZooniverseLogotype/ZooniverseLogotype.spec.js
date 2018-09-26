/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { mount } from 'enzyme'
import React from 'react'
import ZooniverseLogotype from './ZooniverseLogotype'

describe('ZooniverseLogotype', function () {
  it('mounts ZooniverseLogotype', function () {
    const wrapper = mount(<ZooniverseLogotype />)
    expect(wrapper.find(ZooniverseLogotype)).to.have.length(1)
  })

  it('has a unique aria-labelledby for each instance mounted', function () {
    const wrapper = mount(<div><ZooniverseLogotype /><ZooniverseLogotype /></div>)
    const firstSVGlabel = wrapper.find('svg').first().prop('aria-labelledby')
    const secondSVGlabel = wrapper.find('svg').last().prop('aria-labelledby')
    expect(firstSVGlabel).to.not.equal(secondSVGlabel)
  })
})
