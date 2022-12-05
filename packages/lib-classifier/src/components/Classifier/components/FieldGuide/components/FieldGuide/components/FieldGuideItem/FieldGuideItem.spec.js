import { Markdownz } from '@zooniverse/react-components'
import { shallow, mount } from 'enzyme'
import { Button, Grommet } from 'grommet'
import { observable } from 'mobx'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import { FieldGuideItem } from './FieldGuideItem'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import { FieldGuideMediumFactory } from '@test/factories'

const medium = FieldGuideMediumFactory.build()
const attachedMedia = observable.map().set(medium.id, medium)
const item = {
  title: 'Cat',
  icon: medium.id,
  content: 'lorem ipsum'
}

describe('Component > FieldGuideItem', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItem
        content='lorem ipsum'
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={() => { }}
        title='Cat'
      />,
      { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } })
    expect(wrapper).to.be.ok()
  })

  it('should call setActiveItemIndex when the previous button is clicked', function () {
    const setActiveItemIndexSpy = sinon.spy()
    const wrapper = mount(
      <FieldGuideItem
        content='lorem ipsum'
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={setActiveItemIndexSpy}
        title='Cat'
      />,
      { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } })
    wrapper.find(Button).simulate('click')
    expect(setActiveItemIndexSpy).to.have.been.calledOnceWith()
  })

  it('should render the item title as markdown', function () {
    const wrapper = shallow(
      <FieldGuideItem
        content='lorem ipsum'
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={() => {}}
        title='Cat'
      />,
      { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } })

    expect(wrapper.find(Markdownz).first().contains(`### ${item.title}`)).to.be.true()
  })

  it('should render the item content as markdown', function () {
    const wrapper = shallow(
      <FieldGuideItem
        content='lorem ipsum'
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={() => { }}
        title='Cat'
      />,
      { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } })

    expect(wrapper.find(Markdownz).last().contains(item.content)).to.be.true()
  })

  it('should render a FieldGuideItemIcon component for the icon', function () {
    const wrapper = shallow(
      <FieldGuideItem
        content='lorem ipsum'
        icons={attachedMedia}
        item={item}
        setActiveItemIndex={() => { }}
        title='Cat'
      />,
      { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } })

    expect(wrapper.find(FieldGuideItemIcon)).to.have.lengthOf(1)
  })
})
