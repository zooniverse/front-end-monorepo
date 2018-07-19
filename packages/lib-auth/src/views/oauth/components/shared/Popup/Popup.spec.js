import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { Popup } from './Popup'

const spy = sinon.spy()

describe('Component > OAuthApp > Popup', function () {
  it('should render without crashing', function () {
    shallow(<Popup loginFunction={spy} />)
  })

  it('should render its children', function () {
    const string = 'foobar'
    const wrapper = shallow(
      <Popup loginFunction={spy}>
        <div>{string}</div>
      </Popup>
    )

    expect(wrapper.text()).to.equal(string)
  })

  describe('login button', function () {
    it('should exist', function () {
      const wrapper = shallow(<Popup loginFunction={spy} />)
      expect(wrapper.find('Button').length).to.equal(1)
    })

    it('should call the login prop when clicked', function () {
      const wrapper = shallow(<Popup loginFunction={spy} />)
      const button = wrapper.find('Button')
      button.simulate('click')
      expect(spy.called).to.equal(true)
    })
  })
})
