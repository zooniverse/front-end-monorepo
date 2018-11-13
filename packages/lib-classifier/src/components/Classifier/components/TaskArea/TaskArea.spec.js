import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import TaskArea from './TaskArea'
import Tasks from './components/Tasks'
import Tutorial from './components/Tutorial'

let wrapper

describe('TaskArea', function () {
  before(function () {
    wrapper = shallow(<TaskArea />)
  })

  it('should render without crashing', function () {})

  it('should render the `Tasks` component', function () {
    expect(wrapper.find(Tasks)).to.have.lengthOf(1)
  })

  it('should render the `Tutorial` component', function () {
    expect(wrapper.find(Tutorial)).to.have.lengthOf(1)
  })
})
