import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isFinite from 'lodash/isFinite'
import isUndefined from 'lodash/isUndefined'
import reduce from 'lodash/reduce'

// Checks a canonical rule for validity, and return an array of errors
// containing any missing properties. Used by the strategy `createRule`
// functions.
function validateRuleProperties (rule) {
  return reduce(rule, (errors, value, key) => {
    if (isFinite(value)) {
      return errors
    } else if (isBoolean(value)) {
      return errors
    } else if (isUndefined(value) || isEmpty(value)) {
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
