import nock from 'nock'

import fetchTranslations from './'

describe('helpers > fetchTranslations', function () {
  before(function () {
    nock('https://panoptes-staging.zooniverse.org/api')
    .get('/translations')
    .query(query => query.translated_type === 'project')
    .reply(200, {
      translations: [
        {
          strings: {
            display_name: 'test project'
          }
        }
      ]
    })
    .get('/translations')
    .query(query => query.translated_type === 'project_page')
    .reply(200, {
      translations: [
        {
          strings: {
            content: 'test project page'
          }
        }
      ]
    })
    .get('/translations')
    .query(query => query.translated_type === 'made_up')
    .reply(200, {
      translations: []
    })
  })

  it('should fetch project translations', async function () {
    const translation = await fetchTranslations({
      translated_id: 1234,
      translated_type: 'project',
      language: 'en',
      env: 'staging'
    })
    expect(translation?.strings?.display_name).to.equal('test project')
  })

  it('should fetch project page translations', async function () {
    const translation = await fetchTranslations({
      translated_id: 1234,
      translated_type: 'project_page',
      language: 'en',
      env: 'staging'
    })
    expect(translation?.strings?.content).to.equal('test project page')
  })

  it('should be undefined when the search query has no results', async function () {
    const translation = await fetchTranslations({
      translated_id: 1234,
      translated_type: 'made_up',
      language: 'en',
      env: 'staging'
    })
    expect(translation).to.be.undefined()
  })
})