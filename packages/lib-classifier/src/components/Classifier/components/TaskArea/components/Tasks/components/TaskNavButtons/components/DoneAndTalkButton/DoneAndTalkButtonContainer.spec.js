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

  describe('on click', function () {
    let onClick
    let setOnHide
    let onHide = () => null
    let originalLocation

    before(function () {
      originalLocation = window.location
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.org',
          assign: sinon.stub().callsFake(url => console.log(url))
        },
        writable: true
      })
      onClick = sinon.stub().callsFake(() => Promise.resolve(null))
      setOnHide = sinon.stub().callsFake(callback => onHide = callback)
    })

    after(function () {
      window.location = originalLocation
      Object.defineProperty(window, 'location', {
        writable: false
      })
    })

    describe('without the cmd key modifier', function () {
      before(function () {
        const wrapper = shallow(
          <DoneAndTalkButtonContainer.wrappedComponent
            onClick={onClick}
            setOnHide={setOnHide}
            shouldWeShowDoneAndTalkButton
            subject={subject}
            project={project}
          />
        )
        const fakeEvent = {}
        wrapper.simulate('click', fakeEvent)
      })

      after(function () {
        onClick.resetHistory()
        setOnHide.resetHistory()
      })

      it('should call the onClick handler', function () {
        expect(onClick).to.have.been.calledOnce
      })

      it('should set an onHide callback', function () {
        expect(setOnHide).to.have.been.calledOnce
      })

      it('should defer opening a Talk URL', function () {
        onHide()
        const url = 'https://example.org/projects/zooniverse/example/talk/subjects/2'
        expect(window.location.assign).to.have.been.calledOnceWith(url)
      })
    })

    describe('with the cmd key modifier', function () {
      let newTab = {
        opener: null,
        location: null,
        target: null,
        focus: sinon.stub()
      }

      before(function () {
        window.open = sinon.stub().callsFake(() => newTab)

        const wrapper = shallow(
          <DoneAndTalkButtonContainer.wrappedComponent
            onClick={onClick}
            onHide={() => true}
            setOnHide={setOnHide}
            shouldWeShowDoneAndTalkButton
            subject={subject}
            project={project}
          />
        )
        const fakeEvent = {
          metaKey: true
        }
        wrapper.simulate('click', fakeEvent)
      })

      it('should call the onClick handler', function () {
        expect(onClick).to.have.been.calledOnce
      })

      it('should set an onHide callback', function () {
        expect(setOnHide).to.have.been.calledOnce
      })

      describe('when feedback closes', function () {
        before(function () {
          onHide()
        })

        it('should open a new tab', function () {
          expect(newTab.target).to.equal('_blank')
        })

        it('should open a Talk URL', function () {
          const url = 'https://example.org/projects/zooniverse/example/talk/subjects/2'
          expect(newTab.location).to.equal(url)
        })

        it('should switch focus to the new tab', function () {
          expect(newTab.focus).to.have.been.calledOnce
        })
      })
    })
  })
})
