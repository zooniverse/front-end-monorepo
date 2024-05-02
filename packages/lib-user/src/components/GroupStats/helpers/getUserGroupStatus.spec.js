import { getUserGroupStatus } from './getUserGroupStatus'

describe('components > GroupStats > getStatus', function () {
  it('should return a message to log in if there is a join token and no auth user', function () {
    const result = getUserGroupStatus({ joinToken: 'token' })
    expect(result).to.equal('Log in to join the group.')
  })

  it('should return a message when joining a group', function () {
    const result = getUserGroupStatus({ joinStatus: 'posting' })
    expect(result).to.equal('Joining group...')
  })

  it('should return a message when joining a group fails', function () {
    const result = getUserGroupStatus({ joinStatus: 'error' })
    expect(result).to.equal('Join failed.')
  })

  it('should return a message when loading the group', function () {
    const result = getUserGroupStatus({ groupLoading: true })
    expect(result).to.equal('Loading...')
  })

  it('should return a message when there is a group error', function () {
    const result = getUserGroupStatus({ groupError: { message: 'error message' } })
    expect(result).to.equal('Error: error message.')
  })

  it('should return a message when there is no group and no auth user', function () {
    const result = getUserGroupStatus({})
    expect(result).to.equal('Group not found. You must be logged in to access a private group.')
  })

  it('should return a message when there is no group and there is an auth user', function () {
    const result = getUserGroupStatus({ authUser: { id: '1', login: 'login' } })
    expect(result).to.equal('Group not found.')
  })

  it('should return null when there is a group and an auth user', function () {
    const result = getUserGroupStatus({ authUser: { id: '1', login: 'login' }, group: { id: '1' } })
    expect(result).to.be.null()
  })
})
