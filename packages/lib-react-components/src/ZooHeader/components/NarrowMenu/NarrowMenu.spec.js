import { shallow } from 'enzyme'
import React from 'react'
import { Menu } from 'grommet'
import { Menu as MenuIcon } from 'grommet-icons'
import NarrowMenu from './NarrowMenu'

const items = [
  { label: 'first', href: 'https://zooniverse/org' },
  { label: 'second', href: 'https://chimpandsee.org' }
]

describe('NarrowMenu', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<NarrowMenu icon={<MenuIcon />} items={items} />)
  })

  it('renders without crashing', function () { })

  it('renders a Grommet Menu', function () {
    expect(wrapper.find(Menu)).to.have.lengthOf(1)
  })
})
