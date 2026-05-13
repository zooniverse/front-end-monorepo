import isFeedbackActive from './is-feedback-active'

describe('Feedback: isFeedbackActive', function () {
  const workflow = {
    tasks: {
      T0: {
        feedback: {
          enabled: true,
          rules: [{
            id: '51',
            strategy: 'singleAnswerQuestion',
            failureEnabled: true,
            successEnabled: true,
            defaultFailureMessage: '"Actually, that\'s not correct"',
            defaultSuccessMessage: '"Correct"'
          }]
        }
      }
    }
  }
  const subject = {
    metadata: {
      '#feedback_1_id': '51',
      '#feedback_1_answer': '0',
      '#feedback_1_failureMessage': 'Actually, this sound is from noise (background)',
      '#feedback_1_successMessage': 'Correct!'
    }
  }
  describe('with a valid workflow and subject', function () {
    it('should be true with a valid workflow and subject', function () {
      expect(isFeedbackActive(subject, workflow)).to.equal(true)
    })
  })
  describe('with an invalid workflow or subject', function () {
    it('should be false with an invalid workflow', function () {
      expect(isFeedbackActive(subject, false)).to.equal(false)
    })
    it('should be false with an invalid subject', function () {
      expect(isFeedbackActive(false, workflow)).to.equal(false)
    })
  })
  describe('with undefined arguments', function () {
    it('should be false', function () {
      expect(isFeedbackActive()).to.equal(false)
    })
    it('should be false with an undefined workflow', function () {
      expect(isFeedbackActive(subject, undefined)).to.equal(false)
    })
    it('should be false with an undefined subject', function () {
      expect(isFeedbackActive(undefined, workflow)).to.equal(false)
    })
  })
  describe('with null arguments', function () {
    it('should be false', function () {
      expect(isFeedbackActive(null, null, null)).to.equal(false)
    })
    it('should be false with a null workflow', function () {
      expect(isFeedbackActive(subject, null)).to.equal(false)
    })
    it('should be false with a null subject', function () {
      expect(isFeedbackActive(null, workflow)).to.equal(false)
    })
  })
})
