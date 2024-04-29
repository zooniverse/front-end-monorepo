import { getStatus } from './getStatus'

describe('components > GroupStats > getStatus', function () {
  it('should return a message to log in if there is a join token and no auth user', function () {
    const result = getStatus({ joinToken: 'token' })
    expect(result).to.equal('Log in to join the group.')
  })

  it('should return a message when joining a group', function () {
    const result = getStatus({ joinStatus: 'posting' })
    expect(result).to.equal('Joining group...')
  })

  it('should return a message when joining a group fails', function () {
    const result = getStatus({ joinStatus: 'error' })
    expect(result).to.equal('Join failed.')
  })

  it('should return a message when loading the group', function () {
    const result = getStatus({ groupLoading: true })
    expect(result).to.equal('Loading...')
  })

  it('should return a message when there is a group error', function () {
    const result = getStatus({ groupError: { message: 'error message' } })
    expect(result).to.equal('Error: error message.')
  })

  it('should return a message when there is no group and no auth user', function () {
    const result = getStatus({})
    expect(result).to.equal('Group not found. You must be logged in to access a private group.')
  })

  it('should return a message when there is no group and there is an auth user', function () {
    const result = getStatus({ authUser: { id: '1', login: 'login' } })
    expect(result).to.equal('Group not found.')
  })

  it('should return null when there is a group and an auth user', function () {
    const result = getStatus({ authUser: { id: '1', login: 'login' }, group: { id: '1' } })
    expect(result).to.be.null()
  })
})
