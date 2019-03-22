import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { ProjectFactory, SubjectFactory } from '../../../../../../../../../../../test/factories'
import DoneAndTalkButtonContainer from './DoneAndTalkButtonContainer'
import DoneAndTalkButton from './DoneAndTalkButton'

const subject = SubjectFactory.build()

const project = ProjectFactory.build()

describe('DoneAndTalkButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DoneAndTalkButtonContainer.wrappedComponent subject={subject} project={project} />)
    expect(wrapper).to.be.ok
  })

  it('should render null if shouldWeShowDoneAndTalkButton is false', function () {
    const wrapper = shallow(<DoneAndTalkButtonContainer.wrappedComponent subject={subject} project={project} />)
    expect(wrapper.html()).to.be.null
  })

  it('should render null if there is no project slug', function () {
    const wrapper = shallow(
      <DoneAndTalkButtonContainer.wrappedComponent
        shouldWeShowDoneAndTalkButton
        subject={subject}
        project={{ id: '1' }}
      />)
    expect(wrapper.html()).to.be.null
  })

  it('should render null if there is no subject id', function () {
    const wrapper = shallow(
      <DoneAndTalkButtonContainer.wrappedComponent
        shouldWeShowDoneAndTalkButton
        subject={{ metadata: { myId: 5 } }}
        project={project}
      />)
    expect(wrapper.html()).to.be.null
  })

  it('should render DoneAndTalkButton component if shouldWeShowDoneAndTalkButton is true', function () {
    const wrapper = shallow(
      <DoneAndTalkButtonContainer.wrappedComponent
        shouldWeShowDoneAndTalkButton
        subject={subject}
        project={project}
      />
    )
    expect(wrapper.find(DoneAndTalkButton)).to.have.lengthOf(1)
  })
})
