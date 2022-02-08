import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import RotateButton from './RotateButton'
import i18n from '@test/i18n/i18n-for-tests'

describe('Component > RotateButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<RotateButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` prop', function () {
    const useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
    const wrapper = shallow(<RotateButton />)
    expect(wrapper.prop('a11yTitle')).exists()
    expect(useTranslationStub).to.have.been.calledWith('ImageToolbar.RotateButton.ariaLabel')
    useTranslationStub.restore()
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <RotateButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
