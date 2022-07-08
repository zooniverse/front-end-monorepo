import { types } from 'mobx-state-tree'

export default types.custom({
  name: 'FixedNumber',
  fromSnapshot(snapshot) {
    const roundedString = parseFloat(snapshot).toFixed(2)
    return parseFloat(roundedString)
  },
  toSnapshot(value) {
    const roundedString = parseFloat(value).toFixed(2)
    return parseFloat(roundedString)
  },
  isTargetType(value) {
    const roundedValue = parseFloat(value).toFixed(2)
    return value === parseFloat(roundedValue)
  },
  getValidationMessage(snapshot) {
    const value = parseFloat(snapshot)
    return isNaN(value) ? `${snapshot} is not a number` : ''
  }
})
