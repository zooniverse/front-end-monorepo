import createRule from './create-rule'

describe('feedback geo box create-rule', function () {
  const subjectRule = {
    height: '2000',
    id: 'dam-box',
    width: '3000',
    x: '-91.0',
    y: '48.0'
  }

  const workflowRule = {
    defaultFailureMessage: 'Outside the survey box, try again.',
    defaultSuccessMessage: 'Correct, that is inside the survey box.',
    defaultTolerance: '250',
    failureEnabled: true,
    hideSubjectViewer: true,
    id: 'dam-box',
    strategy: 'geoBox',
    successEnabled: true
  }

  it('should return a valid rule without custom subject-specifics', function () {
    expect(createRule(subjectRule, workflowRule)).to.deep.equal({
      failureEnabled: true,
      failureMessage: 'Outside the survey box, try again.',
      height: '2000',
      hideSubjectViewer: true,
      id: 'dam-box',
      strategy: 'geoBox',
      successEnabled: true,
      successMessage: 'Correct, that is inside the survey box.',
      theta: '0',
      tolerance: '250',
      width: '3000',
      x: '-91.0',
      y: '48.0'
    })
  })

  it('should prefer subject-specific settings over workflow defaults', function () {
    const rule = createRule({
      ...subjectRule,
      failureMessage: 'Subject-specific failure message',
      successMessage: 'Subject-specific success message',
      theta: '30',
      tolerance: '500'
    }, workflowRule)

    expect(rule.theta).to.equal('30')
    expect(rule.tolerance).to.equal('500')
    expect(rule.failureMessage).to.equal('Subject-specific failure message')
    expect(rule.successMessage).to.equal('Subject-specific success message')
  })

  it('should default theta to 0', function () {
    expect(createRule(subjectRule, workflowRule).theta).to.equal('0')
  })

  it('should reject a rule missing a dimension', function () {
    const { width, ...withoutWidth } = subjectRule
    expect(createRule(withoutWidth, workflowRule)).to.deep.equal({})
  })
})
