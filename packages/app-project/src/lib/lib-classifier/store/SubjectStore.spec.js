import sinon from 'sinon'
import { getEnv, types } from 'mobx-state-tree'
import SubjectStore from './SubjectStore'

let rootStore
let subjectStore

const WorkflowStoreStub = types
  .model('WorkflowStoreStub', {
    active: types.maybe(types.string)
  })

const RootStub = types
  .model('RootStore', {
    subjects: SubjectStore,
    workflows: WorkflowStoreStub
  })
  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

function * subjectGen () {
  let index = 0
  while (index < index + 1) {
    index++
    const id = index.toString()
    yield {
      id,
      subject: {
        id,
        locations: [{ 'image/jpg': `http://foobar.com/image${id}.jpg` }]
      }
    }
  }
}

const subGen = subjectGen()

const subjectsStub = {
  active: null,
  queue: [],
  resources: {}
}

const clientStub = {
  panoptes: {
    get () {
      return Promise.resolve({
        body: {
          subjects: [subGen.next().value.subject]
        }
      })
    }
  }
}
sinon.spy(clientStub.panoptes, 'get')

describe('Model > SubjectStore', function () {
  before(function () {
    for (let index = 0; index < 6; index++) {
      const obj = subGen.next().value
      subjectsStub.resources[obj.id] = obj.subject
      subjectsStub.queue.push(obj.id)
    }
    subjectsStub.active = '1'

    subjectStore = SubjectStore.create(subjectsStub)
    rootStore = RootStub.create(
      { subjects: subjectStore, workflows: WorkflowStoreStub.create() },
      { client: clientStub }
    )
  })

  it('should make the next subject in the queue active when calling `advance()`', function () {
    subjectStore.active.id.should.equal(subjectsStub.resources['1'].id)
    subjectStore.advance()
    subjectStore.active.id.should.equal(subjectsStub.resources['2'].id)
    expect(subjectStore.resources.get('1')).to.equal(undefined)
  })
})
