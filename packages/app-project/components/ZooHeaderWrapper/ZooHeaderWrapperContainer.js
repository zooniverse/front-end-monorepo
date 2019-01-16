import { ZooHeader } from '@zooniverse/react-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Url from 'url-parse'
import auth from 'panoptes-client/lib/auth'

@withRouter
@inject('store')
@observer
export default class ZooHeaderWrapperContainer extends Component {
  constructor () {
    super()
    this.openRegisterModal = this.openRegisterModal.bind(this)
    this.openSignInModal = this.openSignInModal.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  createUserProp () {
    const { isLoggedIn, display_name } = this.props.store.user
    return (isLoggedIn) ? { display_name } : {}
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
