import ruleChecker from '../../helpers/rule-checker'

// One createRule for every geo strategy; the strategy only names its target fields.
function createGeoRule (targetFields) {
  return function createRule (subjectRule, workflowRule) {
    const rule = {
      ...targetFields(subjectRule),
      failureEnabled: workflowRule.failureEnabled || false,
      hideSubjectViewer: workflowRule.hideSubjectViewer || false,
      id: subjectRule.id,
      strategy: workflowRule.strategy,
      successEnabled: workflowRule.successEnabled || false,
      tolerance: subjectRule.tolerance || workflowRule.defaultTolerance
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
}

export default createGeoRule
