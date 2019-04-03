import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz, Media } from '@zooniverse/react-components'
import FieldGuideItemAnchor, { AnchorLabel } from './FieldGuideItemAnchor'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import { FieldGuideMediumFactory } from '../../../../../../../../../test/factories'

const medium = FieldGuideMediumFactory.build()
const attachedMedia = observable.map()
attachedMedia.set(medium.id, medium)
const item = {
  title: 'Cat',
  icon: medium.id,
  content: 'lorem ipsum'
}

describe('Component > FieldGuideItemAnchor', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItemAnchor.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={() => {}}
      />)
    expect(wrapper).to.be.ok
  })

  it('should use AnchorLabel as the label', function () {
    const wrapper = shallow(
      <FieldGuideItemAnchor.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={() => { }}
      />)
    expect(wrapper.props().label.type).to.equal(AnchorLabel)
  })

  it('should call setActiveItemIndex on click', function () {
    const setActiveItemIndexSpy = sinon.spy()
    const wrapper = shallow(
      <FieldGuideItemAnchor.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={setActiveItemIndexSpy}
      />)

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(setActiveItemIndexSpy).to.have.been.calledOnceWith(item)
  })

  describe('Component > AnchorLabel', function () {
    it('should render without crashing', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)
      expect(wrapper).to.be.ok
    })

    it('should render the item title as markdown', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)
      expect(wrapper.find(Markdownz).contains(item.title)).to.be.true
    })

    it('should render an FieldGuideItemIcon component', function () {
      const wrapper = shallow(
        <AnchorLabel
          icons={attachedMedia}
          item={item}
        />)

      expect(wrapper.find(FieldGuideItemIcon)).to.have.lengthOf(1)
    })
  })
})