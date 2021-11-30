import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import DoneButton from './DoneButton'

describe('DoneButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DoneButton />)
    expect(wrapper).to.be.ok()
  })

  describe('when there is another workflow step', function () {
    it('should render null', function () {
      const wrapper = shallow(<DoneButton hasNextStep />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('on click', function () {
    it('should call the onClick callback', function () {
      const onClick = sinon.spy()
      const preventDefault = sinon.spy()
      const wrapper = shallow(<DoneButton onClick={onClick} />)
      wrapper.simulate('click', { preventDefault })
      expect(onClick).to.have.been.calledOnce()
    })
  })
})
