import { shallow } from 'enzyme'
import React from 'react'

import ByTheNumbers from './ByTheNumbers'
import ByTheNumbersContainer from './ByTheNumbersContainer'

const CLASSIFICATIONS = 1
const COMPLETED_SUBJECTS = 2
const LAUNCH_DATE = '2019-05-02T16:58:04.613Z'
const FORMATTED_LAUNCH_DATE = 'May 2, 2019'
const VOLUNTEERS = 4

describe('Component > ByTheNumbersContainer', function () {
  let wrapper
  let ByTheNumbersWrapper

  before(function () {
    wrapper = shallow(<ByTheNumbersContainer.wrappedComponent
      classifications={CLASSIFICATIONS}
      completedSubjects={COMPLETED_SUBJECTS}
      launchDate={LAUNCH_DATE}
      volunteers={VOLUNTEERS}
    />)
    ByTheNumbersWrapper = wrapper.find(ByTheNumbers)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ByTheNumbers` component', function () {
    expect(ByTheNumbersWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `classifications` prop', function () {
    expect(ByTheNumbersWrapper.prop('classifications')).to.equal(CLASSIFICATIONS)
  })

  it('should pass through a `completedSubjects` prop', function () {
    expect(ByTheNumbersWrapper.prop('completedSubjects')).to.equal(COMPLETED_SUBJECTS)
  })

  it('should format and pass through a `launchDate` prop', function () {
  })

  it('should pass through a `volunteers` prop', function () {
    expect(ByTheNumbersWrapper.prop('volunteers')).to.equal(VOLUNTEERS)
  })

  describe('when project has a launch date', function () {
    it('should format the launch date and pass it through', function () {
      expect(ByTheNumbersWrapper.prop('launchDate')).to.equal(FORMATTED_LAUNCH_DATE)
    })
  })

  describe('when project does not have a launch date', function () {
    before(function () {
      wrapper = shallow(<ByTheNumbersContainer.wrappedComponent
        classifications={CLASSIFICATIONS}
        completedSubjects={COMPLETED_SUBJECTS}
        launchDate={null}
        volunteers={VOLUNTEERS}
      />)
      ByTheNumbersWrapper = wrapper.find(ByTheNumbers)
    })

    it('should provide a null launch date prop', function () {
      expect(ByTheNumbersWrapper.prop('launchDate')).to.equal(null)
    })
  })
})
