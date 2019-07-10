import React from 'react'
import { shallow, mount } from 'enzyme'

import Tab from './Tab'
import SpacedText from '../SpacedText'

describe('<Tab />', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Tab title='Foobar' />)
    expect(wrapper).to.be.ok()
  })

  it('should render the `title` prop using the SpacedText component if it\'s a string', function () {
    const TITLE = 'Foobar'
    const wrapper = mount(<Tab title={TITLE} />)
    const tabTitle = wrapper.find(SpacedText)
    expect(tabTitle).to.have.lengthOf(1)
    expect(tabTitle.text()).to.equal(TITLE)
  })

  it('should should pass through the `title` prop if it\'s a component', function () {
    const TITLE = () => (<div>Foobar</div>)
    const wrapper = mount(<Tab title={<TITLE />} />)
    const tabTitle = wrapper.find(TITLE)
    expect(tabTitle).to.have.lengthOf(1)
  })
})
