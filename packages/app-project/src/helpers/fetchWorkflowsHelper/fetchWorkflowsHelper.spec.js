import { expect } from 'chai'
import nock from 'nock'

import fetchWorkflowsHelper from './fetchWorkflowsHelper'

describe('Helpers > fetchWorkflowsHelper', function () {
  const WORKFLOWS = [
    {
      id: '1',
      completeness: 0.4,
      grouped: false,
      links: {
        subject_sets: ['1', '2', '3']
      }
    },
    {
      id: '2',
      completeness: 0.7,
      grouped: true,
      links: {
        subject_sets: ['1', '2', '3']
      }
    }
  ]

  // `translated_id` is a number because of a bug in the translations API :(
  const TRANSLATIONS = [
    {
      translated_id: 1,
      strings: {
        display_name: 'Foo'
      }
    },
    {
      translated_id: 2,
      strings: {
        display_name: 'Bar'
      }
    }
  ]

  const availableSubjects = {
      1: 4,
      2: 10,
      3: 10
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

  it('should provide the expected result with a single workflow', async function () {
    const scope = nock('https://panoptes-staging.zooniverse.org/api')
      .get('/translations')
      .query(true)
      .reply(200, {
        translations: TRANSLATIONS.slice(0, 1)
      })
      .get('/workflows')
      .query(true)
      .reply(200, {
        workflows: WORKFLOWS.slice(0, 1)
      })

    const result = await fetchWorkflowsHelper('en', ['1'])
    const expectedWorkflow = Object.assign({}, WORKFLOWS[0], { displayName: 'Foo' })
    expect(result).to.deep.equal([
      {
        completeness: 0.4,
        default: true,
        grouped: false,
        id: '1',
        displayName: 'Foo',
        subjectSets: []
      }
    ])
  })

  it('should provide the expected result with multiple workflows', async function () {
    const scope = nock('https://panoptes-staging.zooniverse.org/api')
      .get('/translations')
      .query(true)
      .reply(200, {
        translations: TRANSLATIONS
      })
      .get('/workflows')
      .query(true)
      .reply(200, {
        workflows: WORKFLOWS
      })

    const result = await fetchWorkflowsHelper('en', ['1', '2'])
    expect(result).to.deep.equal([
      {
        completeness: 0.4,
        default: false,
        grouped: false,
        id: '1',
        displayName: 'Foo',
        subjectSets: []
      },
      {
        completeness: 0.7,
        default: false,
        grouped: true,
        id: '2',
        displayName: 'Bar',
        subjectSets: [
          Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
          Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
          Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
        ]
      }
    ])
  })

  describe('when there is a `defaultWorkflow` provided', function () {
    it('should provide the expected result with multiple workflows', async function () {
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS
        })

      const result = await fetchWorkflowsHelper('en', ['1', '2'], '2')
      expect(result).to.deep.equal([
        {
          completeness: 0.4,
          default: false,
          grouped: false,
          id: '1',
          displayName: 'Foo',
          subjectSets: []
        },
        {
          completeness: 0.7,
          default: true,
          grouped: true,
          id: '2',
          displayName: 'Bar',
          subjectSets: [
            Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
            Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
            Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
          ]
        }
      ])
    })
  })

  describe('when all active workflows are complete', function () {
    it('should return an empty array.', async function () {
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: []
        })

      const result = await fetchWorkflowsHelper('en', ['1', '2'], '2')
      expect(result).to.be.empty()
    })
  })

  describe(`when there's an error`, function () {
    let workflows

    it('should allow the error to be thrown for the consumer to handle', async function () {
      let thrownError
      const mockError = new Error('oh dear. oh dear god')
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .replyWithError(mockError)
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS
        })

      try {
        workflows = await fetchWorkflowsHelper('en', ['1', '2'], '2')
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).to.deep.equal(mockError)
      expect(workflows).to.be.undefined()
    })
  })

  describe('when there is a workflow order', function () {
    it('should reorder and return the workflows', async function () {
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS
        })
      const workflows = await fetchWorkflowsHelper('en', ['1', '2'], '2', ['2', '1'])
      expect(workflows).to.deep.equal([
        {
          completeness: 0.7,
          default: true,
          grouped: true,
          id: '2',
          displayName: 'Bar',
          subjectSets: [
            Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1] }),
            Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2] }),
            Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3] })
          ]
        },
        {
          completeness: 0.4,
          default: false,
          grouped: false,
          id: '1',
          displayName: 'Foo',
          subjectSets: []
        }
      ])
    })
  })
})
