import _ from 'lodash'

// Checks a canonical rule for validity, and return an array of errors
// containing any missing properties. Used by the strategy `createRule`
// functions.
function validateRuleProperties (rule) {
  return _.reduce(rule, (errors, value, key) => {
    if (_.isFinite(value)) {
      return errors
    } else if (_.isBoolean(value)) {
      return errors
    } else if (_.isUndefined(value) || _.isEmpty(value)) {
      return errors.concat([key])
    } else {
      return errors
    }
  }, [])
}

function ruleChecker (rule) {
  const ruleErrors = validateRuleProperties(rule)

  if (ruleErrors.length === 0) {
    return rule
  } else {
    const errors = ruleErrors.join(', ')
    console.error('Undefined property %s in rule %s, skipping...', errors, rule.id)
    return {}
  }
}

export default ruleChecker
