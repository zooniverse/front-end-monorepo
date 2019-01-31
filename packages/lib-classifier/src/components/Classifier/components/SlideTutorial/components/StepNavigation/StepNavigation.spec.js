import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Button, RadioButton } from 'grommet'
import { FormNext, FormPrevious } from 'grommet-icons'
import StepNavigation from './StepNavigation'

const steps = [
  { content: '# Welcome'},
  { content: '# Thank you'}
]

describe('StepNavigation', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should render null if there are no steps', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent />)
    expect(wrapper.html()).to.be.null
  })

  it('should render null if there is not more than one step', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={[{ content: '# Welcome' }]}/>)
    expect(wrapper.html()).to.be.null
  })

  it('should render a previous button', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> })).to.have.lengthOf(1)
  })

  it('should render a next button', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    expect(wrapper.find({ icon: <FormNext /> })).to.have.lengthOf(1)
  })

  it('should render a radio button for each step', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    const buttons = wrapper.find(RadioButton)

    expect(buttons).to.have.lengthOf(steps.length)
  })

  it('should render a radio button with the checked attribute as true if active', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    const activeButton = wrapper.find(RadioButton).find({ checked: true })
    expect(activeButton).to.have.lengthOf(1)
  })

  it('should disable the previous step button when props.activeStep is 0', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious />}).props().disabled).to.be.true
    expect(wrapper.find({ icon: <FormNext /> }).props().disabled).to.be.false
  })

  it('should disable the next step button when props.activeStep is the last step', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent activeStep={1} steps={steps} />)
    expect(wrapper.find({ icon: <FormPrevious /> }).props().disabled).to.be.false
    expect(wrapper.find({ icon: <FormNext /> }).props().disabled).to.be.true
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
        expect(setTutorialStepSpy).to.have.been.calledOnce
        setTutorialStepSpy.resetHistory()
      })
    })

    it('should call props.setTutorialStep on change for each radio button', function () {
      const buttons = wrapper.find(RadioButton)

      buttons.forEach(button => {
        button.simulate('change')
        expect(setTutorialStepSpy).to.have.been.calledOnce
        setTutorialStepSpy.resetHistory()
      })
    })

    it('should call setTutorialStep when the previous step button is clicked with props.activeStep - 1', function () {
      wrapper.setProps({ activeStep: 1 })
      const prevButton = wrapper.find({ icon: <FormPrevious /> })
      prevButton.simulate('click')
      expect(setTutorialStepSpy).to.have.been.calledOnce
      expect(setTutorialStepSpy).to.have.been.calledWith(prevButton.props()['data-index'])
    })

    it('should call setTutorialStep when a specific step button is clicked with the correct index', function () {
      wrapper.setProps({ activeStep: 0 })
      const buttons = wrapper.find(RadioButton)

      buttons.forEach(button => {
        const buttonIndex = button.props().value
        button.simulate('change')
        expect(setTutorialStepSpy).to.have.been.calledOnce
        expect(setTutorialStepSpy).to.have.been.calledWith(buttonIndex)
        setTutorialStepSpy.resetHistory()
      })
    })

    it('should call setTutorialStep when the next step button is clicked with props.activeStep + 1', function () {
      const nextButton = wrapper.find({ icon: <FormNext /> })
      nextButton.simulate('click')
      expect(setTutorialStepSpy).to.have.been.calledOnce
      expect(setTutorialStepSpy).to.have.been.calledWith(nextButton.props()['data-index'])
    })
  })
})