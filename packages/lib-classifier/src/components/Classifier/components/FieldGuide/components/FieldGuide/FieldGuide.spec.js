import { shallow } from 'enzyme'
import React from 'react'
import { MovableModal } from '@zooniverse/react-components'
import { observable } from 'mobx'
import FieldGuide from './FieldGuide'
import FieldGuideItem from './components/FieldGuideItem'
import FieldGuideItems from './components/FieldGuideItems'
import { FieldGuideFactory, FieldGuideMediumFactory } from '@test/factories'

describe('Component > FieldGuide', function () {
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

  const strings = {
    'items.0.title': 'Cat',
    'items.0.content': 'lorem ipsum',
    'items.1.title': 'Dog',
    'items.1.content': 'Foo bar',
    'items.2.title': 'Iguana',
    'items.2.content': 'hello',
    'items.3.title': 'Koala',
    'items.3.content': '',
    'items.4.title': 'Dragon',
    'items.4.content': 'Why is this here?'
  }

  const icons = observable.map({
    [medium.id]: medium
  })

  const minHeight = 415
  const minWidth = 490

  const modalProps = {
    active: true,
    closeFn: () => {},
    modal: false,
    pad: 'medium',
    position: 'right',
    rndProps: {
      minHeight,
      minWidth,
      onResize: () => {},
      position: {
        height: minHeight,
        x: 0 - (minWidth + 60), // width plus margins
        y: 0 - (minHeight + 60) * 0.5 // centers vertically
      }
    },
    title: 'Field Guide'
  }

  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuide
        fieldGuide={fieldGuide}
        modalComponent={MovableModal}
        modalProps={modalProps}
        strings={strings}
      />)
    expect(wrapper).to.be.ok()
  })

  describe('when there is not an active item', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <FieldGuide
          fieldGuide={fieldGuide}
          icons={icons}
          modalComponent={MovableModal}
          modalProps={modalProps}
          strings={strings}
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
      expect(props.onChange).to.be.a('function')
    })
  })

  describe('when there is an active item', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <FieldGuide
          fieldGuide={fieldGuide}
          icons={icons}
          modalComponent={MovableModal}
          modalProps={modalProps}
          strings={strings}
        />)
        wrapper.find(FieldGuideItems).simulate('change', 0)
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
