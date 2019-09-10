import nock from 'nock'

import fetchWorkflowsHelper from './fetchWorkflowsHelper'

const WORKFLOWS = [
  {
    id: '1',
    completeness: 0.4
  },
  {
    id: '2',
    completeness: 0.7
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

describe('Helpers > fetchWorkflowsHelper', function () {
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
      { completeness: 0.4, default: true, id: '1', displayName: 'Foo' }
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
      { completeness: 0.4, default: false, id: '1', displayName: 'Foo' },
      { completeness: 0.7, default: false, id: '2', displayName: 'Bar' }
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
        { completeness: 0.4, default: false, id: '1', displayName: 'Foo' },
        { completeness: 0.7, default: true, id: '2', displayName: 'Bar' }
      ])
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
          workflows: WORKFLOWS
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
