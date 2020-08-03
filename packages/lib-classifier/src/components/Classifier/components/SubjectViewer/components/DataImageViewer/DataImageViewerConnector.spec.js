import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import DataImageViewerConnector from './DataImageViewerConnector'
import DataImageViewerContainer from './DataImageViewerContainer'

const mockStore = {
  classifierStore: {
    subjects: {
      active: { id: '1' }
    }
  }
}

describe('DataImageViewerConnector', function () {
  let wrapper, useContextMock
  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <DataImageViewerConnector />
    )
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the active subject as a prop', function () {
    expect(wrapper.find(DataImageViewerContainer).props().subject).to.deep.equal({ id: '1' })
  })
})