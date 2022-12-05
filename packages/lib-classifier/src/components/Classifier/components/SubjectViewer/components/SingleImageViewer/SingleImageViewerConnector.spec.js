import { shallow } from 'enzyme'
import React from 'react';
import sinon from 'sinon'
import SingleImageViewerConnector from './SingleImageViewerConnector'
import SingleImageViewerContainer from './SingleImageViewerContainer'

const mockStore = {
  classifierStore: {
    subjects: {
      active: { id: '1' }
    },
    subjectViewer: {
      enableRotation: sinon.spy(),
      move: false,
      rotation: 0,
      setOnPan: sinon.spy(),
      setOnZoom: sinon.spy()
    }
  }
}

describe('SingleImageViewerConnector', function () {
  let wrapper, useContextMock, containerProps
  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <SingleImageViewerConnector />
    )
    containerProps = wrapper.find(SingleImageViewerContainer).props()
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the active subject as a prop', function () {
    expect(containerProps.subject).to.deep.equal(mockStore.classifierStore.subjects.active)
  })

  it('should pass the enableRotation function', function () {
    expect(containerProps.enableRotation).to.deep.equal(mockStore.classifierStore.subjectViewer.enableRotation)
  })

  it('should pass the move boolean', function () {
    expect(containerProps.move).to.deep.equal(mockStore.classifierStore.subjectViewer.move)
  })

  it('should pass the rotation boolean', function () {
    expect(containerProps.rotation).to.deep.equal(mockStore.classifierStore.subjectViewer.rotation)
  })

  it('should pass the setOnPan function', function () {
    expect(containerProps.setOnPan).to.deep.equal(mockStore.classifierStore.subjectViewer.setOnPan)
  })

  it('should pass the setOnZoom function', function () {
    expect(containerProps.setOnZoom).to.deep.equal(mockStore.classifierStore.subjectViewer.setOnZoom)
  })
})