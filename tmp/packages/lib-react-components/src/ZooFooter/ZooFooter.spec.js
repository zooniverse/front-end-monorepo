import React from 'react'
import { mount, shallow } from 'enzyme'
import zooTheme from '@zooniverse/grommet-theme'

import ZooFooter from './ZooFooter'

describe('<ZooFooter />', function () {
  let wrapper

  it('renders without crashing', function () {
    wrapper = shallow(<ZooFooter />)
  })
})
