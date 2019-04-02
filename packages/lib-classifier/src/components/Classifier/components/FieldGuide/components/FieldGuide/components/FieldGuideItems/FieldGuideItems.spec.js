import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { Grid } from 'grommet'
import FieldGuideItems from './FieldGuideItems'
import FieldGuideItemButton from './FieldGuideItemButton'
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

  it('should render a Grid row for every 4 items', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
      />)
    expect(wrapper.find(Grid)).to.be.lengthOf(2)
  })

  it('should render a FieldGuideItemButton as a child of the Grid row', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
      />)
    expect(wrapper.find(FieldGuideItemButton)).to.be.lengthOf(wrapper.find(Grid).length)
  })
})