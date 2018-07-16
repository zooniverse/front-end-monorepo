import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import SingleAnswer from './SingleAnswer'

describe('Component > SingleAnswer', function () {
  it('should render without crashing', function () {
    shallow(<SingleAnswer />)
  })

  it('should render a child for each answer', function () {
    const answers = [{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }]
    const wrapper = shallow(<SingleAnswer answers={answers} />)
    expect(wrapper.children().length).to.equal(answers.length)
    answers.forEach(function (answer) {
      expect(wrapper.find({ label: answer.label }).length).to.equal(1)
    })
  })

  it('should call the `annotation.setValue` prop when `handleClick` is called', function () {
    const spy = sinon.spy()
    const wrapper = shallow(<SingleAnswer annotation={{ setValue: spy }} />)
    wrapper.instance().handleClick()
    expect(spy.called).to.equal(true)
  })
})
