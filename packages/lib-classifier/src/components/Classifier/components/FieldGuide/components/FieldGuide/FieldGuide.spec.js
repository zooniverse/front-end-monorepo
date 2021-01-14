import { shallow, mount } from 'enzyme'
import React from 'react'
import { MovableModal } from '@zooniverse/react-components'
import { observable } from 'mobx'
import en from './locales/en'
import FieldGuide from './FieldGuide'
import FieldGuideItem from './components/FieldGuideItem'
import FieldGuideItems from './components/FieldGuideItems'
import { FieldGuideFactory, FieldGuideMediumFactory } from '@test/factories'

const medium = FieldGuideMediumFactory.build()
const fieldGuide = FieldGuideFactory.build({
  items: [
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
})
const icons = observable.map({
  [medium.id]: medium
})

describe('Component > FieldGuide', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuide
        fieldGuide={fieldGuide}
      />)
    expect(wrapper).to.be.ok()
  })

  describe('modal render', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <FieldGuide
          fieldGuide={fieldGuide}
        />)
    })

    it('should render a MovableModal', function () {
      expect(wrapper.find(MovableModal)).to.have.lengthOf(1)
    })

    it('should render at a default minimum size', function () {
      const minHeight = '415px'
      const minWidth = '490px'
      const { rndProps } = wrapper.find(MovableModal).props()
      expect(rndProps.minHeight).to.equal(minHeight)
      expect(rndProps.minWidth).to.equal(minWidth)
    })

    it('should render a title', function () {
      expect(wrapper.find(MovableModal).props().title).to.equal(en.FieldGuide.title)
    })
  })

  describe('when there is not an active item', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <FieldGuide
          fieldGuide={fieldGuide}
          icons={icons}
          setActiveItemIndex={() => {}}
        />)
    })

    it('should render FieldGuideItems', function () {
      expect(wrapper.find(FieldGuideItems)).to.have.lengthOf(1)
      expect(wrapper.find(FieldGuideItem)).to.have.lengthOf(0)
    })

    it('should pass the expected props to FieldGuideItems', function () {
      const props = wrapper.find(FieldGuideItems).props()
      expect(props.items).to.equal(fieldGuide.items)
      expect(props.icons).to.equal(icons)
      expect(props.setActiveItemIndex).to.be.a('function')
    })
  })

  describe('when there is an active item', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <FieldGuide
          activeItemIndex={0}
          fieldGuide={fieldGuide}
          icons={icons}
          setActiveItemIndex={() => { }}
        />)
    })

    it('should render FieldGuideItem if there is an active item', function () {
      expect(wrapper.find(FieldGuideItems)).to.have.lengthOf(0)
      expect(wrapper.find(FieldGuideItem)).to.have.lengthOf(1)
    })

    it('should pass the expected props to FieldGuideItem', function () {
      const props = wrapper.find(FieldGuideItem).props()
      expect(props.item).to.equal(fieldGuide.items[0])
      expect(props.icons).to.equal(icons)
      expect(props.setActiveItemIndex).to.be.a('function')
    })
  })
})
