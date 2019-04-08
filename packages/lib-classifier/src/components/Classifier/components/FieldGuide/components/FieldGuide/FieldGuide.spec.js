import { shallow, mount } from 'enzyme'
import React from 'react'
import FieldGuide from './FieldGuide'
import FieldGuideItem from './components/FieldGuideItem'
import FieldGuideItems from './components/FieldGuideItems'
import { FieldGuideFactory, FieldGuideMediumFactory } from '../../../../../../../test/factories'

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

describe('Component > FieldGuide', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuide.wrappedComponent
        items={items}
      />)
    expect(wrapper).to.be.ok
  })

  xit('should render FieldGuideItems if there is not an active item', function () {
    const wrapper = shallow(
      <FieldGuide.wrappedComponent
        items={items}
      />)
    expect(wrapper.find(FieldGuideItems)).to.have.lengthOf(1)
    expect(wrapper.find(FieldGuideItem)).to.have.lengthOf(0)
  })

  xit('should render FieldGuideItem if there is an active item', function () {
    const wrapper = mount(
      <FieldGuide.wrappedComponent
        activeItemIndex={0}
        items={items}
      />)
    expect(wrapper.find(FieldGuideItems)).to.have.lengthOf(0)
    expect(wrapper.find(FieldGuideItem)).to.have.lengthOf(1)
  })
})