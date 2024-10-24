import { SortedSet } from './../helpers/SortedSet'

describe('Component > VolumetricViewer > SortedSet', () => {
  const testSet1 = SortedSet()

  // .add()
  it('should add items in order', () => {
    testSet1.add({ value: 5 })
    expect(testSet1.data).deep.to.equal([5])

    testSet1.add({ value: 3 })
    expect(testSet1.data).deep.to.equal([3, 5])

    testSet1.add({ value: 7 })
    expect(testSet1.data).deep.to.equal([3, 5, 7])
  })

  it('should not add a value that already exists', () => {
    testSet1.add({ value: 5 })
    expect(testSet1.data).deep.to.equal([3, 5, 7])

    testSet1.add({ value: 5 })
    expect(testSet1.data).deep.to.equal([3, 5, 7])
  })

  // .remove()
  it('should remove items in order', () => {
    testSet1.remove({ value: 5 })
    expect(testSet1.data).deep.to.equal([3, 7])

    testSet1.remove({ value: 3 })
    expect(testSet1.data).deep.to.equal([7])

    testSet1.remove({ value: 7 })
    expect(testSet1.data).deep.to.equal([])
  })

  // .add() & .remove()
  it('should add and remove together', () => {
    testSet1.add({ value: 5 })
    testSet1.add({ value: 2 })
    testSet1.add({ value: 12 })
    testSet1.add({ value: 13 })
    testSet1.add({ value: 7 })
    testSet1.add({ value: 1 })
    expect(testSet1.data).deep.to.equal([1, 2, 5, 7, 12, 13])

    testSet1.remove({ value: 7 })
    testSet1.remove({ value: 1 })
    testSet1.remove({ value: 13 })
    expect(testSet1.data).deep.to.equal([2, 5, 12])

    testSet1.add({ value: 13 })
    testSet1.add({ value: 1 })
    testSet1.add({ value: 7 })
    expect(testSet1.data).deep.to.equal([1, 2, 5, 7, 12, 13])
  })

  // .has()
  it('should return "true" if the set .has the value', () => {
    expect(testSet1.has({ value: 13 })).to.equal(true)
  })

  it('should return "false" if the set doesn\'t have the value', () => {
    expect(testSet1.has({ value: 14 })).to.equal(false)
  })

  // MULTIPLE SETS
  const testSet2 = SortedSet({ data: [1, 5, 9] })
  const testSet3 = SortedSet({ data: [1, 3, 7, 9] })
  const testSet4 = SortedSet({ data: [3, 5, 9, 11] })

  // .intersection()
  it('should return intersection of set 2 & 3', () => {
    const intersection2n3 = testSet2.intersection({ sets: [testSet3] })
    const intersection3n2 = testSet3.intersection({ sets: [testSet2] })
    expect(intersection2n3.data).deep.to.equal([1, 9])
    expect(intersection3n2.data).deep.to.equal([1, 9])
  })

  it('should return intersection of set 3 & 4', () => {
    const intersection3n4 = testSet3.intersection({ sets: [testSet4] })
    const intersection4n3 = testSet4.intersection({ sets: [testSet3] })
    expect(intersection3n4.data).deep.to.equal([3, 9])
    expect(intersection4n3.data).deep.to.equal([3, 9])
  })

  it('should return intersection of set 2 & 4', () => {
    const intersection2n4 = testSet2.intersection({ sets: [testSet4] })
    const intersection4n2 = testSet4.intersection({ sets: [testSet2] })
    expect(intersection2n4.data).deep.to.equal([5, 9])
    expect(intersection4n2.data).deep.to.equal([5, 9])
  })

  it('should return intersection of set 2, 3 & 4', () => {
    const intersection2n3n4 = testSet2.intersection({ sets: [testSet3, testSet4] })
    const intersection2n4n3 = testSet2.intersection({ sets: [testSet4, testSet3] })
    const intersection3n2n4 = testSet3.intersection({ sets: [testSet2, testSet4] })
    const intersection3n4n2 = testSet3.intersection({ sets: [testSet4, testSet2] })
    const intersection4n2n3 = testSet4.intersection({ sets: [testSet2, testSet3] })
    const intersection4n3n2 = testSet4.intersection({ sets: [testSet3, testSet2] })

    expect(intersection2n3n4.data).deep.to.equal([9])
    expect(intersection2n4n3.data).deep.to.equal([9])
    expect(intersection3n2n4.data).deep.to.equal([9])
    expect(intersection3n4n2.data).deep.to.equal([9])
    expect(intersection4n2n3.data).deep.to.equal([9])
    expect(intersection4n3n2.data).deep.to.equal([9])
  })

  // .union()
  it('should return union of set 2 & 3', () => {
    const union2n3 = testSet2.union({ sets: [testSet3] })
    const union3n2 = testSet3.union({ sets: [testSet2] })
    expect(union2n3.data).deep.to.equal([1, 3, 5, 7, 9])
    expect(union3n2.data).deep.to.equal([1, 3, 5, 7, 9])
  })

  it('should return union of set 3 & 4', () => {
    const union3n4 = testSet3.union({ sets: [testSet4] })
    const union4n3 = testSet4.union({ sets: [testSet3] })
    expect(union3n4.data).deep.to.equal([1, 3, 5, 7, 9, 11])
    expect(union4n3.data).deep.to.equal([1, 3, 5, 7, 9, 11])
  })

  it('should return union of set 2 & 4', () => {
    const union2n4 = testSet2.union({ sets: [testSet4] })
    const union4n2 = testSet4.union({ sets: [testSet2] })
    expect(union2n4.data).deep.to.equal([1, 3, 5, 9, 11])
    expect(union4n2.data).deep.to.equal([1, 3, 5, 9, 11])
  })

  it('should return union of set 2, 3 & 4', () => {
    const union2n3n4 = testSet2.union({ sets: [testSet3, testSet4] })
    const union2n4n3 = testSet2.union({ sets: [testSet4, testSet3] })
    const union3n2n4 = testSet3.union({ sets: [testSet2, testSet4] })
    const union3n4n2 = testSet3.union({ sets: [testSet4, testSet2] })
    const union4n2n3 = testSet4.union({ sets: [testSet2, testSet3] })
    const union4n3n2 = testSet4.union({ sets: [testSet3, testSet2] })

    expect(union2n3n4.data).deep.to.equal([1, 3, 5, 7, 9, 11])
    expect(union2n4n3.data).deep.to.equal([1, 3, 5, 7, 9, 11])
    expect(union3n2n4.data).deep.to.equal([1, 3, 5, 7, 9, 11])
    expect(union3n4n2.data).deep.to.equal([1, 3, 5, 7, 9, 11])
    expect(union4n2n3.data).deep.to.equal([1, 3, 5, 7, 9, 11])
    expect(union4n3n2.data).deep.to.equal([1, 3, 5, 7, 9, 11])
  })
})
