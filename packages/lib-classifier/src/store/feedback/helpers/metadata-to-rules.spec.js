import { expect } from 'chai'
import metadataToRules from './metadata-to-rules'

describe('feedback: metadataToRules', function () {
  function mockSubjectWithRule (ruleID) {
    return {
      metadata: {
        '#feedback_[1]_id': ruleID,
        '#feedback_[1]_answer': '0',
        '#feedback_[1]_failureMessage': 'Actually, this sound is from noise (background)',
        '#feedback_[1]_successMessage': 'Correct!'
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
