import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { SubjectFactory } from '../../../../../../../../../../../test/factories'
import DoneAndTalkButtonContainer from './DoneAndTalkButtonContainer'
import DoneAndTalkButton from './DoneAndTalkButton'

const subject = SubjectFactory.build()
subject.openInTalk = sinon.stub()

describe('DoneAndTalkButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DoneAndTalkButtonContainer.wrappedComponent subject={subject} />)
    expect(wrapper).to.be.ok()
  })

  it('should render null if shouldWeShowDoneAndTalkButton is false', function () {
    const wrapper = shallow(<DoneAndTalkButtonContainer.wrappedComponent subject={subject} />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render null if there is no subject id', function () {
    const wrapper = shallow(
      <DoneAndTalkButtonContainer.wrappedComponent
        shouldWeShowDoneAndTalkButton
        subject={{ metadata: { myId: 5 } }}
      />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render DoneAndTalkButton component if shouldWeShowDoneAndTalkButton is true', function () {
    const wrapper = shallow(
      <DoneAndTalkButtonContainer.wrappedComponent
        shouldWeShowDoneAndTalkButton
        subject={subject}
      />
    )
    expect(wrapper.find(DoneAndTalkButton)).to.have.lengthOf(1)
  })

  describe('on click', function () {
    let onClick

    before(function () {
      onClick = sinon.stub().callsFake(() => Promise.resolve(null))
    })

    describe('without the cmd key modifier', function () {
      before(function () {
        const wrapper = shallow(
          <DoneAndTalkButtonContainer.wrappedComponent
            onClick={onClick}
            shouldWeShowDoneAndTalkButton
            subject={subject}
          />
        )
        const fakeEvent = {}
        wrapper.simulate('click', fakeEvent)
      })

      after(function () {
        onClick.resetHistory()
      })

      it('should call the onClick handler', function () {
        expect(onClick).to.have.been.calledOnce()
      })

      it('should open the subject in Talk', function () {
        expect(subject.openInTalk.withArgs(undefined)).to.have.been.calledOnce()
      })
    })

    describe('with the cmd key modifier', function () {
      before(function () {
        const wrapper = shallow(
          <DoneAndTalkButtonContainer.wrappedComponent
            onClick={onClick}
            onHide={() => true}
            shouldWeShowDoneAndTalkButton
            subject={subject}
          />
        )
        const fakeEvent = {
          metaKey: true
        }
        wrapper.simulate('click', fakeEvent)
      })

      it('should call the onClick handler', function () {
        expect(onClick).to.have.been.calledOnce()
      })

      it('should open the subject in Talk', function () {
        expect(subject.openInTalk.withArgs(true)).to.have.been.calledOnce()
      })
    })
  })
})
