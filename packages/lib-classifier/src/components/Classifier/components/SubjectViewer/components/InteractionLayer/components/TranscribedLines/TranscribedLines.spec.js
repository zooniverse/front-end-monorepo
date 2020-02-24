import { shallow } from 'enzyme'
import React from 'react'

import TranscribedLines from './TranscribedLines'

let wrapper

describe('Component > TranscribedLines', function () {
  before(function () {
    wrapper = shallow(<TranscribedLines />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('each line', function () {
    it('should have an explanatory tooltip', function () {})

    describe('incomplete lines', function () {
      it('should be red', function () {})
      it('should be focusable', function () {})
      it('should be clickable', function () {})
      it('should create a new mark on click', function () {})
    })

    describe('completed lines',function () {
      it('should be grey', function () {})
      it('should be labelled with the consensus text', function () {})
      it('should show the label on hover', function () {})
      it('should be focusable', function () {})
      it('should show the label on focus', function () {})
      it('should not be clickable')
    })
  })
})
