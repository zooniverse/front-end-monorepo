import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import CloseButton from './CloseButton'

describe('<CloseButton />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<CloseButton closeFn={sinon.spy()} />)
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('calls on the closeFn prop on click', function () {
    wrapper.simulate('click')
    expect(wrapper.props().onClick).to.have.been.calledOnce()
  })

  describe('with a color prop', function () {
    it('should set the icon colour', function () {
      const colouredButton = shallow(<CloseButton color='neutral-6' closeFn={sinon.spy()} />)
      const icon = colouredButton.prop('icon')
      expect(icon.props.color).to.equal('neutral-6')
    })
  })
})
