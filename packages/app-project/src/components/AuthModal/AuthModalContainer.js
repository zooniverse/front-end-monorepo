import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { func, shape, string } from 'prop-types'
import React, { Component } from 'react'
import Url from 'url-parse'

import AuthModal from './AuthModal'

class AuthModalContainer extends Component {
  constructor () {
    super()
    this.closeModal = this.closeModal.bind(this)
    this.onActive = this.onActive.bind(this)
  }

  onActive (activeIndex) {
    const url = this.getUrlObject()

    if (activeIndex === 0) {
      this.addUrlQuery(url, 'login')
      this.removeUrlQuery(url, 'register')
    } else if (activeIndex === 1) {
      this.addUrlQuery(url, 'register')
      this.removeUrlQuery(url, 'login')
    }

    this.redirect(url)
  }

  closeModal () {
    const url = this.getUrlObject()
    this.removeUrlQuery(url, 'login')
    this.removeUrlQuery(url, 'register')
    return this.redirect(url)
  }

  getActiveIndexFromUrl () {
    const { query } = this.getUrlObject()
    const params = {
      login: query.login === 'true',
      register: query.register === 'true'
    }

    let activeIndex = -1

    if (params.login) {
      activeIndex = 0
    } else if (params.register) {
      activeIndex = 1
    }

    return activeIndex
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

  addUrlQuery (urlObject, paramToAdd) {
    urlObject.set('query', { [paramToAdd]: true, ...urlObject.query })
  }

  removeUrlQuery (urlObject, paramToRemove) {
    const query = { ...urlObject.query }
    delete query[paramToRemove]
    urlObject.set('query', query)
  }

  render () {
    const activeIndex = this.getActiveIndexFromUrl()
    return (
      <AuthModal
        activeIndex={activeIndex}
        closeModal={this.closeModal}
        onActive={this.onActive}
      />
    )
  }
}

AuthModalContainer.propTypes = {
  router: shape({
    asPath: string.isRequired,
    pathname: string.isRequired,
    push: func.isRequired
  }).isRequired
}

@inject('store')
@withRouter
@observer
class DecoratedAuthModalContainer extends AuthModalContainer { }

export default DecoratedAuthModalContainer
export { AuthModalContainer }
