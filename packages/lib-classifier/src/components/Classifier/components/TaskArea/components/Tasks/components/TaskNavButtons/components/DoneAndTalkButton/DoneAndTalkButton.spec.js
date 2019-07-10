import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { DoneAndTalkButton } from './DoneAndTalkButton'
import { ProjectFactory, SubjectFactory } from '../../../../../../../../../../../test/factories'

const project = ProjectFactory.build()
const subject = SubjectFactory.build()
const talkURL = `/projects/${project.slug}/talk/subjects/${subject.id}`

describe('DoneAndTalkButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DoneAndTalkButton talkURL={talkURL} />)
    expect(wrapper).to.be.ok()
  })

  it('should call props.onClick for the onClick event', function () {
    const onClickSpy = sinon.stub().callsFake(() => { return Promise.resolve() })
    const wrapper = shallow(<DoneAndTalkButton onClick={onClickSpy} talkURL={talkURL} />)
    wrapper.simulate('click', { event: { metaKey: false } })
    expect(onClickSpy).to.have.been.calledOnce()
  })

  describe('when props.completed is true', function () {
    it('should render null', function () {
      const wrapper = shallow(<DoneAndTalkButton completed talkURL={talkURL} />)
      expect(wrapper.html()).to.be.null()
    })
  })
})
