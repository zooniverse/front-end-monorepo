import { shallow } from 'enzyme'
import React from 'react';
import sinon from 'sinon'
import FieldGuideConnector from './FieldGuideConnector'
import FieldGuideWrapper from './FieldGuideWrapper'

const mockStoreSnapshot = {
  classifierStore: {
    locale: 'fr',
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

  it('should pass the locale as a prop', function () {
    expect(containerProps.locale).to.equal('fr')
  })

  it('should pass the active field guide as a prop', function () {
    expect(containerProps.fieldGuide).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.active)
  })

  it('should pass the attached media as the icons prop', function () {
    expect(containerProps.icons).to.deep.equal(mockStoreSnapshot.classifierStore.fieldGuide.attachedMedia)
  })

  it('should pass along any other props', function () {
    expect(containerProps.foo).to.equal('bar')
  })
})