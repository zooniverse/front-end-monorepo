import nock from 'nock'

import getIndexedSubjects from './getIndexedSubjects'

describe('Store > Helpers > getIndexedSubjects', function () {
  let subjectIDs

  before(async function () {
    nock('https://subject-set-search-api.zooniverse.org')
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
    .query(query => query.priority__gt === '1')
    .reply(200, {
      columns: ['subject_id', 'priority'],
      rows: [
        ['34567', '2'],
        ['56789', '3']
      ]
    })
  })

  describe('with a subject priority', function () {
    before(async function () {
      subjectIDs = await getIndexedSubjects('2', 1)
    })

    it('should return the next subjects from the set', function () {
      expect(subjectIDs).to.equal('34567,56789')
    })
  })

  describe('without a subject priority', function () {
    before(async function () {
      subjectIDs = await getIndexedSubjects('2')
    })

    it('should return the first subjects from the set', function () {
      expect(subjectIDs).to.equal('12345,34567,56789')
    })
  })
})