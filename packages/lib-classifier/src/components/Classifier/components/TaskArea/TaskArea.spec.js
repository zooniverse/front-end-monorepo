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

  it('should render a question from the active task', function () {
    const task = {}
    task.question = 'This is a sample question'
    const wrapper = shallow(<TaskArea task={task} />)
    expect(wrapper.text()).to.have.string(task.question)
  })
})
