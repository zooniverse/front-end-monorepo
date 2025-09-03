import locationValidator from './locationValidator'

const valid = [{
  type: 'image',
  mimeType: 'image/png',
  url: 'https://example.com/image.png'
}]
const invalid = [{ 'foo': 'bar' }]

// Note that we only test a single location - locationValidator is applied to
// each location object by `PropTypes.arrayOf`.
describe('Helper > locationValidator', function () {
  it('should return undefined when passed a valid array of locations', function () {
    const result = locationValidator(valid, 0, 'TestComponent', 'prop', 'subject.locations[0]')
    expect(result).to.equal(undefined)
  })

  it('should return an error when passed an invalid array of locations', function () {
    const result = locationValidator(invalid, 0, 'TestComponent', 'prop', 'subject.locations[0]')
    expect(locationValidator).to.throw()
    expect(result.message).to.equal('Invalid prop `subject.locations[0]` supplied to `TestComponent`. Validation failed.')
  })
})
