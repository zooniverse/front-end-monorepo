import Mark from './Mark'

describe('Models > Drawing Task > Mark', function () {
  let mark

  before(function () {
    mark = Mark.create({ id: 'test'})
  })

  it('should exist', function () {
    expect(mark).to.be.ok()
  })

  it('should have a toolIndex', function () {
    expect(mark.toolIndex).to.equal(0)
  })

  it('should have a frame number', function () {
    expect(mark.frame).to.equal(0)
  })

  it('should be valid', function () {
    expect(mark.isValid).to.be.true()
  })

  it('should be able to store annotations', function () {
    expect(mark.annotations).to.be.ok()
  })
})