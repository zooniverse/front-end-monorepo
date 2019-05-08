import React from 'react'
import { shallow } from 'enzyme'
import PlainButton from './PlainButton'

describe('<PlainButton />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<PlainButton text='Click me' />)
  })

  it('renders without crashing', function () { })
})
