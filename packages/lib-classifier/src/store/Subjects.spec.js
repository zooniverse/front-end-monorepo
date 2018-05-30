import { when } from 'mobx'
import RootStore from './RootStore'
import SubjectsModel from './Subjects'
import stubPanoptesJs from '../../test/stubPanoptesJs'
import projectFixture from '../../test/fixtures/project'

let rootStore
let subjects

describe('Subjects model', function () {
  before(function (done) {
    rootStore = RootStore.create({ project: projectFixture }, { client: stubPanoptesJs })
    when(
      function () { return rootStore.subjects.queue.length !== 0 },
      function () {
        subjects = rootStore.subjects
        done()
      }
    )
  })

  it('should exist', function () {
    SubjectsModel.should.not.be.undefined
  })

  describe('current subject property', function () {
    it('should point to the first subject in the queue', function () {
      subjects.current.should.deep.equal(subjects.queue[0])
    })
  })

  describe('advance queue method', function () {
    it('should move the current subject to the next in the queue', function () {
      const nextSubjectId = subjects.queue[1].id
      subjects.advance()
      subjects.current.id.should.equal(nextSubjectId)
    })

    it('should request more subjects when the queue is short', function (done) {
      const previousLength = subjects.queue.length
      subjects.advance()
      when(
        function () { return subjects.queue.length > previousLength },
        function () {
          subjects.queue.length.should.be.above(previousLength)
          done()
        }
      )
    })
  })
})
