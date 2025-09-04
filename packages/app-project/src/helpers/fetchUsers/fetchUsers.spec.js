import nock from 'nock'

import fetchUsers from './fetchUsers.js'

describe('Helpers > fetchUsers', function () {
  const usersPage1 = {
    users: [{
      id: '1',
      login: 'zootester1'
    }, {
      id: '2',
      login: 'zootester2'
    }],
    meta: {
      users: {
        next_page: 2
      }
    }
  }

  const usersPage2 = {
    users: [{
      id: '3',
      login: 'zootester3'
    }],
    meta: {}
  }

  before(function () {
    nock('https://panoptes-staging.zooniverse.org/api')
      .get('/users')
      .query(query => query.page === '1' && query.id === '1,2,3')
      .reply(200, usersPage1)
      .get('/users')
      .query(query => query.page === '2' && query.id === '1,2,3')
      .reply(200, usersPage2)
  })

  after(function () {
    nock.cleanAll()
  })

  it('should return a list of users', async function () {
    const query = { id: '1,2,3' }
    const users = await fetchUsers(query)
    expect(users).to.be.an('array')
    expect(users).to.have.lengthOf(3)
    expect(users[0].login).to.equal('zootester1')
    expect(users[1].login).to.equal('zootester2')
    expect(users[2].login).to.equal('zootester3')
  })
})
