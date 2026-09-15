import ruleChecker from '../../../helpers/rule-checker'

function createRule (subjectRule, workflowRule) {
  const rule = {
    failureEnabled: workflowRule.failureEnabled || false,
    height: subjectRule.height,
    hideSubjectViewer: workflowRule.hideSubjectViewer || false,
    id: subjectRule.id,
    strategy: workflowRule.strategy,
    successEnabled: workflowRule.successEnabled || false,
    theta: subjectRule.theta || '0',
    tolerance: subjectRule.tolerance || workflowRule.defaultTolerance,
    width: subjectRule.width,
    x: subjectRule.x,
    y: subjectRule.y
  }

  if (rule.failureEnabled) {
    rule.failureMessage = subjectRule.failureMessage ||
      workflowRule.defaultFailureMessage
  }

  if (rule.successEnabled) {
    rule.successMessage = subjectRule.successMessage ||
      workflowRule.defaultSuccessMessage
  }

  return ruleChecker(rule)
}

export default createRule
