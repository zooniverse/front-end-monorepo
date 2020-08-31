import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import DataImageViewerConnector from './DataImageViewerConnector'
import DataImageViewerContainer from './DataImageViewerContainer'

const mockStore = {
  classifierStore: {
    subjects: {
      active: { id: '1' }
    },
    subjectViewer: {
      setOnPan: sinon.spy(),
      setOnZoom: sinon.spy()
    }
  }
}

describe('DataImageViewerConnector', function () {
  let wrapper, useContextMock, containerProps
  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <DataImageViewerConnector />
    )
    containerProps = wrapper.find(DataImageViewerContainer).props()
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

  it('should pass the setOnPan function', function () {
    expect(containerProps.setOnPan).to.deep.equal(mockStore.classifierStore.subjectViewer.setOnPan)
  })

  it('should pass the setOnZoom function', function () {
    expect(containerProps.setOnZoom).to.deep.equal(mockStore.classifierStore.subjectViewer.setOnZoom)
  })
})