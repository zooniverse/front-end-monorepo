import ruleChecker from '../../../helpers/rule-checker'

function createRule (subjectRule, workflowRule) {
  const rule = {
    failureEnabled: workflowRule.failureEnabled || false,
    hideSubjectViewer: workflowRule.hideSubjectViewer || false,
    id: subjectRule.id,
    strategy: workflowRule.strategy,
    successEnabled: workflowRule.successEnabled || false,
    tolerance: subjectRule.tolerance || workflowRule.defaultTolerance,
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
