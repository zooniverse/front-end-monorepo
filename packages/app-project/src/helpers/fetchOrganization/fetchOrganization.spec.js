import nock from 'nock'

import fetchOrganization from './fetchOrganization'

describe('Helpers > fetchOrganization', function () {
  const ORGANIZATION = {
    id: '456',
    display_name: 'Test Organization',
    listed: true,
    primary_language: 'en',
    title: 'Test Organization',
  }

  const TRANSLATIONS = [
    {
      language: 'en',
      strings: {
        title: 'Test Organization'
      }
    },
    {
      language: 'fr',
      strings: {
        title: 'traduction française'
      }
    }
  ]

  before(function () {
    nock('https://panoptes-staging.zooniverse.org/api')
      .persist()
      .get('/organizations')
      .query(true)
      .reply(200, {
        organizations: [ORGANIZATION]
      })
      .get('/translations')
      .query(true)
      .reply(200, {
        translations: TRANSLATIONS
      })
  })

  after(function () {
    nock.cleanAll()
  })

  it('should provide the expected result', async function () {
    const result = await fetchOrganization('456', 'en', 'staging')

    expect(result).to.deep.equal({
      ...ORGANIZATION,
      strings: TRANSLATIONS[0].strings
    })
  })

  describe('with an existing translation', function () {
    it('should return the translated organization', async function () {
      const result = await fetchOrganization('456', 'fr', 'staging')

      expect(result).to.deep.equal({
        ...ORGANIZATION,
        strings: TRANSLATIONS[1].strings
      })
    })
  })

  // This does not trigger fetchOrganization's catch block
  describe.skip('with an error', function () {
    it('should return null', async function () {
      const mockError = new Error({ status: 500, response: 'API is down' })
      nock('https://panoptes-staging.zooniverse.org/api')
        .get('/organizations')
        .query(true)
        .replyWithError(mockError)
        .get('/translations')
        .query(true)
        .reply(200, {
          translations: TRANSLATIONS
        })
      const result = await fetchOrganization('456', 'en', 'staging')

      expect(result).to.equal(null)
    })
  })
})
