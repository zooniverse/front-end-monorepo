import { shallow } from 'enzyme'
import React from 'react'

import SubjectViewer from './SubjectViewer'
import asyncStates from '../../../../helpers/asyncStates'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    shallow(<SubjectViewer />)
  })

  it('should render nothing if the subject store is initialized', function () {
    const wrapper = shallow(<SubjectViewer loadingState={ asyncStates.initialized} />)
    expect(wrapper.type()).to.equal(null)
  })

  it('should render a loading indicator if the subject store is loading', function () {
    const wrapper = shallow(<SubjectViewer loadingState={asyncStates.loading} />)
    expect(wrapper.text()).to.equal('Loading')
  })

  it('should render nothing if the subject store errors', function () {
    const wrapper = shallow(<SubjectViewer loadingState={asyncStates.error} />)
    expect(wrapper.type()).to.equal(null)
  })

  it('should render a subject viewer if the subject store successfully loads', function () {
    const wrapper = shallow(<SubjectViewer loadingState={asyncStates.success} subject={{ viewer: 'singleImage' }} />)
    expect(wrapper.find('SingleImageViewer').length).to.equal(1)
  })
})
