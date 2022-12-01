import { shallow } from 'enzyme'
import sinon from 'sinon'
import AnnotateButton from './AnnotateButton'
import i18n from '@test/i18n/i18n-for-tests'

describe('Component > AnnotateButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<AnnotateButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` prop', function () {
    const useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
    const wrapper = shallow(<AnnotateButton />)
    expect(wrapper.prop('a11yTitle')).exists()
    expect(useTranslationStub).to.have.been.calledWith('ImageToolbar.AnnotateButton.ariaLabel')
    useTranslationStub.restore()
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <AnnotateButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
