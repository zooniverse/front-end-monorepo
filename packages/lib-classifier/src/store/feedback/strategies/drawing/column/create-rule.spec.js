import createRule from './create-rule'

describe('feedback drawing column create-rule', function () {
  const subjectRule = {
    id: '1234',
    width: '100',
    x: '300'
  }

  const workflowRule = {
    defaultFailureMessage: '=( Fail',
    defaultSuccessMessage: 'Success!',
    defaultTolerance: '10',
    failureEnabled: true,
    id: '1234',
    strategy: 'column',
    successEnabled: true
  }

  it('should return a valid rule without custom subject-specifics', function () {
    const rule = createRule(subjectRule, workflowRule)
    expect(rule).to.deep.equal({
      failureEnabled: true,
      failureMessage: '=( Fail',
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'column',
      successEnabled: true,
      successMessage: 'Success!',
      tolerance: '10',
      width: '100',
      x: '300'
    })
  })

  it('should return a valid rule with subject-specific settings', function () {
    subjectRule.tolerance = '50'
    subjectRule.failureMessage = 'Subject-specific failure message'
    subjectRule.successMessage = 'Subject-specific success message'

    const rule = createRule(subjectRule, workflowRule)
    expect(rule).to.deep.equal({
      failureEnabled: true,
      failureMessage: 'Subject-specific failure message',
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'column',
      successEnabled: true,
      successMessage: 'Subject-specific success message',
      tolerance: '50',
      width: '100',
      x: '300'
    })
  })
})
