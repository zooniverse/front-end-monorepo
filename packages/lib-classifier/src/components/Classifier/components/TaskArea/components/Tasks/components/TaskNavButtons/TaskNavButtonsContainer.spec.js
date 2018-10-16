import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import TaskNavButtonsContainer from './TaskNavButtonsContainer'

describe('TaskNavButtonsContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskNavButtonsContainer />)
    expect(wrapper).to.be.ok
  })
})
