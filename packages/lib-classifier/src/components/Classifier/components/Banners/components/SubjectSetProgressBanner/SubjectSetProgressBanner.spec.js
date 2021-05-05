import { shallow } from 'enzyme'
import React from 'react'

import Subject from '@store/Subject'
import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'

import SubjectSetProgressBanner from './SubjectSetProgressBanner'
import Banner from '../Banner'

describe('Component > SubjectSetProgressBanner', function () {
  let wrapper
  let componentWrapper
  const workflow = WorkflowFactory.build({
    grouped: true,
    subjectSet: SubjectSetFactory.build()
  })

  describe('with #priority metadata', function () {
    const subjectSnapshot = SubjectFactory.build({
      metadata: {
        ['#priority']: 37
      }
    })

    before(function () {
      const subject = Subject.create(subjectSnapshot)
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
        const seenSnapshot = Object.assign({}, subjectSnapshot, { already_seen: true })
        const subject = Subject.create(seenSnapshot)
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
        const retiredSnapshot = Object.assign({}, subjectSnapshot, { retired: true })
        const subject = Subject.create(retiredSnapshot)
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

  describe('with priority metadata', function () {
    const subjectSnapshot = SubjectFactory.build({
      metadata: {
        ['priority']: 38
      }
    })

    before(function () {
      const subject = Subject.create(subjectSnapshot)
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
      expect(componentWrapper.prop('bannerText').trim()).to.equal('Subject 38/56')
    })

    describe('when the subject is already seen', function () {
      before(function () {
        const seenSnapshot = Object.assign({}, subjectSnapshot, { already_seen: true })
        const subject = Subject.create(seenSnapshot)
        wrapper.setProps({ subject })
      })

      it('should show the Already Seen banner', function () {
        expect(wrapper.find(Banner).prop('bannerText')).to.be.equal('Subject 38/56 (Already seen)')
      })

      it('set the banner background to critical', function () {
        expect(wrapper.find(Banner).prop('background')).to.equal('status-critical')
      })
    })

    describe('when the subject is retired', function () {
      before(function () {
        const retiredSnapshot = Object.assign({}, subjectSnapshot, { retired: true })
        const subject = Subject.create(retiredSnapshot)
        wrapper.setProps({ subject })
      })

      it('should show the Finished banner', function () {
        expect(wrapper.find(Banner).prop('bannerText')).to.be.equal('Subject 38/56 (Finished)')
      })

      it('set the banner background to critical', function () {
        expect(wrapper.find(Banner).prop('background')).to.equal('status-critical')
      })
    })
  })
})
