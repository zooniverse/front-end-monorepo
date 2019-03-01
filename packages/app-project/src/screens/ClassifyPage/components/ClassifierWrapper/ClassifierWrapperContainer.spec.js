import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import asyncStates from '@zooniverse/async-states'
import Classifier from '@zooniverse/classifier'

import ClassifierWrapperContainer from './ClassifierWrapperContainer'

describe('Component > ClassifierWrapperContainer', function () {
  let wrapper

  before(function () {
    const project = {}
    const user = {}
    wrapper = shallow(
      <ClassifierWrapperContainer.wrappedComponent
        project={project}
        user={user}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('with a project and user loaded', function () {
    let recents

    before(function () {
      const project = {
        loadingState: asyncStates.success
      }
      recents = {
        add: sinon.stub()
      }
      const user = {
        loadingState: asyncStates.success
      }
      wrapper = shallow(
        <ClassifierWrapperContainer.wrappedComponent
          project={project}
          recents={recents}
          user={user}
        />
      )
    })

    it('should render the classifier', function () {
      expect(wrapper.find(Classifier)).to.have.lengthOf(1)
    })

    it('should add to recents on classification complete', function () {
      const subject = {
        id: '1',
        locations: [
          { 'image/jpeg': 'thing.jpg' }
        ]
      }
      const recent = {
        subjectId: subject.id,
        locations: subject.locations
      }
      wrapper.instance().onCompleteClassification({}, subject)
      expect(recents.add.withArgs(recent)).to.have.been.calledOnce()
    })
  })
})
