import zipLabelsAndUrls from './zipLabelsAndUrls'

const LABELS = [
  'Google'
]

const URLS = [
  'https://www.google.com'
]

const RESULT = [
  {
    label: 'Google',
    url: 'https://www.google.com'
  }
]

describe('Helpers > zipLabelsAndUrls', function () {
  it('should zip together two arrays', function () {
    expect(zipLabelsAndUrls(LABELS, URLS)).to.deep.equal(RESULT)
  })
})
