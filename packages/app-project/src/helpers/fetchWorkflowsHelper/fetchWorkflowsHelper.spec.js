import { expect } from 'chai'
import nock from 'nock'

import fetchWorkflowsHelper from './fetchWorkflowsHelper'

describe('Helpers > fetchWorkflowsHelper', function () {
  const WORKFLOWS = [
    {
      id: '1',
      completeness: 0.4,
      configuration: {
        level: 1
      },
      grouped: false,
      links: {
        subject_sets: ['1', '2', '3']
      }
    },
    {
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

    expect(result).to.deep.equal([
      {
        completeness: 0.4,
        configuration: {
          level: 1
        },
        default: true,
        grouped: false,
        id: '1',
        displayName: 'Foo',
        links: {
          subject_sets: ['1', '2', '3']
        },
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
        configuration: {
          level: 1
        },
        default: false,
        grouped: false,
        id: '1',
        displayName: 'Foo',
        links: {
          subject_sets: ['1', '2', '3']
        },
        subjectSets: []
      },
      {
        completeness: 0.7,
        configuration: {
          level: 2
        },
        default: false,
        grouped: true,
        id: '2',
        displayName: 'Bar',
        links: {
          subject_sets: ['1', '2', '3']
        },
        subjectSets: []
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
          configuration: {
            level: 1
          },
          default: false,
          grouped: false,
          id: '1',
          displayName: 'Foo',
          links: {
            subject_sets: ['1', '2', '3']
          },
          subjectSets: []
        },
        {
          completeness: 0.7,
          configuration: {
            level: 2
          },
          default: true,
          grouped: true,
          id: '2',
          displayName: 'Bar',
          links: {
            subject_sets: ['1', '2', '3']
          },
          subjectSets: []
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
          configuration: {
            level: 2
          },
          default: true,
          grouped: true,
          id: '2',
          displayName: 'Bar',
          links: {
            subject_sets: ['1', '2', '3']
          },
          subjectSets: []
        },
        {
          completeness: 0.4,
          configuration: {
            level: 1
          },
          default: false,
          grouped: false,
          id: '1',
          displayName: 'Foo',
          links: {
            subject_sets: ['1', '2', '3']
          },
          subjectSets: []
        }
      ])
    })
  })
})
