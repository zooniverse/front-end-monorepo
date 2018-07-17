import { types } from 'mobx-state-tree'

import Annotation from './Annotation'

let annotation

const stub = {
  answer: '',
  taskId: 'id'
}

describe('Model > Annotation', function () {
  before(function () {
    annotation = Annotation.create(stub)
  })

  it('should exist', function () {
    expect(Annotation).to.not.equal(undefined)
  })

  it('should have a `taskId` property', function () {
    expect(annotation.taskId).to.equal(stub.taskId)
  })

  it('should have an `answer` property', function () {
    expect(annotation.answer).to.equal(stub.answer)
  })

  describe('`setValue` method', function () {
    it('should exist', function () {
      expect(annotation.setValue).to.not.equal('undefined')
    })

    it('should overwrite the answer when the active task type is `single`', function () {
      const RootStore = types.model({
        tasks: types.optional(types.frozen, {
          active: {
            type: 'single'
          }
        }),
        annotation: types.optional(Annotation, Annotation.create(stub))
      })

      const rootStore = RootStore.create()
      const newAnswer = 'foobar'

      expect(rootStore.annotation.answer).to.equal(stub.answer)
      rootStore.annotation.setValue(newAnswer)
      expect(rootStore.annotation.answer).to.equal(newAnswer)
    })
  })
})
