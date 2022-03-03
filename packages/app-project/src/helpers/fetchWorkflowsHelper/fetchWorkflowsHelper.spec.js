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
      prioritized: false,
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
      prioritized: true,
      links: {
        subject_sets: ['1', '2', '3']
      }
    }
  ]

  const COMPLETED_WORKFLOW = {
    id: '2',
    completeness: 1,
    configuration: {
      level: 2
    },
    grouped: true,
    prioritized: true,
    links: {
      subject_sets: ['1', '2', '3']
    }
  }

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
        grouped: false,
        prioritized: false,
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
        grouped: false,
        prioritized: false,
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
        grouped: true,
        prioritized: true,
        id: '2',
        displayName: 'Bar',
        links: {
          subject_sets: ['1', '2', '3']
        },
        subjectSets: []
      }
    ])
  })

  describe('with a specific workflow ID', function () {
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
          grouped: false,
          prioritized: false,
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
          grouped: true,
          prioritized: true,
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

      const result = await fetchWorkflowsHelper('en', ['1', '2'])
      expect(result).to.be.empty()
    })

    it('should always return a specified workflow.', async function () {
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(query => query.complete)
        .reply(200, {
          workflows: []
        })
        .get('/workflows')
        .query(query => query.id == '2')
        .reply(200, {
          workflows: [ COMPLETED_WORKFLOW ]
        })

      const result = await fetchWorkflowsHelper('en', ['1', '2'], '2')
      expect(result).to.deep.equal([
        {
          completeness: 1,
          configuration: {
            level: 2
          },
          grouped: true,
          prioritized: true,
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
        .query(query => query.id == '1,2')
        .reply(200, {
          workflows: WORKFLOWS
        })
        .get('/workflows')
        .query(query => query.id == '2')
        .reply(200, {
          workflows: WORKFLOWS.filter(workflow => workflow.id == '2')
        })

      try {
        workflows = await fetchWorkflowsHelper('en', ['1', '2'])
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
        .query(query => query.id == '1,2')
        .reply(200, {
          workflows: WORKFLOWS
        })
        .get('/workflows')
        .query(query => query.id == '2')
        .reply(200, {
          workflows: WORKFLOWS.filter(workflow => workflow.id == '2')
        })
      const workflows = await fetchWorkflowsHelper('en', ['1', '2'], undefined, ['2', '1'])
      expect(workflows).to.deep.equal([
        {
          completeness: 0.7,
          configuration: {
            level: 2
          },
          grouped: true,
          prioritized: true,
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
          grouped: false,
          prioritized: false,
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
