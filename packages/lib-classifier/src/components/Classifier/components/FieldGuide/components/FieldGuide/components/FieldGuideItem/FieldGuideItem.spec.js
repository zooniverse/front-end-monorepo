import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { observable } from 'mobx'
import { Button } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import FieldGuideItem from './FieldGuideItem'
import { FieldGuideMediumFactory } from '../../../../../../../../../test/factories'

const medium = FieldGuideMediumFactory.build()
const attachedMedia = observable.map()
attachedMedia.set(medium.id, medium)
const item = {
  title: 'Cat',
  icon: medium.id,
  content: 'lorem ipsum'
}

describe.only('Component > FieldGuideItem', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItem.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItem={() => { }}
      />)
    expect(wrapper).to.be.ok
  })

  it('should call setActiveItem when the previous button is clicked', function () {
    const setActiveItemSpy = sinon.spy()
    const wrapper = mount(
      <FieldGuideItem.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItem={setActiveItemSpy}
      />)
    wrapper.find(Button).simulate('click')
    expect(setActiveItemSpy).to.have.been.calledOnceWith()
  })

  it('should render the item title as markdown', function () {
    const wrapper = shallow(
      <FieldGuideItem.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItem={() => {}}
      />)

    expect(wrapper.find(Markdownz).first().contains(`### ${item.title}`)).to.be.true
  })

  it('should render the item content as markdown', function () {
    const wrapper = shallow(
      <FieldGuideItem.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItem={() => { }}
      />)

    expect(wrapper.find(Markdownz).last().contains(item.content)).to.be.true
  })

  it('should render a Media component for the icon', function () {
    const wrapper = shallow(
      <FieldGuideItem.wrappedComponent
        icons={attachedMedia}
        item={item}
        setActiveItem={() => { }}
      />)

    expect(wrapper.find(Media)).to.have.lengthOf(1)
    expect(wrapper.find(Media).props().src).to.equal(medium.src)
  })

  it('should not render a Media component if there is no icon', function () {
    const wrapper = shallow(
      <FieldGuideItem.wrappedComponent
        icons={observable.map()}
        item={item}
        setActiveItem={() => { }}
      />)

    expect(wrapper.find(Media)).to.have.lengthOf(0)
  })
})