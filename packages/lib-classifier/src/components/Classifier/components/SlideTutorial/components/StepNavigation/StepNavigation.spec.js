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
    const wrapper = shallow(<StepNavigation.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })

  it('should render null if there are no steps', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render null if there is not more than one step', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={[{ content: '# Welcome' }]} />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render a previous button', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> })).to.have.lengthOf(1)
  })

  it('should render a next button', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    expect(wrapper.find({ icon: <FormNext /> })).to.have.lengthOf(1)
  })

  it('should render a radio button group', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)

    expect(wrapper.find('Styled(RadioButtonGroup)')).to.have.lengthOf(1)
  })

  it('should use the steps to set the options on RadioButtonGroup', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    const options = wrapper.find('Styled(RadioButtonGroup)').props().options
    expect(Object.keys(options)).to.have.lengthOf(steps.length)
  })

  it('should set the active value of the RadioButtonGroup', function () {
    const activeStep = 1
    const wrapper = shallow(<StepNavigation.wrappedComponent activeStep={activeStep} steps={steps} />)
    const activeValue = wrapper.find('Styled(RadioButtonGroup)').props().value
    expect(activeValue).to.equal(`step-${activeStep}`)
  })

  it('should disable the previous step button when props.activeStep is 0', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> }).props().disabled).to.be.true()
    expect(wrapper.find({ icon: <FormNext /> }).props().disabled).to.be.false()
  })

  it('should disable the next step button when props.activeStep is the last step', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent activeStep={1} steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> }).props().disabled).to.be.false()
    expect(wrapper.find({ icon: <FormNext /> }).props().disabled).to.be.true()
  })

  describe('#onChange', function () {
    let setTutorialStepSpy
    let wrapper
    const step = 1

    before(function () {
      setTutorialStepSpy = sinon.spy()
      wrapper = shallow(<StepNavigation.wrappedComponent setTutorialStep={setTutorialStepSpy} steps={steps} />)
    })

    it('should call setTutorialStep with the value index as a number', function () {
      wrapper.instance().onChange({ target: { value: `step-${step}` } })
      expect(setTutorialStepSpy).to.be.calledOnceWith(step)
    })
  })

  describe('props.setTutorialStep', function () {
    let setTutorialStepSpy
    let wrapper
    before(function () {
      setTutorialStepSpy = sinon.spy()
      wrapper = shallow(<StepNavigation.wrappedComponent setTutorialStep={setTutorialStepSpy} steps={steps} />)
    })

    afterEach(function () {
      setTutorialStepSpy.resetHistory()
    })

    it('should call props.setTutorialStep on click for each button that is not disabled', function () {
      const buttons = wrapper.find(Button).filterWhere(node => {
        return !node.props().disabled
      })

      buttons.forEach(button => {
        button.simulate('click')
        expect(setTutorialStepSpy).to.have.been.calledOnce()
        setTutorialStepSpy.resetHistory()
      })
    })

    it('should call setTutorialStep when the previous step button is clicked with props.activeStep - 1', function () {
      wrapper.setProps({ activeStep: 1 })
      const prevButton = wrapper.find({ icon: <FormPrevious /> })
      prevButton.simulate('click')
      expect(setTutorialStepSpy).to.have.been.calledOnce()
      expect(setTutorialStepSpy).to.have.been.calledWith(prevButton.props()['data-index'])
    })

    it('should call setTutorialStep when the next step button is clicked with props.activeStep + 1', function () {
      const nextButton = wrapper.find({ icon: <FormNext /> })
      nextButton.simulate('click')
      expect(setTutorialStepSpy).to.have.been.calledOnce()
      expect(setTutorialStepSpy).to.have.been.calledWith(nextButton.props()['data-index'])
    })
  })
})
