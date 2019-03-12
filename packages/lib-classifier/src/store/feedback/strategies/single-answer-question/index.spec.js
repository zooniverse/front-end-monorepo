import chai from 'chai'

import index from './index'

const expect = chai.expect

describe('Feedback > Single Answer Question > Index', function () {
  it('should have a `createRule` property', function () {
    expect(index.createRule).to.be.a('function')
  })

  it('should have a `id` property', function () {
    expect(index.id).to.equal('singleAnswerQuestion')
  })

  it('should have a `title` property', function () {
    expect(index.title).to.equal('Single Answer Question')
  })

  it('should have a `labComponent` property', function () {
    expect(index.labComponent).to.equal(null)
  })

  it('should have a `validations` property', function () {
    expect(index.validations).to.equal(null)
  })

  it('should have a `reducer` property', function () {
    expect(index.reducer).to.be.a('function')
  })
})
