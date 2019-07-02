import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import AnnotateButton from './AnnotateButton'

describe('Component > AnnotateButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<AnnotateButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` prop', function () {
    const wrapper = shallow(<AnnotateButton />)
    expect(wrapper.prop('a11yTitle')).to.equal('Annotate')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <AnnotateButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy.called).to.be.true()
  })
})
