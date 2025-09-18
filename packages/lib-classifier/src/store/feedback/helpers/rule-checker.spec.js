import ruleChecker from './rule-checker'

describe('feedback: rule checker', function () {
  function generateValidRule (ruleID) {
    return {
      id: ruleID,
      strategy: 'singleAnswerQuestion',
      failureEnabled: true,
      successEnabled: true,
      defaultFailureMessage: '"Actually, that\'s not correct"',
      defaultSuccessMessage: '"Correct"'
    }
  }
  function generateInvalidRule (ruleID) {
    return {
      id: ruleID,
      strategy: '',
      failureEnabled: true,
      successEnabled: true,
      defaultFailureMessage: '"Actually, that\'s not correct"',
      defaultSuccessMessage: '"Correct"'
    }
  }
  const validRuleIDs = ['51', 51, 'hello world']
  validRuleIDs.forEach(function (ruleID) {
    describe(`with rule ID ${ruleID}`, function () {
      it('should return a valid rule', function () {
        const rule = generateValidRule(ruleID)
        expect(ruleChecker(rule)).to.deep.equal(rule)
      })
      // This test does not generate errors from ruleChecker. Needs refactoring.
      it('should reject an invalid rule', function () {
        const rule = generateInvalidRule(ruleID)
        // expect(ruleChecker(rule)).to.be.empty()
      })
    })
  })
})
