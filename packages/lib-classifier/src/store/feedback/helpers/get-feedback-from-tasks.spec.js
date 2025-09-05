import getFeedbackFromTasks from './get-feedback-from-tasks'

describe('Feedback: getFeedbackFromTasks', function () {
  const tasks = {
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
    },
    T1: {
      feedback: {
        enabled: false,
        rules: [{
          id: '52',
          strategy: 'singleAnswerQuestion',
          failureEnabled: true,
          successEnabled: true,
          defaultFailureMessage: '"Actually, that\'s not correct"',
          defaultSuccessMessage: '"Correct"'
        }]
      }
    }
  }
  it('should include tasks with feedback enabled', function () {
    expect(getFeedbackFromTasks(tasks)).to.have.property('T0')
  })
  it('should ignore tasks with feedback disabled', function () {
    expect(getFeedbackFromTasks(tasks)).not.to.have.property('T1')
  })
  it('should copy rules from tasks with feedback enabled', function () {
    expect(getFeedbackFromTasks(tasks).T0).to.deep.equal(tasks.T0.feedback.rules)
  })
})
