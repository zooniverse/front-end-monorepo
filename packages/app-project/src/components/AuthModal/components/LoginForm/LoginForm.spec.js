import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import LoginForm from './LoginForm'

let wrapper

describe('Component > LoginForm', function () {
  let onSubmitStub = sinon.stub()
  before(function () {
    wrapper = shallow(<LoginForm onSubmit={onSubmitStub} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })


  it('should call the `onSubmit` prop on submission', function () {
    const form = wrapper.find(Formik).dive().find({ as: 'form' })

    form.simulate('submit', {
      preventDefault: () => { }
    })

    // on submit wasn't being called without the timeout
    window.setTimeout(() => {
      expect(onSubmitStub).to.have.been.calledOnce
      done()
    }, 0)
  })
})
