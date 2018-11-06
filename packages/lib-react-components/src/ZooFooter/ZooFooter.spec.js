import React from 'react'
import { mount, shallow } from 'enzyme'
import zooTheme from '@zooniverse/grommet-theme'

import ZooFooter from './ZooFooter'

describe('<ZooFooter />', function () {
  let wrapper

  it('renders without crashing', function () {
    wrapper = shallow(<ZooFooter />)
  })

  describe('light theme', function () {
    it('should use a white background for its wrapping Box component', function () {
      wrapper = mount(<ZooFooter />)
      const boxWrapper = wrapper.find('Box').first()
      expect(boxWrapper.props().background).to.equal('#fff')
    })
  })

  describe('dark theme', function () {
    it('should use the dark theme background color for its wrapping Box component', function () {
      wrapper = mount(<ZooFooter colorTheme='dark' />)
      const boxWrapper = wrapper.find('Box').first()
      expect(boxWrapper.props().background).to.equal(zooTheme.dark.colors.background.default)
    })
  })
})
