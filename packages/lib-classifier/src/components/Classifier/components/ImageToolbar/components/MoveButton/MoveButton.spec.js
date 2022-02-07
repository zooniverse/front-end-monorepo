import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MoveButton from './MoveButton'
import i18n from '@test/i18n/i18n-for-tests'

describe('Component > MoveButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MoveButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` label', function () {
    const useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
    const wrapper = shallow(<MoveButton />)
    expect(wrapper.prop('a11yTitle')).exists()
    expect(useTranslationStub).to.have.been.calledWith('ImageToolbar.MoveButton.ariaLabel')
    useTranslationStub.restore()
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <MoveButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
