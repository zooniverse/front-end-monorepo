import nock from 'nock'

import fetchDiscussions from './fetchDiscussions.js'

describe('Helpers > fetchDiscussions', function() {
  const mockDiscussions = [
    {
      id: '12345',
      title: 'Test Discussion',
      subject_default: false
    },
    {
      id: '67890',
      title: 'Default Subject Discussion',
      subject_default: true
    }
  ]

  const mockResponse = {
    discussions: mockDiscussions
  }

  describe('when talk returns a discussions resource', function() {
    before(function() {
      nock('https://talk-staging.zooniverse.org')
        .get('/discussions')
        .query(true)
        .reply(200, mockResponse)
    })

    after(function() {
      nock.cleanAll()
    })

    it('should return the discussions data', async function() {
      const discussions = await fetchDiscussions('12345', 'staging')
      expect(discussions).toEqual(mockDiscussions)
    })
  })
  
  describe('when talk returns an empty discussions array', function() {
    before(function() {
      nock('https://talk-staging.zooniverse.org')
        .get('/discussions')
        .query(true)
        .reply(200, { discussions: [] })
    })

    after(function() {
      nock.cleanAll()
    })

    it('should return an empty array', async function() {
      const discussions = await fetchDiscussions('12345', 'staging')
      expect(discussions).toEqual([])
    })
  })

  describe('when the talk call errors', function() {
    let consoleErrorSpy

    before(function() {
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(function() {})
      nock('https://talk-staging.zooniverse.org')
        .get('/discussions')
        .query(true)
        .replyWithError(new Error('API is down'))
    })

    after(function() {
      consoleErrorSpy.mockRestore()
      nock.cleanAll()
    })

    it('should throw an error and log it', async function() {
      await expect(fetchDiscussions('12345', 'staging')).rejects.toThrow('API is down')
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    })
  })
})
