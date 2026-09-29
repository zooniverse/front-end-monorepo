import generateRules from './generate-rules'

describe('feedback: generateRules', function () {
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
  function mockTaskWithRule (ruleID) {
    return {
      feedback: {
        enabled: true,
        rules: [{
          id: ruleID,
          strategy: 'singleAnswerQuestion',
          failureEnabled: true,
          successEnabled: true,
          defaultFailureMessage: '"Actually, that\'s not correct"',
          defaultSuccessMessage: '"Correct"'
        }]
      }
    }
  }
  function testSubjectAndWorkflow (subject, workflow) {
    it('should generate rules for tasks with feedback enabled', function () {
      expect(generateRules(subject, workflow)).to.have.property('T0')
    })

    it('should not generate rules for tasks with feedback disabled', function () {
      expect(generateRules(subject, workflow)).not.to.have.property('T1')
    })

    it('should copy subject rules', function () {
      const taskFeedbackRule = generateRules(subject, workflow).T0[0]
      expect(taskFeedbackRule).to.have.property('failureMessage')
      expect(taskFeedbackRule.failureMessage).to.equal('Actually, this sound is from noise (background)')
    })
  }

  describe('without feedback defined', function () {
    const subject = {}
    const workflow = {}
    it('should return an empty object', function () {
      expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
    })
  })

  describe('without a valid subject or workflow', function () {
    const subject = mockSubjectWithRule('51')
    const workflow = {
      tasks: {
        T0: mockTaskWithRule('51'),
        T1: mockTaskWithRule('52')
      }
    }

    it('should return an empty object for an invalid subject', function () {
      expect(Object.keys(generateRules(false, workflow)).length).to.equal(0)
    })

    it('should return an empty object for an undefined subject', function () {
      expect(Object.keys(generateRules(undefined, workflow)).length).to.equal(0)
    })

    it('should return an empty object for a null subject', function () {
      expect(Object.keys(generateRules(null, workflow)).length).to.equal(0)
    })

    it('should return an empty object for an invalid workflow', function () {
      expect(Object.keys(generateRules(subject, false)).length).to.equal(0)
    })

    it('should return an empty object for an undefined workflow', function () {
      expect(Object.keys(generateRules(subject, undefined)).length).to.equal(0)
    })

    it('should return an empty object for a null workflow', function () {
      expect(Object.keys(generateRules(subject, null)).length).to.equal(0)
    })
  })

  describe('with task feedback enabled', function () {
    const subject = mockSubjectWithRule('51')
    const workflow = {
      tasks: {
        T0: mockTaskWithRule('51'),
        T1: mockTaskWithRule('52')
      }
    }
    testSubjectAndWorkflow(subject, workflow)
  })

  describe('with a numeric rule ID', function () {
    const subject = mockSubjectWithRule(51)
    const workflow = {
      tasks: {
        T0: mockTaskWithRule(51),
        T1: mockTaskWithRule('52')
      }
    }
    testSubjectAndWorkflow(subject, workflow)
  })

  describe('with an alphanumeric rule ID', function () {
    const subject = mockSubjectWithRule('feedback rule')
    const workflow = {
      tasks: {
        T0: mockTaskWithRule('feedback rule'),
        T1: mockTaskWithRule('52')
      }
    }
    testSubjectAndWorkflow(subject, workflow)
  })

  describe('when the rule id is 0', function () {
    const subject = mockSubjectWithRule(0)
    const workflow = {
      tasks: {
        T0: mockTaskWithRule(0),
        T1: mockTaskWithRule('52')
      }
    }
    testSubjectAndWorkflow(subject, workflow)
  })

  describe('with a null or undefined rule id', function () {
    it('should return an empty object when null', function () {
      const subject = mockSubjectWithRule(null)
      const workflow = {
        tasks: {
          T0: mockTaskWithRule(null)
        }
      }

      expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
    })

    it('should return an empty object when undefined', function () {
      const subject = mockSubjectWithRule(undefined)
      const workflow = {
        tasks: {
          T0: mockTaskWithRule(undefined)
        }
      }

      expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
    })
  })

  describe('with no matching rules', function () {
    describe('when the workflow rule ID is truthy', function () {
      const workflow = {
        tasks: {
          T0: mockTaskWithRule('1')
        }
      }

      it('should return an empty object for a falsy subject rule ID', function () {
        const subject = mockSubjectWithRule(null)
        expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
      })

      it('should return an empty object for a truthy subject rule ID', function () {
        const subject = mockSubjectWithRule('0')
        expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
      })
    })

    describe('when the workflow rule ID is null or undefined', function () {
      const workflow = {
        tasks: {
          T0: mockTaskWithRule(null)
        }
      }

      it('should return an empty object for a numeric subject rule ID', function () {
        const subject = mockSubjectWithRule(1)
        expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
      })

      it('should return an empty object for a string subject rule ID', function () {
        const subject = mockSubjectWithRule('1')
        expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
      })
    })

    describe('when the workflow rule names an unknown strategy', function () {
      const workflow = {
        tasks: {
          T0: {
            feedback: {
              enabled: true,
              rules: [{
                id: '51',
                strategy: 'notARegisteredStrategy',
                failureEnabled: true,
                successEnabled: true
              }]
            }
          }
        }
      }

      it('should skip the rule instead of throwing', function () {
        const subject = mockSubjectWithRule('51')
        expect(Object.keys(generateRules(subject, workflow)).length).to.equal(0)
      })
    })
  })

  // A workflow rule describes one kind of target; a subject says how many of them
  // it holds and where. A subject that names several is answered with one rule each.
  describe('with several subject rules sharing a workflow rule id', function () {
    const workflow = { tasks: { T0: mockTaskWithRule('51') } }
    const subject = {
      metadata: {
        '#feedback_1_id': '51',
        '#feedback_1_answer': '0',
        '#feedback_2_id': '51',
        '#feedback_2_answer': '1',
        '#feedback_3_id': '51',
        '#feedback_3_answer': '2'
      }
    }

    it('should generate a rule for every matching subject rule', function () {
      expect(generateRules(subject, workflow).T0).to.have.lengthOf(3)
    })

    it('should keep each subject rule its own values', function () {
      const answers = generateRules(subject, workflow).T0.map(rule => rule.answer)
      expect(answers).to.deep.equal(['0', '1', '2'])
    })

    it('should give every rule the workflow rule\'s strategy and messages', function () {
      generateRules(subject, workflow).T0.forEach(rule => {
        expect(rule.strategy).to.equal('singleAnswerQuestion')
        expect(rule.successMessage).to.equal('"Correct"')
      })
    })
  })
})
