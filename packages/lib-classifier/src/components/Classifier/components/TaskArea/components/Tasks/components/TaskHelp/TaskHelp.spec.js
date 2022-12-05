import { Modal } from '@zooniverse/react-components'
import { Button } from 'grommet'
import { shallow } from 'enzyme'

import TaskHelp, { StyledPlainButton as NeedHelpButton } from './TaskHelp'

const tasks = [{
  taskKey: 'init',
  help: '# Try this'
}]

describe('TaskHelp', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskHelp tasks={tasks} />)
    expect(wrapper).to.be.ok()
  })

  it('should render the modal when the need help button is clicked', function () {
    const wrapper = shallow(<TaskHelp tasks={tasks} />)
    wrapper.find(NeedHelpButton).simulate('click')
    expect(wrapper.find(Modal).prop('active')).to.be.true()
  })

  it('should no longer render the modal when the close button is clicked', function () {
    const wrapper = shallow(<TaskHelp tasks={tasks} />)
    wrapper.find(NeedHelpButton).simulate('click')
    expect(wrapper.find(Modal).prop('active')).to.be.true()
    wrapper.find(Button).simulate('click')
    expect(wrapper.find(Modal).prop('active')).to.be.false()
  })
})
