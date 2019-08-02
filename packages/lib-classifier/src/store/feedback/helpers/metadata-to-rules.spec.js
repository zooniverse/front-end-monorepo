import { expect } from 'chai'
import metadataToRules from './metadata-to-rules'

describe('feedback: metadataToRules', function () {
  function mockSubjectWithRule (ruleID) {
    return {
      metadata: {
        '#feedback_1_id': ruleID,
        '#feedback_1_answer': '0',
        '#feedback_1_failureMessage': 'Actually, this sound is from noise (background)',
        '#feedback_1_successMessage': 'Correct!'
      }
    }
  }

  function expectedRules (ruleID) {
    return [{
      id: ruleID,
      answer: '0',
      failureMessage: 'Actually, this sound is from noise (background)',
      successMessage: 'Correct!'
    }]
  }

  it('should generate a rules object for string IDs', function () {
    const subject = mockSubjectWithRule('0')
    const rules = metadataToRules(subject.metadata)
    expect(rules).to.deep.equal(expectedRules('0'))
  })

  it('should generate a rules object for numerical IDs', function () {
    const subject = mockSubjectWithRule(0)
    const rules = metadataToRules(subject.metadata)
    expect(rules).to.deep.equal(expectedRules(0))
  })
})
