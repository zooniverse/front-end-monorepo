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
      grouped: false,
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
      set_member_subjects_count: 10
    }
  }

  before(function () {
    const cellect = nock('https://cellect.zooniverse.org')
    .persist()
    .get('/workflows/1/status')
    .reply(200, {
      groups: availableSubjects
    })
    .get('/workflows/2/status')
    .reply(200, {
      groups: availableSubjects
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
        workflows: WORKFLOWS.slice(0, 1),
        linked: { 
          subject_sets: [
            subjectSet('1'),
            subjectSet('2'),
            subjectSet('3')
          ]
        }
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
        subjectSets: [
          Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
          Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
          Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
        ]
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
        workflows: WORKFLOWS,
        linked: { 
          subject_sets: [
            subjectSet('1'),
            subjectSet('2'),
            subjectSet('3')
          ]
        }
      })

    const result = await fetchWorkflowsHelper('en', ['1', '2'])
    expect(result).to.deep.equal([
      {
        completeness: 0.4,
        default: false,
        grouped: false,
        id: '1',
        displayName: 'Foo',
        subjectSets: [
          Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
          Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
          Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
        ]
      },
      {
        completeness: 0.7,
        default: false,
        grouped: false,
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
          workflows: WORKFLOWS,
          linked: { 
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        })

      const result = await fetchWorkflowsHelper('en', ['1', '2'], '2')
      expect(result).to.deep.equal([
        {
          completeness: 0.4,
          default: false,
          grouped: false,
          id: '1',
          displayName: 'Foo',
          subjectSets: [
            Object.assign(subjectSet('1'), { availableSubjects: availableSubjects[1]}),
            Object.assign(subjectSet('2'), { availableSubjects: availableSubjects[2]}),
            Object.assign(subjectSet('3'), { availableSubjects: availableSubjects[3]})
          ]
        },
        {
          completeness: 0.7,
          default: true,
          grouped: false,
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
    it('should allow the error to be thrown for the consumer to handle', async function () {
      const error = {
        message: 'oh dear. oh dear god'
      }
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .replyWithError(error)
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: WORKFLOWS,
          linked: { 
            subject_sets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        })

      try {
        await fetchWorkflowsHelper('en', ['1', '2'], '2')
        expect.fail()
      } catch (error) {
        expect(error).to.deep.equal({
          ...error,
          response: undefined
        })
      }
    })
  })
})
