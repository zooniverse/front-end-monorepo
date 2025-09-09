import createRule from './create-rule'

describe('feedback drawing graph2drange create-rule', function () {
  const subjectRule = {
    id: '1234',
    width: '2',
    x: '15'
  }

  const workflowRule = {
    defaultFailureMessage: '=( Fail',
    defaultSuccessMessage: 'Success!',
    defaultTolerance: '1',
    failureEnabled: true,
    id: '1234',
    strategy: 'graph2drange',
    successEnabled: true
  }

  it('should return a valid rule without custom subject-specifics', function () {
    const rule = createRule(subjectRule, workflowRule)
    expect(rule).to.deep.equal({
      failureEnabled: true,
      failureMessage: '=( Fail',
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'graph2drange',
      successEnabled: true,
      successMessage: 'Success!',
      tolerance: '1',
      width: '2',
      x: '15'
    })
  })

  it('should return a valid rule with subject-specific settings', function () {
    subjectRule.tolerance = '5'
    subjectRule.failureMessage = 'Subject-specific failure message'
    subjectRule.successMessage = 'Subject-specific success message'

    const rule = createRule(subjectRule, workflowRule)
    expect(rule).to.deep.equal({
      failureEnabled: true,
      failureMessage: 'Subject-specific failure message',
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'graph2drange',
      successEnabled: true,
      successMessage: 'Subject-specific success message',
      tolerance: '5',
      width: '2',
      x: '15'
    })
  })
})
