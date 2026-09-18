import createRule from './create-rule'

describe('feedback geo radial create-rule', function () {
  const subjectRule = {
    id: 'dam-radial',
    x: '-91.0',
    y: '48.0'
  }

  const workflowRule = {
    defaultFailureMessage: 'Not quite, try again.',
    defaultSuccessMessage: 'Correct, that is the dam.',
    defaultTolerance: '2000',
    failureEnabled: true,
    hideSubjectViewer: true,
    id: 'dam-radial',
    strategy: 'geoRadial',
    successEnabled: true
  }

  it('should return a valid rule without custom subject-specifics', function () {
    expect(createRule(subjectRule, workflowRule)).to.deep.equal({
      failureEnabled: true,
      failureMessage: 'Not quite, try again.',
      hideSubjectViewer: true,
      id: 'dam-radial',
      strategy: 'geoRadial',
      successEnabled: true,
      successMessage: 'Correct, that is the dam.',
      tolerance: '2000',
      x: '-91.0',
      y: '48.0'
    })
  })

  it('should prefer subject-specific settings over workflow defaults', function () {
    const rule = createRule({
      ...subjectRule,
      failureMessage: 'Subject-specific failure message',
      successMessage: 'Subject-specific success message',
      tolerance: '500'
    }, workflowRule)

    expect(rule.tolerance).to.equal('500')
    expect(rule.failureMessage).to.equal('Subject-specific failure message')
    expect(rule.successMessage).to.equal('Subject-specific success message')
  })

  it('should reject a rule missing a coordinate', function () {
    const { y, ...withoutY } = subjectRule
    expect(createRule(withoutY, workflowRule)).to.deep.equal({})
  })
})
