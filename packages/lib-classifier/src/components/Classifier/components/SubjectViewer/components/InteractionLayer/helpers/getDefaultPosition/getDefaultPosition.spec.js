import getDefaultPosition from './getDefaultPosition'

describe('InteractionLayer > helpers > getDefaultPosition', function () {
  it('should be a function', function () {
    expect(getDefaultPosition).to.be.a('function')
  })

  describe('without defined bounds', function () {
    it('should return a calculated x, y position', function () {
      const position = getDefaultPosition()

      expect(position.x).to.be.a('number')
      expect(position.y).to.be.a('number')
    })
  })

  describe('with defined bounds', function () {
    it('should return a calculated x, y position', function () {
      const position = getDefaultPosition({
        bounds: {
          x: 1,
          y: 1,
          width: 10,
          height: 10
        }
      })

      expect(position.x).to.be.a('number')
      expect(position.y).to.be.a('number')
    })
  })
})