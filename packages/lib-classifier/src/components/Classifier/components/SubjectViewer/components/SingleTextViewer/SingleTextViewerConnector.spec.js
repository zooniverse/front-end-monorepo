import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import SingleTextViewerConnector from './SingleTextViewerConnector'
import SingleTextViewerContainer from './SingleTextViewerContainer'

const mockStore = {
  classifierStore: {
    subjects: {
      active: {
        id: '1',
        content: 'subject text',
        contentLoadingState: 'success',
        error: null
      }
    }
  }
}

describe('SingleTextViewerConnector', function () {
  let wrapper, useContextMock, containerProps

  before(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(<SingleTextViewerConnector />)
    containerProps = wrapper.find(SingleTextViewerContainer).props()
  })

  after(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the subject content, contentLoadingState, and error as props', function () {
    expect(containerProps.content).to.equal('subject text')
    expect(containerProps.contentLoadingState).to.equal('success')
    expect(containerProps.error).to.be.null()
  })
})
