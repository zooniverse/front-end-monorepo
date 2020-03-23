import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'
import React from 'react'

import SubjectViewer from './SubjectViewer'
import SingleImageViewer from './components/SingleImageViewer'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })

  it('should render nothing if the subject store is initialized', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent subjectQueueState={asyncStates.initialized} />)
    expect(wrapper.type()).to.be.null()
  })

  it('should render a loading indicator if the subject store is loading', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent subjectQueueState={asyncStates.loading} />)
    expect(wrapper.text()).to.equal('Loading')
  })

  it('should render nothing if the subject store errors', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent subjectQueueState={asyncStates.error} />)
    expect(wrapper.type()).to.be.null()
  })

  it('should render a subject viewer if the subject store successfully loads', function () {
    const wrapper = shallow(<SubjectViewer.wrappedComponent subjectQueueState={asyncStates.success} subject={{ viewer: 'singleImage' }} />)
    expect(wrapper.find(SingleImageViewer)).to.have.lengthOf(1)
  })

  describe('when there is an null viewer because of invalid subject media', function () {
    it('should render null', function () {
      const wrapper = shallow(
        <SubjectViewer.wrappedComponent
          subjectQueueState={asyncStates.success}
          subject={{ viewer: null }}
        />
      )
      expect(wrapper.html()).to.be.null()
    })
  })
})
