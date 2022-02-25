import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Button } from 'grommet'
import { FormNext, FormPrevious } from 'grommet-icons'
import StepNavigation from './StepNavigation'

const steps = [
  { content: '# Welcome' },
  { content: '# Thank you' }
]

describe('StepNavigation', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<StepNavigation />)
    expect(wrapper).to.be.ok()
  })

  it('should render null if there are no steps', function () {
    const wrapper = shallow(<StepNavigation />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render null if there is not more than one step', function () {
    const wrapper = shallow(<StepNavigation steps={[{ content: '# Welcome' }]} />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render a previous button', function () {
    const wrapper = shallow(<StepNavigation steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> })).to.have.lengthOf(1)
  })

  it('should render a next button', function () {
    const wrapper = shallow(<StepNavigation steps={steps} />)
    expect(wrapper.find({ icon: <FormNext /> })).to.have.lengthOf(1)
  })

  it('should render a radio button group', function () {
    const wrapper = shallow(<StepNavigation steps={steps} />)

    expect(wrapper.find('Styled(RadioButtonGroup)')).to.have.lengthOf(1)
  })

  it('should use the steps to set the options on RadioButtonGroup', function () {
    const wrapper = shallow(<StepNavigation steps={steps} />)
    const options = wrapper.find('Styled(RadioButtonGroup)').props().options
    expect(Object.keys(options)).to.have.lengthOf(steps.length)
  })

  it('should set the active value of the RadioButtonGroup', function () {
    const activeStep = 1
    const wrapper = shallow(<StepNavigation stepIndex={activeStep} steps={steps} />)
    const activeValue = wrapper.find('Styled(RadioButtonGroup)').props().value
    expect(activeValue).to.equal(`step-${activeStep}`)
  })

  it('should disable the previous step button when props.activeStep is 0', function () {
    const wrapper = shallow(<StepNavigation steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> }).props().disabled).to.be.true()
    expect(wrapper.find({ icon: <FormNext /> }).props().disabled).to.be.false()
  })

  it('should disable the next step button when props.activeStep is the last step', function () {
    const wrapper = shallow(<StepNavigation stepIndex={1} steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> }).props().disabled).to.be.false()
    expect(wrapper.find({ icon: <FormNext /> }).props().disabled).to.be.true()
  })

  describe('props.onChange', function () {
    let onChangeSpy
    let wrapper
    before(function () {
      onChangeSpy = sinon.spy()
      wrapper = shallow(<StepNavigation onChange={onChangeSpy} steps={steps} />)
    })

    afterEach(function () {
      onChangeSpy.resetHistory()
    })

    it('should call props.onChange on click for each button that is not disabled', function () {
      const buttons = wrapper.find(Button).filterWhere(node => {
        return !node.props().disabled
      })

      buttons.forEach(button => {
        button.simulate('click')
        expect(onChangeSpy).to.have.been.calledOnce()
        onChangeSpy.resetHistory()
      })
    })

    it('should call onChange when the previous step button is clicked with props.activeStep - 1', function () {
      wrapper.setProps({ stepIndex: 1 })
      const prevButton = wrapper.find({ icon: <FormPrevious /> })
      prevButton.simulate('click')
      expect(onChangeSpy).to.have.been.calledOnce()
      expect(onChangeSpy).to.have.been.calledWith(prevButton.props()['data-index'])
    })

    it('should call onChange when the next step button is clicked with props.activeStep + 1', function () {
      const nextButton = wrapper.find({ icon: <FormNext /> })
      nextButton.simulate('click')
      expect(onChangeSpy).to.have.been.calledOnce()
      expect(onChangeSpy).to.have.been.calledWith(nextButton.props()['data-index'])
    })
  })
})
