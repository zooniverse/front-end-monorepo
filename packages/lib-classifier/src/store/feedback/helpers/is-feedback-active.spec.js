import isFeedbackActive from './is-feedback-active'

describe('Feedback: isFeedbackActive', function () {
  const project = {
    experimental_tools: ['general feedback']
  }
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
  describe('with a valid project, workflow and subject', function () {
    it('should be true with a valid project, workflow and subject', function () {
      expect(isFeedbackActive(project, subject, workflow)).to.be.true()
    })
  })
  describe('with an invalid project, workflow or subject', function () {
    it('should be false with an invalid project', function () {
      expect(isFeedbackActive(false, subject, workflow)).to.be.false()
    })
    it('should be false with an invalid workflow', function () {
      expect(isFeedbackActive(project, subject, false)).to.be.false()
    })
    it('should be false with an invalid subject', function () {
      expect(isFeedbackActive(project, false, workflow)).to.be.false()
    })
  })
  describe('with undefined arguments', function () {
    it('should be false', function () {
      expect(isFeedbackActive()).to.be.false()
    })
    it('should be false with an undefined project', function () {
      expect(isFeedbackActive(undefined, subject, workflow)).to.be.false()
    })
    it('should be false with an undefined workflow', function () {
      expect(isFeedbackActive(project, subject, undefined)).to.be.false()
    })
    it('should be false with an undefined subject', function () {
      expect(isFeedbackActive(project, undefined, workflow)).to.be.false()
    })
  })
  describe('with null arguments', function () {
    it('should be false', function () {
      expect(isFeedbackActive(null, null, null)).to.be.false()
    })
    it('should be false with a null project', function () {
      expect(isFeedbackActive(null, subject, workflow)).to.be.false()
    })
    it('should be false with a null workflow', function () {
      expect(isFeedbackActive(project, subject, null)).to.be.false()
    })
    it('should be false with a null subject', function () {
      expect(isFeedbackActive(project, null, workflow)).to.be.false()
    })
  })
})
