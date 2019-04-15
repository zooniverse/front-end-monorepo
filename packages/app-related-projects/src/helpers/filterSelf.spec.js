const filterSelf = require('./filterSelf')

const OBJ_1 = { id: '1' }
const OBJ_2 = { id: '2' }

describe('helpers > filterSelf', function () {
  it('should return `true` if the `id` properties don\'t match', function () {
    expect(filterSelf(OBJ_1, OBJ_2)).to.be.true()
  })

  it('should return `false` if the `id` properties match', function () {
    expect(filterSelf(OBJ_1, OBJ_1)).to.be.false()
  })
})
