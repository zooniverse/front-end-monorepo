import getFilteredChoiceIds from './getFilteredChoiceIds'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'

describe('Function > getFilteredChoiceIds', function () {
  it('should be a function', function () {
    expect(getFilteredChoiceIds).to.be.a('function')
  })

  it('should return all choices without filters', function () {
    const filteredChoiceIds = getFilteredChoiceIds({}, mockTask)
    expect(filteredChoiceIds).to.have.lengthOf(mockTask.choicesOrder.length)
  })

  it('should return expected filtered choices with filters', function () {
    const filters = {
      HRNS: 'SPRL',
      LK: 'NTLPDR'
    }
    const filteredChoiceIds = getFilteredChoiceIds(filters, mockTask)
    expect(filteredChoiceIds).to.have.lengthOf(4)
  })

  it('should return an empty array if no choices apply to filters', function () {
    const filters = {
      HRNS: 'SPRL',
      LK: 'NTLPDR',
      TL: 'SMTH'
    }
    const filteredChoiceIds = getFilteredChoiceIds(filters, mockTask)
    expect(filteredChoiceIds).to.have.lengthOf(0)
  })
})
