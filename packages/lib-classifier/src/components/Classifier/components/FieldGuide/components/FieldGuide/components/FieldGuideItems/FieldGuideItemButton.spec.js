import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { observable } from 'mobx'
import { Button } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import FieldGuideItemButton, { Icon, ButtonLabel } from './FieldGuideItemButton'
import { FieldGuideMediumFactory } from '../../../../../../../../../test/factories'

const medium = FieldGuideMediumFactory.build()
const attachedMedia = observable.map()
attachedMedia.set(medium.id, medium)
const row = [{
  title: 'Cat',
  icon: medium.id,
  content: 'lorem ipsum'
}]

describe('Component > FieldGuideItemButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItemButton.wrappedComponent
        icons={attachedMedia}
        row={row}
        setActiveItem={() => {}}
      />)
    expect(wrapper).to.be.ok
  })

  it('should render the number of buttons equal to the number of row items', function () {
    const wrapper = shallow(
      <FieldGuideItemButton.wrappedComponent
        icons={attachedMedia}
        row={row}
        setActiveItem={() => { }}
      />)
    console.log(wrapper.debug())
    expect(wrapper.find('Styled(WithTheme(Button))')).to.have.lengthOf(row.length)
  })

  it('should use ButtonLabel as the label', function () {
    const wrapper = shallow(
      <FieldGuideItemButton.wrappedComponent
        icons={attachedMedia}
        row={row}
        setActiveItem={() => { }}
      />)
    expect(wrapper.find('Styled(WithTheme(Button))').props().label.type).to.equal(ButtonLabel)
  })

  it('should call setActiveItem on click', function () {
    const setActiveItemSpy = sinon.spy()
    const wrapper = shallow(
      <FieldGuideItemButton.wrappedComponent
        icons={attachedMedia}
        row={row}
        setActiveItem={setActiveItemSpy}
      />)

    wrapper.find('Styled(WithTheme(Button))').simulate('click')
    expect(setActiveItemSpy).to.have.been.calledOnceWith(row[0])
  })

  describe('Component > ButtonLabel', function () {
    it('should render without crashing', function () {
      const wrapper = shallow(
        <ButtonLabel
          icons={attachedMedia}
          item={row[0]}
        />)
      expect(wrapper).to.be.ok
    })

    it('should render the item title as markdown', function () {
      const wrapper = shallow(
        <ButtonLabel
          icons={attachedMedia}
          item={row[0]}
        />)
      expect(wrapper.find(Markdownz).contains(row[0].title)).to.be.true
    })

    it('should render an Icon component', function () {
      const wrapper = shallow(
        <ButtonLabel
          icons={attachedMedia}
          item={row[0]}
        />)

      expect(wrapper.find(Icon)).to.have.lengthOf(1)
    })
  })

  describe('Component > Icon', function () {
    const icon = attachedMedia.get(medium.id)
    it('should render without crashing', function () {
      const wrapper = shallow(
        <Icon
          icon={icon}
        />)
      expect(wrapper).to.be.ok
    })

    it('should render a Media component if there is an icon', function () {
      const wrapper = shallow(
        <Icon
          icon={icon}
        />)
      expect(wrapper.find(Media)).to.have.lengthOf(1)
    })

    it('should render a placeholder svg if there is not an icon', function () {
      const wrapper = shallow(<Icon />)
      expect(wrapper.find(Media)).to.have.lengthOf(0)
      expect(wrapper.find('svg')).to.have.lengthOf(1)
    })
  })
})