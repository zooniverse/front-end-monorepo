import { expect } from 'chai'
import validateDefaultTolerance from './validations'

describe('feedback datavis: validations', function () {
  const [ valDefTol ] = validateDefaultTolerance

  function mockFormState (ruleID) {
    return {
      defaultFailureMessage: 'Nope, please try again.',
      defaultSuccessMessage: 'Correct, nice job!',
      failureEnabled: true,
      id: `${ruleID}`,
      successEnabled: true
    }
  }

  it('should return false if default tolerance undefined', function () {
    expect(valDefTol(mockFormState(1234))).to.be.false
  })

  it('should return false if default tolerance negative number', function () {
    const toleranceNegative = mockFormState(5678)
    toleranceNegative['defaultTolerance'] = '-50'
    expect(valDefTol(toleranceNegative)).to.be.false
  })

  it('should return true if default tolerance positive number', function () {
    const tolerancePositive = mockFormState(91011)
    tolerancePositive['defaultTolerance'] = '65.43'
    expect(valDefTol(tolerancePositive)).to.be.true
  })
})
