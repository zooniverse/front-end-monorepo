import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'
import React from 'react'

import { SubjectViewer } from './SubjectViewer'
import SingleImageViewer from './components/SingleImageViewer'
import VariableStarViewer from './components/VariableStarViewer'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SubjectViewer />)
    expect(wrapper).to.be.ok()
  })

  it('should render nothing if the subject store is initialized', function () {
    const wrapper = shallow(<SubjectViewer subjectQueueState={asyncStates.initialized} />)
    expect(wrapper.type()).to.be.null()
  })

  it('should render a loading indicator if the subject store is loading', function () {
    const wrapper = shallow(<SubjectViewer subjectQueueState={asyncStates.loading} />)
    expect(wrapper.text()).to.equal('SubjectViewer.loading')
  })

  it('should render nothing if the subject store errors', function () {
    const wrapper = shallow(<SubjectViewer subjectQueueState={asyncStates.error} />)
    expect(wrapper.type()).to.be.null()
  })

  it('should render a subject viewer if the subject store successfully loads', function () {
    const wrapper = shallow(<SubjectViewer subjectQueueState={asyncStates.success} subject={{ viewer: 'singleImage' }} />)
    expect(wrapper.find(SingleImageViewer)).to.have.lengthOf(1)
  })

  it('should pass along the viewer configuration', function () {
    const viewerConfiguration = {
      zoomConfiguration: {
        direction: 'both',
        minZoom: 1,
        maxZoom: 10,
        zoomInValue: 1.2,
        zoomOutValue: 0.8
      }
    }

    const wrapper = shallow(<SubjectViewer subjectQueueState={asyncStates.success} subject={{ viewer: 'variableStar', viewerConfiguration }} />)
    expect(wrapper.find(VariableStarViewer).props().viewerConfiguration).to.deep.equal(viewerConfiguration)
  })

  describe('when there is an null viewer because of invalid subject media', function () {
    it('should render null', function () {
      const wrapper = shallow(
        <SubjectViewer
          subjectQueueState={asyncStates.success}
          subject={{ viewer: null }}
        />
      )
      expect(wrapper.html()).to.be.null()
    })
  })
})
