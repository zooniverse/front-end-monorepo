import RootStore from './RootStore'
import stubPanoptesJs from '../../test/stubPanoptesJs'
import projectFixture from '../../test/fixtures/project'
import { when } from 'mobx'

let rootStore
let workflows

describe('WorkflowModels model', function () {
  before(function (done) {
    rootStore = RootStore.create({ project: projectFixture }, { client: stubPanoptesJs })
    when(
      function () { return rootStore.workflows.activeWorkflow !== null },
      function () {
        workflows = rootStore.workflows
        done()
      }
    )
  })

  it('should exist', function () {
    workflows.should.not.be.undefined
  })

  describe('model properties', function () {
    describe('active workflow property', function () {
      it('should exist', function () {
        workflows.activeWorkflow.should.not.be.undefined
      })

      it('should default to the first workflow', function () {
        workflows.activeWorkflow.should.equal(workflows.workflows[0])
      })
    })

    describe('workflows property', function () {
      it('should exist', function () {
        workflows.workflows.should.not.be.undefined
        workflows.workflows.should.be.an('array')
      })
    })
  })
})
