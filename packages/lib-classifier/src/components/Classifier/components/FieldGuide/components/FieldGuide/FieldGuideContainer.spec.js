import { shallow } from 'enzyme'
import React from 'react'
import { MovableModal, Modal } from '@zooniverse/react-components'
import en from './locales/en'
import FieldGuideContainer from './FieldGuideContainer'
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

describe('Component > FieldGuideContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideContainer
        fieldGuide={fieldGuide}
      />)
    expect(wrapper).to.be.ok()
  })

  describe('when the window size is not small', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <FieldGuideContainer
          fieldGuide={fieldGuide}
        />)
    })

    it('should render a MovableModal', function () {
      expect(wrapper.props().modalComponent).to.equal(MovableModal)
    })

    it('should pass along props for the MovableModal', function () {
      expect(wrapper.props().modalProps.rndProps).to.exist()
    })

    it('should render at a default minimum size', function () {
      const minHeight = 415
      const minWidth = 490
      const { modalProps } = wrapper.props()
      expect(modalProps.rndProps.minHeight).to.equal(minHeight)
      expect(modalProps.rndProps.minWidth).to.equal(minWidth)
    })

    it('should render a title', function () {
      expect(wrapper.props().modalProps.title).to.equal(en.FieldGuide.title)
    })

    it('should set the boxHeight and boxWidth to their minimum sizes', function () {
      expect(wrapper.props().boxHeight).to.equal('415px')
      expect(wrapper.props().boxWidth).to.equal('490px')
    })

    it('should set the movable modal height to auto on resize', function () {
      expect(wrapper.props().modalProps.rndProps.position.height).to.equal(415)
      wrapper.props().modalProps.rndProps.onResize()
      expect(wrapper.props().modalProps.rndProps.position.height).to.equal('auto')
    })
  })

  describe('when the window size is small', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <FieldGuideContainer
          fieldGuide={fieldGuide}
          size='small'
        />)
    })

    it('should render a Modal', function () {
      expect(wrapper.props().modalComponent).to.equal(Modal)
    })

    it('should render a title', function () {
      expect(wrapper.props().modalProps.title).to.equal(en.FieldGuide.title)
    })

    it('should set the boxHeight and boxWidth to 100%', function () {
      expect(wrapper.props().boxHeight).to.equal('100%')
      expect(wrapper.props().boxWidth).to.equal('100%')
    })

    it('should not pass along props for the MovableModal', function () {
      expect(wrapper.props().modalProps.rndProps).to.be.undefined()
    })
  })
})
