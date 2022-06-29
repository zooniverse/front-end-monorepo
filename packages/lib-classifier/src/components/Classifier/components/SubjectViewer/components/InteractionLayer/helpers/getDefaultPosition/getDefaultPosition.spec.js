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

  describe('with a line at the bottom of the viewport', function () {
    let line, position
    const POPUP_HEIGHT = 300
    const POPUP_WIDTH = 400

    before(function () {
      line = {
        x: 5,
        y: window.innerHeight - 20,
        width: 200,
        height: 10
      }
      position = getDefaultPosition(line, POPUP_HEIGHT, POPUP_WIDTH)
    })

    it('should place the edge of the popup halfway along the line', function () {
      expect(position.x).to.equal(105)
    })

    it('should place the bottom of the popup one line above the line', function () {
      const bottom = position.y + POPUP_HEIGHT
      expect(bottom).to.equal(line.y - line.height)
    })
  })

  describe('with a line at the top of the viewport', function () {
    let line, position
    const POPUP_HEIGHT = 300
    const POPUP_WIDTH = 400

    before(function () {
      line = {
        x: 5,
        y: 20,
        width: 200,
        height: 10
      }
      position = getDefaultPosition(line, POPUP_HEIGHT, POPUP_WIDTH)
    })

    it('should place the edge of the popup halfway along the line', function () {
      expect(position.x).to.equal(105)
    })

    it('should place the top of the popup one line below the line', function () {
      expect(position.y).to.equal(line.y + line.height)
    })
  })
})
