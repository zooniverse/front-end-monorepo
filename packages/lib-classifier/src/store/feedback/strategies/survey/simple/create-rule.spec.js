import createRule from './create-rule'

describe('Feedback > Survey > Simple > Rule Creator', function () {
  it('should create a rule with `failureEnabled` and `successEnabled` defaulting to false', function () {
    const subjectRule = { choiceIds: 'AARDVARK,HONEYBADGER', id: '1' }
    const workflowRule = { strategy: '2' }
    const rule = createRule(subjectRule, workflowRule)
    expect(rule.failureEnabled).to.be.false()
    expect(rule.successEnabled).to.be.false()
  })

  it('should create a rule with the right properties derived from the workflow', function () {
    const subjectRule = { choiceIds: 'AARDVARK,HONEYBADGER', id: '1' }
    const workflowRule = {
      failureEnabled: true,
      defaultFailureMessage: 'failure',
      defaultSuccessMessage: 'success',
      strategy: '2',
      successEnabled: true
    }
    const rule = createRule(subjectRule, workflowRule)
    expect(rule.failureEnabled).to.equal(workflowRule.failureEnabled)
    expect(rule.failureMessage).to.equal(workflowRule.defaultFailureMessage)
    expect(rule.strategy).to.equal(workflowRule.strategy)
    expect(rule.successEnabled).to.equal(workflowRule.successEnabled)
    expect(rule.successMessage).to.equal(workflowRule.defaultSuccessMessage)
  })

  it('should create a rule with the right properties derived from the subject metadata', function () {
    const subjectRule = { choiceIds: 'AARDVARK,HONEYBADGER', id: '1' }
    const workflowRule = { strategy: '2' }
    const rule = createRule(subjectRule, workflowRule)
    expect(rule.answer).to.equal(subjectRule.answer)
    expect(rule.id).to.equal(subjectRule.id)
  })

  it('should use the success and failure messages from the subject if available', function () {
    const subjectRule = {
      choiceIds: 'AARDVARK,HONEYBADGER',
      failureMessage: 'failure on subject',
      id: '1',
      successMessage: 'success on subject'
    }

    const workflowRule = {
      failureEnabled: true,
      defaultFailureMessage: 'failure',
      defaultSuccessMessage: 'success',
      strategy: '2',
      successEnabled: true
    }
    const rule = createRule(subjectRule, workflowRule)
    expect(rule.failureMessage).to.equal(subjectRule.failureMessage)
    expect(rule.successMessage).to.equal(subjectRule.successMessage)
  })

  describe('behaviour when a required property is missing', function () {
    const BASE_SUBJECT_RULE = { choiceIds: 'AARDVARK,HONEYBADGER', id: '1' }
    const BASE_WORKFLOW_RULE = {
      failureEnabled: true,
      defaultFailureMessage: 'failure',
      defaultSuccessMessage: 'success',
      strategy: '2',
      successEnabled: true
    }

    it('should return an empty object if `choiceIds` is missing', function () {
      const subjectRule = Object.assign({}, BASE_SUBJECT_RULE)
      const workflowRule = Object.assign({}, BASE_WORKFLOW_RULE)
      delete subjectRule.choiceIds
      const rule = createRule(subjectRule, workflowRule)
      expect(rule).to.deep.equal({})
    })

    it('should return an empty object if `id` is missing', function () {
      const subjectRule = Object.assign({}, BASE_SUBJECT_RULE)
      const workflowRule = Object.assign({}, BASE_WORKFLOW_RULE)
      delete subjectRule.id
      const rule = createRule(subjectRule, workflowRule)
      expect(rule).to.deep.equal({})
    })

    it('should return an empty object if `strategy` is missing', function () {
      const subjectRule = Object.assign({}, BASE_SUBJECT_RULE)
      const workflowRule = Object.assign({}, BASE_WORKFLOW_RULE)
      delete workflowRule.strategy
      const rule = createRule(subjectRule, workflowRule)
      expect(rule).to.deep.equal({})
    })

    it('should return an empty object if failure is enabled and `failureMessage` is missing', function () {
      const subjectRule = Object.assign({}, BASE_SUBJECT_RULE)
      const workflowRule = Object.assign({}, BASE_WORKFLOW_RULE)
      delete workflowRule.defaultFailureMessage
      const rule = createRule(subjectRule, workflowRule)
      expect(rule).to.deep.equal({})
    })

    it('should return an empty object if success is enabled and `successMessage` is missing', function () {
      const subjectRule = Object.assign({}, BASE_SUBJECT_RULE)
      const workflowRule = Object.assign({}, BASE_WORKFLOW_RULE)
      delete workflowRule.defaultSuccessMessage
      const rule = createRule(subjectRule, workflowRule)
      expect(rule).to.deep.equal({})
    })
  })
})
