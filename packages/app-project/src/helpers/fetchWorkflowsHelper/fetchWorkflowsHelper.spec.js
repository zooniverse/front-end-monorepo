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

  const COMPLETED_WORKFLOWS = [
    {
      id: '1',
      completeness: 1,
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
  ]

  // `translated_id` is a number because of a bug in the translations API :(
  // This comment ^ was added in https://github.com/zooniverse/front-end-monorepo/pull/1077
  // I think it just means translated_id is type number whereas workflow.id from panotpes is a string
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
        translations: [ TRANSLATIONS[0] ]
      })
      .get('/workflows')
      .query(true)
      .reply(200, {
        workflows: [ WORKFLOWS[0] ]
      })

    const result = await fetchWorkflowsHelper('en', ['1'])

    expect(result).to.deep.equal([
      {
        ...WORKFLOWS[0],
        displayName: 'Foo'
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
        ...WORKFLOWS[0],
        displayName: 'Foo'
      },
      {
        ...WORKFLOWS[1],
        displayName: 'Bar'
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
          ...WORKFLOWS[0],
          displayName: 'Foo'
        },
        {
          ...WORKFLOWS[1],
          displayName: 'Bar'
        }
      ])
    })
  })

  describe('when all active workflows are complete', function () {
    it('should return all active workflows regardless of individual completeness', async function () {
      const scope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
        .get('/workflows')
        .query(true)
        .reply(200, {
          workflows: COMPLETED_WORKFLOWS
        })

      const result = await fetchWorkflowsHelper('en', ['1', '2'])
      expect(result).to.deep.equal([
        {
          ...COMPLETED_WORKFLOWS[0],
          displayName: 'Foo'
        },
        {
          ...COMPLETED_WORKFLOWS[1],
          displayName: 'Bar'
        }
      ])
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
          workflows: COMPLETED_WORKFLOWS
        })
        .get('/workflows')
        .query(query => query.id == '2')
        .reply(200, {
          workflows: COMPLETED_WORKFLOWS[1]
        })

      const result = await fetchWorkflowsHelper('en', ['1', '2'], '2')
      expect(result).to.deep.equal([
        {
          ...COMPLETED_WORKFLOWS[0],
          displayName: 'Foo'
        },
        {
          ...COMPLETED_WORKFLOWS[1],
          displayName: 'Bar'
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
      expect(workflows).toBeUndefined()
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
          ...WORKFLOWS[1],
          displayName: 'Bar'
        },
        {
          ...WORKFLOWS[0],
          displayName: 'Foo'
        }
      ])
    })
  })
})
