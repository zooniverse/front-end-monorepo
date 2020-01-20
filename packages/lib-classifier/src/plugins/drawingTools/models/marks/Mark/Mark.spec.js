import Mark from './Mark'

describe('Models > Drawing Task > Mark', function () {
  let mark

  before(function () {
    mark = Mark.create({ id: 'test', toolType: 'default' })
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

  describe('getDistance', function () {
    it('should return the distance between two points', function () {
      expect(mark.getDistance(-20, -20, 20, 10)).to.equal(50)
    })
  })

  describe('getAngle', function () {
    it('should work at -90 degrees', function () {
      expect(mark.getAngle(-20, -20, -20, -40)).to.equal(-90)
    })

    it('should work at 0 degrees', function () {
      expect(mark.getAngle(-20, -20, 20, -20)).to.equal(0)
    })

    it('should work at 90 degrees', function () {
      expect(mark.getAngle(-20, -20, -20, 20)).to.equal(90)
    })

    it('should work at 180 degrees', function () {
      expect(mark.getAngle(-20, -20, -40, -20)).to.equal(180)
    })
  })
})
