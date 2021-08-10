import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { observable } from 'mobx'
import { Grommet } from 'grommet'
import { zooTheme } from '@zooniverse/grommet-theme'
import FieldGuideWrapper from './FieldGuideWrapper'
import FieldGuide from './components/FieldGuide'
import FieldGuideButton from './components/FieldGuideButton'
import { FieldGuideFactory } from '@test/factories'

describe('Component > FieldGuideWrapper', function () {
  const fieldGuide = FieldGuideFactory.build()
  const icons = observable.map()

  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideWrapper
        activeItemIndex={-1}
        fieldGuide={fieldGuide}
        icons={icons}
        setActiveItemIndex={() => { }}
        setModalVisibility={() => { }}
        showModal={false}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should not show the field guide', function () {
    const wrapper = shallow(
      <FieldGuideWrapper
        activeItemIndex={-1}
        fieldGuide={fieldGuide}
        icons={icons}
        setActiveItemIndex={() => { }}
        setModalVisibility={() => { }}
        showModal={false}
      />
    )
    expect(wrapper.find(FieldGuide)).to.have.lengthOf(0)
  })

  describe('when the field guide is shown', function () {
    let wrapper
    let showModal = true
    const setActiveItemIndexSpy = sinon.spy()
    const setModalVisibilityStub = sinon.stub().callsFake((boolean) => { showModal = boolean })
    beforeEach(function () {
      wrapper = mount(
        <FieldGuideWrapper
          activeItemIndex={-1}
          fieldGuide={fieldGuide}
          icons={icons}
          setActiveItemIndex={setActiveItemIndexSpy}
          setModalVisibility={setModalVisibilityStub}
          showModal={showModal}
        />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    afterEach(function () {
      wrapper.unmount()
    })

    it('should display the FieldGuide based on the showModal prop', function () {
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(1)
    })

    it('should pass the expected props', function () {
      const props = wrapper.find(FieldGuide).props()
      expect(props.activeItemIndex).to.equal(-1)
      expect(props.fieldGuide).to.equal(fieldGuide)
      expect(props.icons).to.equal(icons)
      expect(props.onClose).to.be.a('function')
      expect(props.setActiveItemIndex).to.equal(setActiveItemIndexSpy)
    })

    it('should set the modal visibility to be false with onClose', function () {
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(1)
      wrapper.find(FieldGuide).prop('onClose')()
      expect(setModalVisibilityStub).to.have.been.calledOnceWith(false)
      wrapper.setProps({ showModal })
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(0)
    })
  })

  describe('FieldGuideButton', function () {
    let wrapper
    let showModal = false
    const setModalVisibilityStub = sinon.stub().callsFake((boolean) => { showModal = boolean })
    beforeEach(function () {
      wrapper = mount(
        <FieldGuideWrapper
          activeItemIndex={-1}
          fieldGuide={fieldGuide}
          icons={icons}
          setActiveItemIndex={() => {}}
          setModalVisibility={setModalVisibilityStub}
          showModal={showModal}
        />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    afterEach(function () {
      wrapper.unmount()
    })

    it('should render a FieldGuideButton', function () {
      expect(wrapper.find(FieldGuideButton)).to.have.lengthOf(1)
    })

    it('should pass the expected props', function () {
      const props = wrapper.find(FieldGuideButton).props()
      expect(props.fieldGuide).to.equal(fieldGuide)
      expect(props.onOpen).to.be.a('function')
    })

    it('should set the modal visibility to be true with onOpen', function () {
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(0)
      wrapper.find(FieldGuideButton).prop('onOpen')()
      expect(setModalVisibilityStub).to.have.been.calledOnceWith(true)
      wrapper.setProps({ showModal })
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(1)
    })
  })
})
