import { shallow } from 'enzyme'
import React from 'react'
import RegisterForm from './RegisterForm'

let wrapper

describe('Component > RegisterForm', function () {
  before(function () {
    wrapper = shallow(<RegisterForm onSubmit={() => {}} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a general error message if defined', function () {
    wrapper.setProps({ generalError: 'Something went wrong' })
    expect(wrapper.find({ role: 'alert' })).to.have.lengthOf(1)
  })
})
