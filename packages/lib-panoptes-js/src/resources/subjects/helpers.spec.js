import { buildQueuedSubjectResource, buildSubjectQueue } from './helpers'

describe('Subjects Helpers', function () {
  describe('buildQueuedSubjectResource', function () {
    it('should return a mocked subject resource object', function () {
      const subject = buildQueuedSubjectResource()
      expect(subject).to.exist
      expect(subject).to.be.an.instanceOf(Object)
    })

    it('should return a mocked subject with a random id > 0 and <= 100', function () {
      const subject = buildQueuedSubjectResource()
      expect(Number(subject.id)).to.be.within(1, 100)
    })
  })

  describe('buildSubjectQueue', function () {
    it('should return an array with ten objects', function () {
      const queue = buildSubjectQueue()
      expect(queue).to.have.lengthOf(10)
      queue.forEach((subject) => {
        expect(subject).to.be.an.instanceOf(Object)
      })
    })
  })
})
