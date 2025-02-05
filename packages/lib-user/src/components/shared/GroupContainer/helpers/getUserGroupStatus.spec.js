import { render, screen } from '@testing-library/react'

import { getUserGroupStatus } from './getUserGroupStatus'

describe('components > shared > GroupContainer > getUserGroupStatus', function () {
  it('should return a message to log in if there is a join token and no auth user', function () {
    const result = getUserGroupStatus({ joinToken: 'token' })
    expect(result).to.equal('GroupContainer.loginToJoin')
  })

  it('should return a message when joining a group', function () {
    const result = getUserGroupStatus({ createGroupMembershipLoading: true })
    expect(result).to.equal('GroupContainer.joining')
  })

  it('should return a message when joining a group fails', function () {
    const result = getUserGroupStatus({ createGroupMembershipError: { message: 'error message' } })
    expect(result).to.equal('GroupContainer.joinFail')
  })

  it('should return a message when loading the group', function () {
    render(<div>{getUserGroupStatus({ groupLoading: true })}</div>)
    const result = screen.getByLabelText('Loading')

    expect(result).to.be.ok()
  })

  it('should return a message when there is a group error', function () {
    const result = getUserGroupStatus({ groupError: { message: 'error message' } })
    expect(result).to.equal('error message')
  })

  it('should return a message when there is no group and no auth user', function () {
    const result = getUserGroupStatus({})
    expect(result).to.equal('GroupContainer.noAuth')
  })

  it('should return a message when there is no group and there is an auth user', function () {
    const result = getUserGroupStatus({ authUserId: '1' })
    expect(result).to.equal('GroupContainer.notFound')
  })

  it('should return null when there is a group and an auth user', function () {
    const result = getUserGroupStatus({ authUserId: '1', group: { id: '1' } })
    expect(result).to.be.null()
  })
})
