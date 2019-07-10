import { expect } from 'chai'

import pluckContentType from './pluckContentType'

const CONTENT_TYPE = 'foobar'

const MOCK_ENTRY = {
  sys: {
    contentType: {
      sys: {
        id: CONTENT_TYPE
      }
    }
  }
}

describe('Helpers > pluckContentType', function () {
  it('should exist', function () {
    expect(pluckContentType).to.be.a('function')
  })

  it('should get the entry content type', function () {
    expect(pluckContentType(MOCK_ENTRY)).to.equal(CONTENT_TYPE)
  })
})
