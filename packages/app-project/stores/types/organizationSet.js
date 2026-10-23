import { observable } from 'mobx'
import { types } from 'mobx-state-tree'

import Organization from '../Organization'

const OrganizationSet = types.custom({
  name: 'OrganizationSet',
  fromSnapshot(snapshot = []) {
    const organizations = snapshot.map(organization => Organization.create(organization))
    return observable.set(organizations)
  },
  toSnapshot(value) {
    return Array.from(value, organization => organization.toJSON())
  },
  isTargetType(value) {
    return value instanceof Set
  },
  getValidationMessage(value) {
    return value instanceof Set ? '' : 'Value must be a Set'
  }
})

export default OrganizationSet
