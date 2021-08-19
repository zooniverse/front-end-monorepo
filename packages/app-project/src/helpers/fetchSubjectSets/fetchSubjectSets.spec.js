import nock from 'nock'

import fetchSubjectSets from '.'

describe('Helpers > fetchSubjectSets', function () {
  const mockSetSubjects = [
    {
      "id":"47696316",
      "metadata":{"Filename":"ultraman-x.png"},
      "locations":[
        {"image/png":"https://panoptes-uploads.zooniverse.org/production/subject_location/78964ce7-72db-4607-b493-63626738cf4e.png"}
      ],
      "zooniverse_id":null,
      "external_id":null,
      "created_at":"2020-07-09T20:47:07.128Z",
      "updated_at":"2020-07-09T20:47:07.128Z",
      "href":"/subjects/47696316",
      "links":{"project":"12754","collections":[],"subject_sets":["85771"],"set_member_subjects":["80512512"]}}
  ]

  const availableSubjects = {
    1: 4,
    2: 10,
    3: 10
  }

  const completeness = {
    1: 0.6,
    2: 0,
    3: 0
  }

  function subjectSet(id) {
    return {
      id,
      display_name: `test set ${id}`,
      isIndexed: false,
      set_member_subjects_count: 10,
      subjects: mockSetSubjects
    }
  }

  before(function () {
    const cellect = nock('https://cellect.zooniverse.org')
    .persist()
    .get('/workflows/1/status')
    .reply(200, {})
    .get('/workflows/2/status')
    .reply(200, {
      groups: availableSubjects
    })

    const panoptes = nock('https://panoptes-staging.zooniverse.org/api')
    .persist()
    .get('/subject_sets')
    .query(true)
    .reply(200, {
      subject_sets: [
        subjectSet('1'),
        subjectSet('2'),
        subjectSet('3')
      ]
    })
    .get('/set_member_subjects')
    .query(query => query.include === 'subject')
    .reply(200, {
      linked: {
        subjects: mockSetSubjects
      }
    })
  })

  after(function () {
    nock.cleanAll()
  })

  describe('without grouped subject selection', function () {
    let result

    before(async function () {
      const workflow = {
        id: '1',
        completeness: 0.4,
        configuration: {
          level: 1
        },
        grouped: false,
        links: {
          subject_sets: ['1', '2', '3']
        }
      }
      result = await fetchSubjectSets(workflow)
    })

    it('should return subject sets', function () {
      expect(result).to.deep.equal([
        subjectSet('1'),
        subjectSet('2'),
        subjectSet('3')
      ])
    })
  })

  describe('with grouped subject selection', function () {
    let result

    before(async function () {
      const workflow = {
        id: '2',
        completeness: 0.7,
        configuration: {
          level: 2
        },
        grouped: true,
        links: {
          subject_sets: ['1', '2', '3']
        }
      }
      result = await fetchSubjectSets(workflow)
    })

    it('should return subject sets with completeness counts', function () {
      expect(result).to.deep.equal([
        Object.assign({}, subjectSet('1'), { completeness: completeness['1']}),
        Object.assign({}, subjectSet('2'), { completeness: completeness['2']}),
        Object.assign({}, subjectSet('3'), { completeness: completeness['3']})
      ])
    })
  })
})