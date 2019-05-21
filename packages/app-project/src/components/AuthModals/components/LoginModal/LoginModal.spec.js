import { mount, shallow } from 'enzyme'
import React from 'react'
import { Form, Text, TextInput } from 'grommet'
import sinon from 'sinon'

import LoginModal from './LoginModal'

let wrapper

describe.only('Component > LoginModal', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<LoginModal
      closeLoginModal={sinon.spy()}
      loading={false}
      onSubmit={sinon.spy()}
    />)
    expect(wrapper).to.be.ok()
  })

  it('should disable the inputs when loading', function () {
    wrapper = shallow(<LoginModal
      closeLoginModal={sinon.spy()}
      loading
      onSubmit={sinon.spy()}
    />)
    wrapper.find(TextInput).forEach((component) => {
      expect(component.props().disabled).to.be.true()
    })
  })

  it('should call props.onSubmit when the form submits', function () {
    wrapper = shallow(<LoginModal
      closeLoginModal={sinon.spy()}
      loading={false}
      onSubmit={sinon.spy()}
    />)
    wrapper.find(Form).simulate('submit')
    expect(wrapper.props().onSubmit).to.have.been.calledOnce
  })

  it('should render error messages', function () {
    const error = 'Invalid email or password'
    wrapper = shallow(<LoginModal
      closeLoginModal={sinon.spy()}
      error={error}
      loading={false}
      onSubmit={sinon.spy()}
    />)

    const errorText = wrapper.find(Text)
    expect(errorText).to.have.lengthOf(1)
    expect(errorText.html().includes(error)).to.be.true()
  })

  it('should create a ref for the first input', function () {
    wrapper = shallow(<LoginModal
      closeLoginModal={sinon.spy()}
      loading={false}
      onSubmit={sinon.spy()}
    />)

    expect(wrapper.instance().firstInput.current).to.not.be.null()
  })
})
