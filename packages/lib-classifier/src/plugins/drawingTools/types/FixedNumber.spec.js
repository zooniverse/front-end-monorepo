import { types } from 'mobx-state-tree'

import FixedNumber from './FixedNumber.js'

describe('Drawing Tools > Types > FixedNumber', function () {
  const TestModel = types.model('TestModel', {
    x: FixedNumber,
    y: FixedNumber
  })

  it('should fix numbers to 2 decimal places', function () {
    const value = TestModel.create({
      x: 12.34567,
      y: 456.8972
    })
    expect(value.x).to.equal(12.35)
    expect(value.y).to.equal(456.90)
  })

  it('should parse strings as numbers', function () {
    const value = TestModel.create({
      x: '12.34567',
      y: '456.8972'
    })
    expect(value.x).to.equal(12.35)
    expect(value.y).to.equal(456.90)
  })

  it('should pass through rounded numbers', function () {
    const value = TestModel.create({
      x: 12.35,
      y: 456.90
    })
    expect(value.x).to.equal(12.35)
    expect(value.y).to.equal(456.90)
  })

  it('should error for an invalid snapshot', function () {
    expect(() => TestModel.create({ x: 'not a number', y: 'also not a number' })).to.throw()
  })
})
