import sinon from 'sinon'
import getBearerToken from './getBearerToken'

describe('Store utils > getBearerToken', function () {
  it('returns an empty string if the authClient is undefined', async function () {
    const token = await getBearerToken()
    expect(token).to.equal('')
  })

  describe('when using a first party auth client', function () {
    it('calls authClient.checkBearerToken', function () {
      const mockAuthClient = {
        checkBearerToken: sinon.spy()
      }

      getBearerToken(mockAuthClient)
      expect(mockAuthClient.checkBearerToken).to.have.been.calledOnce
    })

    it('returns an empty string if token returned from auth client is falsey', async function () {
      const mockAuthClient = {
        checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
      }

      const token = await getBearerToken(mockAuthClient)
      expect(token).to.equal('')
    })

    it('returns the bearer token if token returned from auth client is truthy', async function () {
      const mockToken = '1234'
      const mockAuthClient = {
        checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(mockToken))
      }

      const token = await getBearerToken(mockAuthClient)
      expect(token).to.equal(`Bearer ${mockToken}`)
    })
  })

  describe('when using an oauth client', function () {
    it('calls authClient.checkBearerToken', function () {
      const mockOAuthClient = {
        checkBearerToken: sinon.spy()
      }

      getBearerToken(mockOAuthClient)
      expect(mockOAuthClient.checkBearerToken).to.have.been.calledOnce
    })

    it('returns an empty string if token returned from auth client is falsey', function () {
      const mockOAuthClient = {
        checkBearerToken: sinon.stub().callsFake(() => Promise.resolve({ access_token: null }))
      }

      return getBearerToken(mockOAuthClient).then((token) => {
        return expect(token).to.equal('')
      })
    })

    it('returns the bearer token if token returned from auth client is truthy', function () {
      const mockToken = '1234'
      const mockOAuthClient = {
        checkBearerToken: sinon.stub().callsFake(() => Promise.resolve({ access_token: mockToken }))
      }

      return getBearerToken(mockOAuthClient).then((token) => {
        return expect(token).to.equal(`Bearer ${mockToken}`)
      })
    })
  })
})
