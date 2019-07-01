import { Button } from 'grommet'
import { shallow } from 'enzyme'
import React from 'react'

import TaskHelp, { StyledPlainButton as NeedHelpButton } from './TaskHelp'

const tasks = [{
  taskKey: 'init',
  help: '# Try this'
}]

describe('TaskHelp', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskHelp.wrappedComponent tasks={tasks} />)
    expect(wrapper).to.be.ok
  })

  it('should render null if there is no task help', function () {
    const wrapper = shallow(<TaskHelp.wrappedComponent isThereTaskHelp={false} tasks={[{ taskKey: 'init' }]} />)
    expect(wrapper.html()).to.be.null
  })

  it('should render the modal when the need help button is clicked', function () {
    const wrapper = shallow(<TaskHelp.wrappedComponent isThereTaskHelp tasks={tasks} />)
    wrapper.find(NeedHelpButton).simulate('click')
    expect(wrapper.state('showModal')).to.be.true
  })

  it('should no longer render the modal when the close button is clicked', function () {
    const wrapper = shallow(<TaskHelp.wrappedComponent isThereTaskHelp tasks={tasks} />)
    wrapper.setState({ showModal: true })
    wrapper.find(Button).simulate('click')
    expect(wrapper.state('showModal')).to.be.false
  })
})
