import nock from 'nock'

import fetchProjectPageTitles from './fetchProjectPageTitles.js'

describe('Helpers > fetchProjectPageTitles', function () {
  const project_pages = [
    {
      id: '123',
      title: 'Research',
      url_key: 'science_case',
      content: 'About the project\'s research'
    },
    {
      id: '124',
      title: 'Education',
      url_key: 'education',
      content: 'This is the Education page.'
    },
    {
      id: '125',
      title: 'Results',
      url_key: 'results',
      content: ''
    }
  ]

  before(function () {
    nock('https://panoptes-staging.zooniverse.org/api')
    .get('/projects/1/pages')
    .query(true)
    .reply(200, { project_pages })
    .get('/projects/2/pages')
    .query(true)
    .reply(500, 'Internal server error' )
  })

  it('should fetch a list of pages that have content', async function () {
    const pageTitles = await fetchProjectPageTitles({ id : '1' })
    expect(pageTitles).to.deep.equal([
      {
        id: '123',
        title: 'Research',
        url_key: 'science_case',
      },
      {
        id: '124',
        title: 'Education',
        url_key: 'education'
      }
    ])
  })

  it('should be empty on error', async function () {
    const pageTitles = await fetchProjectPageTitles({ id : '1' })
    expect(pageTitles).to.deep.equal([])
  })
})