import nock from 'nock'

import fetchProjectPage from './'

describe('helpers > fetchProjectPage', function () {
  const project = {
    about_pages: [
      {
        id: '123',
        title: 'Research',
        url_key: 'science_case'
      },
      {
        id: '124',
        title: 'Education',
        url_key: 'education'
      }
    ],
    primary_language: 'fr',
    strings: {
      display_name: 'Le projet en français'
    }
  }

  before(function () {
    nock('https://panoptes-staging.zooniverse.org/api')
    .get('/translations')
    .query(query => query.translated_type === 'project_page' &&
      query.language === 'en,fr' &&
      query.translated_id === '124'
    )
    .reply(200, {
      translations: [
        {
          language: 'fr',
          strings: {
            content: 'Le singe est dans l\'arbre.'
          }
        },
        {
          language: 'en',
          strings: {
            content: 'The monkey is in the tree.'
          }
        }
      ]
    })
    .get('/translations')
    .query(query => query.translated_type === 'project_page' &&
      query.language === 'es,fr' &&
      query.translated_id === '124'
    )
    .reply(200, {
      translations: [
        {
          language: 'fr',
          strings: {
            content: 'Le singe est dans l\'arbre.'
          }
        }
      ]
    })
  })

  describe('with an existing translation', function () {
    it('should return the translated page', async function () {
      const page = await fetchProjectPage(project, 'en', 'education', 'staging')
      expect(page.strings.content).to.equal('The monkey is in the tree.')
    })
  })

  describe('without an existing translation', function () {
    it('should return the page in the project primary language.', async function () {
      const page = await fetchProjectPage(project, 'es', 'education', 'staging')
      expect(page.strings.content).to.equal('Le singe est dans l\'arbre.')
    })
  })

  describe('when the page doesn\'t exist', function () {
    it('should return undefined', async function () {
      const page = await fetchProjectPage(project, 'fr', 'team', 'staging')
      expect(page).to.be.undefined()
    })
  })
})