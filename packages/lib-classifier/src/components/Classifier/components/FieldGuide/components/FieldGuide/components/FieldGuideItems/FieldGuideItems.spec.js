import { shallow, mount } from 'enzyme'
import React from 'react'
import { Grid } from 'grommet'
import FieldGuideItems from './FieldGuideItems'
import FieldGuideItemAnchor from './FieldGuideItemAnchor'
import { FieldGuideMediumFactory } from '../../../../../../../../../test/factories'

const medium = FieldGuideMediumFactory.build()
const items = [
  {
    title: 'Cat',
    icon: medium.id,
    content: 'lorem ipsum'
  },
  {
    title: 'Dog',
    content: 'Foo bar'
  },
  { title: 'Iguana', content: 'hello' },
  { title: 'Koala', content: '' },
  { title: 'Dragon', content: 'Why is this here?' }
]

describe('Component > FieldGuideItems', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
      />)
    expect(wrapper).to.be.ok
  })

  it('should render a Grid component', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
      />)
    expect(wrapper.find(Grid)).to.be.lengthOf(1)
  })

  it('should render a FieldGuideItemAnchor equal to the number of items', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
      />)
    expect(wrapper.find(FieldGuideItemAnchor)).to.be.lengthOf(items.length)
  })
})