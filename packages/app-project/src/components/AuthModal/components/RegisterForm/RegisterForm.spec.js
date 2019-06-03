import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Formik } from 'formik'
import RegisterForm from './RegisterForm'

let wrapper

describe.only('Component > RegisterForm', function () {
  let onSubmitStub
  before(function () {
    onSubmitStub = sinon.stub()
    wrapper = shallow(<RegisterForm onSubmit={onSubmitStub} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should call the `onSubmit` prop on submission', function (done) {
    const form = wrapper.find(Formik).dive().find({ as: 'form' })

    form.simulate('submit', {
      preventDefault: () => { }
    })

    // on submit wasn't being called without the timeout
    window.setTimeout(() => {
      expect(onSubmitStub).to.have.been.calledOnce
      console.log(onSubmitStub.callCount)
      done()
    }, 0)
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
      const input = rendered.find('[name="passwordConfirm"]')
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

    it('should have an emailConfirm field', function () {
      const input = rendered.find('[name="emailConfirm"]')
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
