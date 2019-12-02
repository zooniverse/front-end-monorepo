import asyncStates from '@zooniverse/async-states'
import { expect } from 'chai'
import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

import Store from './Store'
import initStore from './initStore'
import placeholderEnv from './helpers/placeholderEnv'

const user = {
  display_name: 'Jean-Luc Picard',
  id: '1',
  login: 'zootester1'
}

describe('stores > User', function () {
  let rootStore = Store.create({}, placeholderEnv)
  let userStore = rootStore.user

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