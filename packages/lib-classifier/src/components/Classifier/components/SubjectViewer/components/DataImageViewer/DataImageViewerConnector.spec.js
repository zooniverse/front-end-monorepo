import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'mobx-react'
import DataImageViewerConnector from './DataImageViewerConnector'
import DataImageViewerContainer from './DataImageViewerContainer'

const mockStore = {
  subjects: {
    active: { id: '1' }
  }
}

describe('DataImageViewerConnector', function () {
  let wrapper
  beforeEach(function () {
    wrapper = mount(
      <Provider classifierStore={mockStore}>
        <DataImageViewerConnector />
      </Provider>
    )
  })
  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the active subject as a prop', function () {
    expect(wrapper.find(DataImageViewerContainer).props().subject).to.deep.equal({ id: '1' })
  })
})