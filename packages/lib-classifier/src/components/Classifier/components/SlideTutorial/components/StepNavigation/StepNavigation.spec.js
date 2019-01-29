import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { FormNext, FormPrevious, Radial, RadialSelected } from 'grommet-icons'
import StepNavigation, { StyledButton } from './StepNavigation'

const steps = [
  { content: '# Welcome'},
  { content: '# Thank you'}
]

describe.only('StepNavigation', function () {
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

  it('should render a radial icon button for each step', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    const buttons = wrapper.find(StyledButton).filterWhere(node => { 
      return !!node.key() && node.key().includes('step-')
    })

    expect(buttons).to.have.lengthOf(steps.length)
  })

  it('should render a filled in radial icon button', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent steps={steps} />)
    const activeButton = wrapper.find({ icon: <RadialSelected /> })
    expect(activeButton).to.have.lengthOf(1)
    expect(activeButton.props().active).to.be.true
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
})