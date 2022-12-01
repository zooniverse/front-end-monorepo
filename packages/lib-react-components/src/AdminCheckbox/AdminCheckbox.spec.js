import { shallow } from 'enzyme'
import sinon from 'sinon'
import AdminCheckbox from './AdminCheckbox'
import { CheckBox } from 'grommet'

describe('<AdminCheckbox />', function () {
  let wrapper
  const onChangeSpy = sinon.spy()
  before(function () {
    wrapper = shallow(<AdminCheckbox onChange={onChangeSpy} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('calls onChange prop when clicked', function () {
    wrapper.find(CheckBox).simulate('change')
    expect(onChangeSpy).to.have.been.calledOnce()
  })
})
