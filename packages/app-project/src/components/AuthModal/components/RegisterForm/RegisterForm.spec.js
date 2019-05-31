import { shallow } from 'enzyme'
import React from 'react'

import RegisterForm from './RegisterForm'

let wrapper

describe.only('Component > RegisterForm', function () {
  before(function () {
    wrapper = shallow(<RegisterForm />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should call the `onSubmit` prop on submission', function () {
    // https://github.com/jaredpalmer/formik/blob/f5d76609b222ce583663add279ac76e807e2d0ba/README.md#testing-formik
  })

  describe('fields', function () {
    let rendered

    before(function () {
      rendered = wrapper.render()
    })

    it('should have a username field', function () {
      const input = rendered.find('[name="username"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('text')
      expect(input.attr('required')).to.equal('required')
    })

    it('should have a password field', function () {
      const input = rendered.find('[name="password"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('password')
      expect(input.attr('required')).to.equal('required')
      expect(input.prop('minlength')).to.equal('8')
    })

    it('should have a passwordConfirm field', function () {
      const input = rendered.find('[name="password"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('password')
      expect(input.attr('required')).to.equal('required')
      expect(input.prop('minlength')).to.equal('8')
    })

    it('should have an email field', function () {
      const input = rendered.find('[name="email"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('email')
      expect(input.attr('required')).to.equal('required')
    })

    it('should have a realName field', function () {
      const input = rendered.find('[name="realName"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('text')
      expect(input.attr('required')).to.be.undefined()
    })
  })
})
