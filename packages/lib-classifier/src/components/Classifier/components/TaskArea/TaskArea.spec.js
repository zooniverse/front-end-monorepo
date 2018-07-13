import { shallow } from 'enzyme'
import React from 'react'
import TaskArea from './TaskArea'

describe('Component > TaskArea', function () {
  it('should render without crashing', function () {
    shallow(<TaskArea />)
  })

  it('should render nothing if no `task` prop is passed in', function () {
    const wrapper = shallow(<TaskArea task={null} />)
    expect(wrapper.children().length).to.equal(0)
  })
})
