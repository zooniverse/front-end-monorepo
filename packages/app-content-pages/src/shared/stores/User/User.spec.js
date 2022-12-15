import { expect } from 'chai'
import nock from 'nock'

import Store from '../Store'

const user = {
  display_name: 'Jean-Luc Picard',
  id: '1',
  login: 'zootester1'
}

describe('stores > User', function () {
  let rootStore = Store.create()
  let userStore = rootStore.user

  before(function () {
    nock('https://talk-staging.zooniverse.org')
      .persist()
      .get('/conversations')
      .query(true)
      .reply(200)

    nock('https://talk-staging.zooniverse.org')
      .persist()
      .get('/notifications')
      .query(true)
      .reply(200)    
  })

  after(function () {
    nock.cleanAll()
  })

  it('should exist', function () {
    expect(userStore).to.be.ok()
  })

  it('should set the user', function () {
    expect(userStore.id).to.be.null()
    expect(userStore.login).to.be.null()
    expect(userStore.display_name).to.be.null()

    userStore.set(user)

    expect(userStore.id).to.equal(user.id)
    expect(userStore.login).to.equal(user.login)
    expect(userStore.display_name).to.equal(user.display_name)
  })

  it('should clear the user', function () {
    expect(userStore.id).to.equal(user.id)
    expect(userStore.login).to.equal(user.login)
    expect(userStore.display_name).to.equal(user.display_name)

    userStore.clear()

    expect(userStore.id).to.be.null()
    expect(userStore.login).to.be.null()
    expect(userStore.display_name).to.be.null()
  })
})
