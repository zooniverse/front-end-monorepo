import sinon from 'sinon'
import Subject from './Subject'
import { ProjectFactory, SubjectFactory } from '../../test/factories'

const stub = SubjectFactory.build()
const project = ProjectFactory.build()

describe('Model > Subject', function () {
  let subject

  before(function () {
    subject = Subject.create(stub)
    subject.onToggleFavourite = sinon.stub()
    subject.onAddToCollection = sinon.stub()
    subject.projects = {
      active: project
    }
  })

  it('should exist', function () {
    expect(Subject).to.be.ok()
    expect(Subject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(stub.locations)
  })

  it('should have a Talk URL', function () {
    expect(subject.talkURL).to.equal(`https://example.org/projects/zooniverse/example/talk/subjects/${subject.id}`)
  })

  describe('toggleFavorite', function () {
    before(function () {
      subject.toggleFavorite()
    })

    it('should toggle subject.favorite', function () {
      expect(subject.favorite).to.be.true()
    })

    it('should call the onToggleFavourite callback', function () {
      expect(subject.onToggleFavourite).to.have.been.calledOnceWith(subject.id, subject.favorite)
    })
  })

  describe('addToCollection', function () {
    before(function () {
      subject.addToCollection()
    })

    it('should call the onAddToCollection callback', function () {
      expect(subject.onAddToCollection).to.have.been.calledOnceWith(subject.id)
    })
  })

  describe('openInTalk', function () {
    let feedback
    let onHide = () => null

    before(function () {
      feedback = {
        onHide,
        setOnHide: sinon.stub().callsFake(callback => { onHide = callback })
      }
      subject.feedback = feedback
    })

    describe('in the same tab', function () {
      before(function () {
        subject.openInTalk(false)
      })

      after(function () {
        feedback.setOnHide.resetHistory()
        window.location.assign.resetHistory()
      })
    })

    describe('in a new tab', function () {
      let newTab = {
        opener: null,
        location: null,
        target: null,
        focus: sinon.stub()
      }

      before(function () {
        window.open = sinon.stub().callsFake(() => newTab)
        subject.openInTalk(true)
      })

      after(function () {
        feedback.setOnHide.resetHistory()
        window.location.assign.resetHistory()
      })
    })
  })
})
