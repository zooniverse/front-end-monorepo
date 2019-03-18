import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import FeedbackModal from './FeedbackModal'

describe('FeedbackModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should return null if showModal false', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal={false} />)
    expect(wrapper).to.equal(null)
  })
})
