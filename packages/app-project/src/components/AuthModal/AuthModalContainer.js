import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { func, shape, string } from 'prop-types'
import { Component } from 'react'

import AuthModal from './AuthModal'

class AuthModalContainer extends Component {
  constructor() {
    super()
    this.closeModal = this.closeModal.bind(this)
    this.onActive = this.onActive.bind(this)
  }

  onActive(activeIndex) {
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

  closeModal() {
    const url = this.getUrlObject()
    this.removeUrlQuery(url, 'login')
    this.removeUrlQuery(url, 'register')
    return this.redirect(url)
  }

  getActiveIndexFromUrl() {
    const url = this.getUrlObject()

    let activeIndex = -1

    if (url.searchParams?.has('login')) {
      activeIndex = 0
    } else if (url.searchParams?.has('register')) {
      activeIndex = 1
    }

    return activeIndex
  }

  getUrlObject() {
    const isBrowser = typeof window !== 'undefined'
    if (isBrowser) {
      return new URL(window.location)
    }
    return ''
  }

  redirect(urlObject) {
    const { push } = this.props.router
    push(urlObject, urlObject, { shallow: true })
  }

  addUrlQuery(urlObject, paramToAdd) {
    urlObject.searchParams.set(paramToAdd, true)
  }

  removeUrlQuery(urlObject, paramToRemove) {
    urlObject.searchParams.delete(paramToRemove)
  }

  render() {
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

const DecoratedAuthModalContainer = inject('store')(withRouter(observer(AuthModalContainer)))

export default DecoratedAuthModalContainer
export { AuthModalContainer }
