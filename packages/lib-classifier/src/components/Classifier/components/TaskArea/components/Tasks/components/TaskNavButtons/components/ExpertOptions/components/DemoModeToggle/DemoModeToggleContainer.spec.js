import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import DemoModeToggleContainer from './DemoModeToggleContainer'
import { expect } from 'chai'

describe('ExpertOptions > Component > DemoModeToggleContainer', function () {
  let wrapper, useContextMock
  const mockStore = {
    classifierStore: {
      classifications: {
        demoMode: false,
        setDemoMode: sinon.spy()
      }
    }
  }

  beforeEach(function () {
    useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(
      <DemoModeToggleContainer />
    )
  })

  afterEach(function () {
    useContextMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass demoMode and setDemoMode from the store as props', function () {
    expect(wrapper.props().demoMode).to.equal(mockStore.classifierStore.classifications.demoMode)
    expect(wrapper.props().setDemoMode).to.equal(mockStore.classifierStore.classifications.setDemoMode)
  })
})