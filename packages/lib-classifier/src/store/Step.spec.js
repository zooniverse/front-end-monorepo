import Step from './Step'

describe('Model > Step', function () {
  let step
  before(function () {
    step = Step.create({ stepKey: 'S1', taskKeys: ['T1'] })
  })

  it('should exist', function () {
    expect(step).to.exist
    expect(step).to.be.an('object')
  })
})