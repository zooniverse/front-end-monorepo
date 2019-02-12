import { shallow } from 'enzyme'
import React from 'react'

import LinkList from './LinkList'

let wrapper

let LABELS = [
  'Google'
]

let URLS = [
  'https://www.google.com'
]



describe('Component > LinkList', function () {
  before(function () {
    wrapper = shallow(<LinkList labels={LABELS} urls={URLS}  />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
