import { ZooHeader } from '@zooniverse/react-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { bool, func, shape, string } from 'prop-types'
import React, { Component } from 'react'
import Url from 'url-parse'

function storeMapper (stores) {
  const { user } = stores.store
  return {
    user
  }
}
@withRouter
@inject(storeMapper)
@observer
class ZooHeaderWrapperContainer extends Component {
  constructor () {
    super()
    this.openRegisterModal = this.openRegisterModal.bind(this)
    this.openSignInModal = this.openSignInModal.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  createUserProp () {
    const { user } = this.props
    return (user.isLoggedIn)
      ? { 'display_name': user['display_name'] }
      : {}
  }

  getUrlObject () {
    const { asPath } = this.props.router
    return new Url(asPath, true)
  }

  addUrlQuery (urlObject, propertyToAdd) {
    const query = Object.assign({}, urlObject.query, {
      [propertyToAdd]: 'true'
    })
    urlObject.set('query', query)
  }

  redirect (urlObject) {
    const { pathname, push } = this.props.router
    const urlString = urlObject.toString().substr(urlObject.origin.length)
    push(pathname, urlString, { shallow: true })
  }

  openRegisterModal () {
    const url = this.getUrlObject()
    this.addUrlQuery(url, 'register')
    return this.redirect(url)
  }

  openSignInModal () {
    const url = this.getUrlObject()
    this.addUrlQuery(url, 'login')
    return this.redirect(url)
  }

  signOut () {
    auth.signOut()
      .then(() => this.props.store.user.clear())
  }

  render () {
    return (
      <ZooHeader
        register={this.openRegisterModal}
        signIn={this.openSignInModal}
        signOut={this.signOut}
        user={this.createUserProp()}
      />
    )
  }
}

ZooHeaderWrapperContainer.propTypes = {
  router: shape({
    asPath: string,
    pathname: string,
    push: func
  }),
  user: shape({
    clear: func,
    display_name: string,
    isLoggedIn: bool
  })
}

export default ZooHeaderWrapperContainer
