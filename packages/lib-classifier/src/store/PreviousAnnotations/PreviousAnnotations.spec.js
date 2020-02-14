import sinon from 'sinon'

import PreviousAnnotations, { caesarClient } from './PreviousAnnotations'

describe.only('Models > PreviousAnnotations', function () {
  let previousAnnotations

  before(function () {
    // sinon.stub(console, 'error')
    previousAnnotations = PreviousAnnotations.create({
      caesarReducerKey: 'ext',
      subjectId: '13971150',
      workflowId: '5339'
    })
  })

  after(function () {
    // console.error.restore()
  })

  it('should exist', function () {
    expect(previousAnnotations).to.be.ok()
  })

  it('should update on frame change', function () {
    previousAnnotations.changeFrame(2)
    expect(previousAnnotations).to.be.ok()
  })
})
