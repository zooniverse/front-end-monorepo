import nock from 'nock'

import subjectSelectionStrategy from './subjectSelectionStrategy'
import { WorkflowFactory } from '@test/factories'

describe('Store > Helpers > subjectSelectionStrategy', function () {
  describe('default random selection', function () {
    let strategy

    before(async function () {
      const workflow = WorkflowFactory.build({
        id: '12345'
      })
      strategy = await subjectSelectionStrategy(workflow)
    })

    it(`should use the /subjects/queued endpoint`, function () {
      expect(strategy.apiUrl).to.equal('/subjects/queued')
    })

    it('should only pass the workflow ID as the query', function () {
      expect(strategy.params).to.deep.equal({
        workflow_id: '12345'
      })
    })
  })

  describe('grouped random selection', function () {
    let strategy

    before(async function () {
      const workflow = WorkflowFactory.build({
        id: '12345',
        grouped: true,
        subjectSetId: '2'
      })
      strategy = await subjectSelectionStrategy(workflow)
    })

    it(`should use the /subjects/queued endpoint`, function () {
      expect(strategy.apiUrl).to.equal('/subjects/queued')
    })

    it('should query by workflow and subject set', function () {
      expect(strategy.params).to.deep.equal({
        subject_set_id: '2',
        workflow_id: '12345'
      })
    })
  })

  describe('specific subjects', function () {
    let strategy

    before(async function () {
      const workflow = WorkflowFactory.build({
        id: '12345',
        grouped: true,
        subjectSetId: '2'
      })
      const subjectIDs = ['3456', '4567', '8910']
      strategy = await subjectSelectionStrategy(workflow, subjectIDs)
    })

    it(`should use the /subjects/selection endpoint`, function () {
      expect(strategy.apiUrl).to.equal('/subjects/selection')
    })

    it('should query by workflow and subject ID', function () {
      expect(strategy.params).to.deep.equal({
        ids: '3456,4567,8910',
        workflow_id: '12345'
      })
    })
  })

  describe('subject groups', function () {
    let strategy

    before(async function () {
      const workflow = WorkflowFactory.build({
        id: '12345',
        configuration: {
          subject_viewer: 'subjectGroup',
          subject_viewer_config: {
            grid_rows: 3,
            grid_columns: 4
          }
        }
      })
      strategy = await subjectSelectionStrategy(workflow)
    })

    it(`should use the /subjects/grouped endpoint`, function () {
      expect(strategy.apiUrl).to.equal('/subjects/grouped')
    })

    it('should query by workflow and group viewer dimensions', function () {
      expect(strategy.params).to.deep.equal({
        num_columns: 4,
        num_rows: 3,
        workflow_id: '12345'
      })
    })
  })

  describe('indexed subject selection', function () {
    let strategy

    before(async function () {
      nock('https://subject-set-search-api.zooniverse.org')
      .persist(true)
      .get('/subjects/2.json')
      .query(query => query.priority__gt === '-1')
      .reply(200, {
        columns: ['subject_id', 'priority'],
        rows: [
          ['12345', '1'],
          ['34567', '2'],
          ['56789', '3']
        ]
      })
      .get('/subjects/2.json')
      .query(query => query.priority__gt === '2')
      .reply(200, {
        columns: ['subject_id', 'priority'],
        rows: [
          ['56789', '3']
        ]
      })
      .get('/subjects/2.json')
      .query(query => query.priority__gt === '3')
      .reply(200, {
        columns: ['subject_id', 'priority'],
        rows: []
      })
    })

    after(function () {
      nock.cleanAll()
    })

    describe('with a subject priority', function () {
      before(async function () {
        const workflow = WorkflowFactory.build({
          id: '12345',
          grouped: true,
          prioritized: true,
          hasIndexedSubjects: true,
          subjectSetId: '2'
        })
        let subjectIDs
        strategy = await subjectSelectionStrategy(workflow, subjectIDs, '2')
      })

      it(`should use the /subjects/selection endpoint`, function () {
        expect(strategy.apiUrl).to.equal('/subjects/selection')
      })

      it('should query by workflow and subjects greater than the specified priority', function () {
        expect(strategy.params).to.deep.equal({
          ids: '56789',
          workflow_id: '12345'
        })
      })
    })

    describe('at the end of a set', function () {
      before(async function () {
        const workflow = WorkflowFactory.build({
          id: '12345',
          grouped: true,
          prioritized: true,
          hasIndexedSubjects: true,
          subjectSetId: '2'
        })
        let subjectIDs
        strategy = await subjectSelectionStrategy(workflow, subjectIDs, '3')
      })

      it('should return null', function () {
        expect(strategy).to.equal(null)
      })
    })

    describe('without a subject priority', function () {
      before(async function () {
        const workflow = WorkflowFactory.build({
          id: '12345',
          grouped: true,
          prioritized: true,
          hasIndexedSubjects: true,
          subjectSetId: '2'
        })
        strategy = await subjectSelectionStrategy(workflow)
      })

      it(`should use the /subjects/selection endpoint`, function () {
        expect(strategy.apiUrl).to.equal('/subjects/selection')
      })

      it('should query by workflow and all subjects', function () {
        expect(strategy.params).to.deep.equal({
          ids: '12345,34567,56789',
          workflow_id: '12345'
        })
      })
    })
  })
})
