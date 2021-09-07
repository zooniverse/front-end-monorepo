import chai from 'chai'

import index from './index'

const expect = chai.expect

describe('Feedback > Survey > Simple > Index', function () {
  it('should have a `createRule` property', function () {
    expect(index.createRule).to.be.a('function')
  })

  it('should have a `id` property', function () {
    expect(index.id).to.equal('surveySimple')
  })

  it('should have a `title` property', function () {
    expect(index.title).to.equal('Survey: Simple')
  })

  it('should have a `labComponent` property', function () {
    expect(index.labComponent).to.be.null()
  })

  it('should have a `validations` property', function () {
    expect(index.validations).to.be.null()
  })

  it('should have a `reducer` property', function () {
    expect(index.reducer).to.be.a('function')
  })
})
