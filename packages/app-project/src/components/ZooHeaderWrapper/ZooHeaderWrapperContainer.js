import { ZooHeader } from '@zooniverse/react-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { bool, func, shape, string } from 'prop-types'
import { Component } from 'react'
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
      ? { display_name: user.display_name, login: user.login }
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
    return auth.signOut()
      .then(() => {
        this.props.user.clear()
        // resetting the alreay seen subjects during the session tracking should move
        // once we refactor the UPP and User resource tracking in the classifier
        // Current implementation in classifier is possibly buggy (see discussion https://github.com/zooniverse/front-end-monorepo/discussions/2362)
        // likely a user id prop will be passed to the classifier and that will be reacted to with an effect hook
        /// which would reset the subject already seen tracking
        // I needed to guarantee that this happened on sign out only so that's why this is here for now
        const seenThisSession = (window) ? window.sessionStorage.getItem("subjectsSeenThisSession") : null

        if (seenThisSession) {
          window.sessionStorage.removeItem("subjectsSeenThisSession")
        }
      })
  }

  unreadNotifications () {
    const { user } = this.props
    
    return (user.isLoggedIn && user.personalization.notifications.count)
      ? user.personalization.notifications.count
      : 0
  }

  render () {
    return (
      <ZooHeader
        {...this.props}
        register={this.openRegisterModal}
        signIn={this.openSignInModal}
        signOut={this.signOut}
        unreadNotifications={this.unreadNotifications()}
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
    login: string,
    isLoggedIn: bool
  })
}

export default ZooHeaderWrapperContainer
