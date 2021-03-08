import { shallow } from 'enzyme'
import React from 'react'

import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'

import SubjectSetProgressBanner from './SubjectSetProgressBanner'
import Banner from '../Banner'

describe('Component > SubjectSetProgressBanner', function () {
  let wrapper
  let componentWrapper
  const subject = SubjectFactory.build({
    metadata: {
      ['#priority']: 37
    }
  })
  const workflow = WorkflowFactory.build({
    grouped: true,
    subjectSet: SubjectSetFactory.build()
  })

  before(function () {
    wrapper = shallow(<SubjectSetProgressBanner subject={subject} workflow={workflow} />)
    componentWrapper = wrapper.find(Banner)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a <Banner />', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should set the background to OK', function () {
    expect(componentWrapper.prop('background')).to.equal('status-ok')
  })

  it('should indicate your position within the subject set', function () {
    expect(componentWrapper.prop('bannerText').trim()).to.equal('Subject 37/56')
  })

  describe('when the subject is already seen', function () {
    before(function () {
      subject.already_seen = true
      wrapper.setProps({ subject })
    })

    it('should show the Already Seen banner', function () {
      expect(wrapper.find(Banner).prop('bannerText')).to.be.equal('Subject 37/56 (Already seen)')
    })

    it('set the banner background to critical', function () {
      expect(wrapper.find(Banner).prop('background')).to.equal('status-critical')
    })
  })

  describe('when the subject is retired', function () {
    before(function () {
      subject.already_seen = true
      subject.retired = true
      wrapper.setProps({ subject })
    })

    it('should show the Finished banner', function () {
      expect(wrapper.find(Banner).prop('bannerText')).to.be.equal('Subject 37/56 (Finished)')
    })

    it('set the banner background to critical', function () {
      expect(wrapper.find(Banner).prop('background')).to.equal('status-critical')
    })
  })
})
