import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import AnnotateButton from './AnnotateButton'

describe('Component > AnnotateButton', function () {
  it('should render without crashing', function () {
    shallow(<AnnotateButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<AnnotateButton />)
    expect(wrapper.find('Button').prop('aria-label')).to.equal('Annotate')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <AnnotateButton
        onClick={spy}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(spy.called).to.be.true
  })
})
