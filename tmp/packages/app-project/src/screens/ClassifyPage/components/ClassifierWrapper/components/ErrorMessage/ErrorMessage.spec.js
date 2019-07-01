import { shallow } from 'enzyme'
import React from 'react'

import ErrorMessage from './ErrorMessage'

let wrapper

const ERROR_WITHOUT_STACK = {
  message: 'There was some kind of error!',
  name: 'FoobarError'
}

const ERROR_WITH_STACK = {
  ...ERROR_WITHOUT_STACK,
  stack: 'Foobar foobar foobar foobar foobar foobar foobar foobar.'
}

describe('Component > ErrorMessage', function () {
  before(function () {
    wrapper = shallow(<ErrorMessage error={ERROR_WITH_STACK} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the full stack trace if available', function () {
    const text = wrapper.find('Text').render().text()
    expect(text).to.equal(ERROR_WITH_STACK.stack)
  })

  it('should show the error name and message if there is no stack trace', function () {
    const wrapper = shallow(<ErrorMessage error={ERROR_WITHOUT_STACK} />)
    const text = wrapper.find('Text').render().text()
    expect(text).to.equal(`${ERROR_WITHOUT_STACK.name}: ${ERROR_WITHOUT_STACK.message}`)
  })
})
