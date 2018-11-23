import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'
import React from 'react'

import SubjectViewer from './SubjectViewer'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should render nothing if the subject store is initialized', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent loadingState={asyncStates.initialized} />)
    expect(wrapper.type()).to.be.null
  })

  it('should render a loading indicator if the subject store is loading', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent loadingState={asyncStates.loading} />)
    expect(wrapper.text()).to.equal('Loading')
  })

  it('should render nothing if the subject store errors', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent loadingState={asyncStates.error} />)
    expect(wrapper.type()).to.be.null
  })

  it('should render a subject viewer if the subject store successfully loads', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent loadingState={asyncStates.success} subject={{ viewer: 'singleImage' }} />)
    expect(wrapper.find('SingleImageViewerContainer')).to.have.lengthOf(1)
  })
})
