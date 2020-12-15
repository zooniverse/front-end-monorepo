import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import SingleVideoViewerConnector from './SingleVideoViewerConnector'
import SingleVideoViewerContainer from './SingleVideoViewerContainer'

const mockStore = {
  classifierStore: {
    subjects: {
      active: { id: '1' }
    }
  }
}

describe('SingleVideoViewerConnector', function () {
  let wrapper, useContextMock, containerProps
  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(<SingleVideoViewerConnector />)
    containerProps = wrapper.find(SingleVideoViewerContainer).props()
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the active subject as a prop', function () {
    expect(containerProps.subject).to.deep.equal(
      mockStore.classifierStore.subjects.active
    )
  })
})
