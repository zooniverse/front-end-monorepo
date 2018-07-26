import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Button from './Button'

describe('Component > Button', function () {
  it('should render without crashing', function () {
    shallow(<Button />)
  })

  it('should call the onBlur prop function on blur', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button
        onBlur={spy}
      />
    )

    wrapper.find('button').simulate('blur')
    expect(spy.called).to.be.true
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button
        onClick={spy}
      />
    )

    wrapper.find('button').simulate('click')
    expect(spy.called).to.be.true
  })

  it('should call the onFocus prop function on focus', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button
        onFocus={spy}
      />
    )

    wrapper.find('button').simulate('focus')
    expect(spy.called).to.be.true
  })

  it('should call the onMouseOver prop function on mouse over', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button
        onMouseOver={spy}
      />
    )

    wrapper.find('button').simulate('mouseover')
    expect(spy.called).to.be.true
  })

  it('should call the onMouseOut prop function on mouse out', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <Button
        onMouseOut={spy}
      />
    )

    wrapper.find('button').simulate('mouseout')
    expect(spy.called).to.be.true
  })
})