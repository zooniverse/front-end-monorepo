import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import FieldGuideConnector from './FieldGuideConnector'
import FieldGuideWrapper from './FieldGuideWrapper'

const mockStoreSnapshot = {
  classifierStore: {
    fieldGuide: {
      active: '1',
      attachedMedia: {
        2: {
          id: '2',
          src: 'media.jpg'
        }
      },
      activeItemIndex: -1,
      setActiveItemIndex: () => {},
      setModalVisibility: () => {},
      showModal: false
    }
  }
}

describe('FieldGuideConnector', function () {
  let wrapper, useContextMock, containerProps
  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStoreSnapshot)
    wrapper = shallow(
      <FieldGuideConnector foo='bar' />
    )
    containerProps = wrapper.find(FieldGuideWrapper).props()
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the active field guide as a prop', function () {
    expect(containerProps.fieldGuide).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.active)
  })

  it('should pass the attached media as the icons prop', function () {
    expect(containerProps.icons).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.attachedMedia)
  })

  it('should pass the activeItemIndex as a prop', function () {
    expect(containerProps.activeItemIndex).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.activeItemIndex)
  })

  it('should pass the setActiveItemIndex function', function () {
    expect(containerProps.setActiveItemIndex).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.setActiveItemIndex)
  })

  it('should pass the setModalVisibility function', function () {
    expect(containerProps.setModalVisibility).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.setModalVisibility)
  })

  it('should pass the showModal boolean as a prop', function () {
    expect(containerProps.showModal).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.showModal)
  })

  it('should pass along any other props', function () {
    expect(containerProps.foo).to.equal('bar')
  })
})