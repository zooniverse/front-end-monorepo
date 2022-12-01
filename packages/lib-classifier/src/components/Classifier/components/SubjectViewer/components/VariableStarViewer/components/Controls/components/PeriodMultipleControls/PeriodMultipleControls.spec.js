import { shallow } from 'enzyme'
import sinon from 'sinon'
import { SpacedText } from '@zooniverse/react-components'
import { FormField } from 'grommet'
import { PeriodMultipleControls, StyledRadioButtonGroup } from './PeriodMultipleControls'

const options = ['0.5', '1', '2', '3'].map((option) => {
  return {
    label: <SpacedText size='10px' style={{ width: '1ch' }} weight='bold'>{option}</SpacedText>,
    value: option
  }
})

describe('Controls > Components > PeriodMultipleControls', function () {
  let wrapper, setPeriodMultipleSpy
  before(function () {
    setPeriodMultipleSpy = sinon.spy()
    wrapper = shallow(
      <PeriodMultipleControls
        options={options}
        periodMultiple={1}
        setPeriodMultiple={setPeriodMultipleSpy}
      />
    )
  })
  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('FormField', function () {
    let formField
    before(function () {
      formField = wrapper.find(FormField)
    })

    it('should render a FormField for the group', function () {
      const group = wrapper.find(StyledRadioButtonGroup)
      expect(formField.props().htmlFor).to.equal(group.props().id)
    })

    it('should have a label for the FormField', function () {
      expect(formField.props().label).exists()
    })
  })

  describe('RadioButtonGroup', function () {
    let group
    before(function () {
      group = wrapper.find(StyledRadioButtonGroup)
    })

    it('should render a RadioButtonGroup', function () {
      expect(group).to.have.lengthOf(1)
    })

    it('should pass the periodMultiple prop as a string', function () {
      expect(group.props().value).to.equal('1')
    })

    it('should call setPeriodMultiple on change', function () {
      group.simulate('change', { target: {} })

      expect(setPeriodMultipleSpy).to.have.been.calledOnceWith({ target: {} })
    })
  })
})
