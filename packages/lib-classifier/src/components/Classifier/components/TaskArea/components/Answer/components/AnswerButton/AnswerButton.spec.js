import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import AnswerButton from './AnswerButton'

describe('Component > AnswerButton', function () {
  it('should render without crashing', function () {
    shallow(<AnswerButton />)
  })

  it('should use the `label` prop as the button text', function () {
    const label = 'foobar'
    const wrapper = mount(<AnswerButton label={label} />)
    expect(wrapper.text()).to.equal(label)
  })

  it('should call the `onButtonClick` prop when clicked', function () {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<AnswerButton onButtonClick={onButtonClick} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick.called).to.equal(true)
  })

  it('should have an `aria-pressed` property based on the `active` prop', function () {
    const wrapper = mount(<AnswerButton active={true} />)
    expect(wrapper.find('button').prop('aria-pressed')).to.equal(true)
  })
})
