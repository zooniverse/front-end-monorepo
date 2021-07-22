import React from 'react'
import { shallow } from 'enzyme'
import { PlainButton } from './PlainButton'
import { expect } from 'chai'
import { Grommet } from 'grommet'

describe('<PlainButton />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<PlainButton text='Click me' />, { wrappingComponent: <Grommet /> })
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a plain Grommet Button', function () {
    expect(wrapper.props().plain).to.be.true()
  })

  it('should render a span when the button is disabled and href is defined', function () {
    wrapper.setProps({ disabled: true, href: 'www.google.com' })
    expect(wrapper.props().as).to.equal('span')
  })
})
