import convertLocationToObject from './convertLocationToObject'

describe('convertLocationToObject helper', function () {
  it('should turn a subject location into an object', function () {
    const location = { 'foo/bar': 'http://foo.bar' }
    convertLocationToObject(location).should.deep.equal({
      mimeType: 'foo',
      mimeSubType: 'bar',
      url: 'http://foo.bar'
    })
  })
})
