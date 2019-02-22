import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Url from 'url-parse'

import AuthModals from './AuthModals'

@withRouter
@inject('store')
@observer
class AuthModalsContainer extends Component {
  constructor () {
    super()
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)
  }

  closeLoginModal () {
    const url = this.getUrlObject()
    this.removeUrlQuery(url, 'login')
    return this.redirect(url)
  }

  closeRegisterModal () {
    const url = this.getUrlObject()
    this.removeUrlQuery(url, 'register')
    return this.redirect(url)
  }

  getUrlObject () {
    const { asPath } = this.props.router
    return new Url(asPath, true)
  }

  redirect (urlObject) {
    const { pathname, push } = this.props.router
    const urlString = urlObject.toString().substr(urlObject.origin.length)
    push(pathname, urlString, { shallow: true })
  }

  removeUrlQuery (urlObject, propertyToRemove) {
    const query = Object.assign({}, urlObject.query)
    delete query[propertyToRemove]
    urlObject.set('query', query)
  }

  showLoginModal () {
    const { login } = this.getUrlObject().query
    return login === 'true'
  }

  showRegisterModal () {
    const { register } = this.getUrlObject().query
    return register === 'true'
  }

  render () {
    return (
      <AuthModals
        closeLoginModal={this.closeLoginModal}
        closeRegisterModal={this.closeRegisterModal}
        showLoginModal={this.showLoginModal()}
        showRegisterModal={this.showRegisterModal()}
      />
    )
  }
}

AuthModalsContainer.propTypes = {
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired
  })
}

export default AuthModalsContainer
