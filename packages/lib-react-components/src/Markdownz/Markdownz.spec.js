import React from 'react'
import { shallow } from 'enzyme'
import Markdownz from './Markdownz'

const content = '#Zooniverse'

describe('<Markdownz />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<Markdownz>{content}</Markdownz>)
  })

  it('renders without crashing', function () { })
})
