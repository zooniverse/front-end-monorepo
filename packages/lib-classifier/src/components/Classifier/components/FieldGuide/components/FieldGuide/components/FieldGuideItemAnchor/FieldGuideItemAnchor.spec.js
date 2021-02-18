import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import FieldGuideItemAnchor, { AnchorLabel } from './FieldGuideItemAnchor'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import { FieldGuideMediumFactory } from '@test/factories'

const mediumOne = FieldGuideMediumFactory.build()
const mediumTwo = FieldGuideMediumFactory.build()
const attachedMedia = observable.map()
attachedMedia.set(mediumOne.id, mediumOne)
attachedMedia.set(mediumTwo.id, mediumTwo)
const item = {
  title: 'Cat',
  icon: mediumOne.id,
  content: 'lorem ipsum'
}
const itemIndex = 0

describe('Component > FieldGuideItemAnchor', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItemAnchor
        icons={attachedMedia}
        item={item}
        itemIndex={itemIndex}
        setActiveItemIndex={() => {}}
      />)
    expect(wrapper).to.be.ok()
  })

  it('should use AnchorLabel as the label', function () {
    const wrapper = mount(
      <FieldGuideItemAnchor
        icons={attachedMedia}
        item={item}
        itemIndex={itemIndex}
        setActiveItemIndex={() => { }}
      />)
    expect(wrapper.find(Anchor).props().label.type).to.equal(AnchorLabel)
  })

  it('should call setActiveItemIndex on click', function () {
    const setActiveItemIndexSpy = sinon.spy()
    const wrapper = mount(
      <FieldGuideItemAnchor
        icons={attachedMedia}
        item={item}
        itemIndex={itemIndex}
        setActiveItemIndex={setActiveItemIndexSpy}
      />)

    wrapper.find(Anchor).simulate('click', { preventDefault: () => {} })
    expect(setActiveItemIndexSpy).to.have.been.calledOnceWith(itemIndex)
  })

  describe('Component > AnchorLabel', function () {
    it('should render without crashing', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)
      expect(wrapper).to.be.ok()
    })

    it('should render the item title as markdown', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)
      expect(wrapper.find(Markdownz).contains(item.title)).to.be.true()
    })

    it('should render an FieldGuideItemIcon component', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)

      expect(wrapper.find(FieldGuideItemIcon)).to.have.lengthOf(1)
    })

    it('should render the correct icon', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)
      const icon = wrapper.find(FieldGuideItemIcon)
      expect(icon.props().alt).to.equal(item.title)
      expect(icon.props().icon).to.deep.equal(mediumOne)
    })
  })
})
