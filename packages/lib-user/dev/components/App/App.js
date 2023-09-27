import oauth from 'panoptes-client/lib/oauth'
import { Component } from 'react'

import { GroupStats, UserStats } from '../../../src/index.js'

// TODO: refactor App as functional component?

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loading: false,
      userAuth: null
    }
  }

  componentDidMount () {
    this.initAuthorization()
  }

  initAuthorization () {
    this.setState({ loading: true })

    // TODO: create new oauth staging app
    return oauth.init('7532a403edf16f31fb2a210b8a49f59553d45064e6c292679c3eac53631d73d1')
      .then((userAuth) => {
        this.setState({ loading: false, userAuth })
        history.replaceState(null, document.title, location.pathname + location.search)
      })
  }

  async getBearerToken () {
    const token = await oauth.checkBearerToken()
    if (token) {
      return `Bearer ${token.access_token}`
    }

    return ''
  }

  login () {
    oauth.signIn(window.location.origin)
  }

  logout () {
    oauth.signOut()
      .then(userAuth => {
        this.setState({ userAuth })
      })
  }

  render () {
    const { groups, users } = this.props
    const { userAuth } = this.state

    let content = (
      <div>
        <h2>Key Components - urls (zooniverse.org/...)</h2>
        <ul>
          <li>homepage</li>
          <li>
            profile page (public) - users/[login]
            <ul>
              <li>
                <a href="./?users=[login]/stats">user stats page (private) - users/[login]/stats</a>
                <ul>
                  <li>certificate - users/[login]/stats/certificate</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="./?groups=[user_group_id]">group stats page - groups/[id]</a>
          </li>
            <ul>
              <li>contributors - groups/[id]/contributors</li>
            </ul>
        </ul>
      </div>
    )

    if (groups) {
      const subpaths = groups.split('/')
    
      if (subpaths[0] === '[user_group_id]') {
        content = <p>In the url query param <code>?groups=</code>, please replace <code>[user_group_id]</code> with a user group id.</p>
      } else if (subpaths[1] === 'contributors') {
        content = <p>Group contributors component goes here.</p>
      } else {
        content = <GroupStats />
      }
    }
  
    if (users) {
      const subpaths = users.split('/')

      if (subpaths[0] === '[login]') {
        content = <p>In the url query param <code>?users=</code>, please replace <code>[login]</code> with a user login.</p>
      } else if (subpaths[1] === 'stats') {
        content = (
          <UserStats
            authClient={oauth}
            login={subpaths[0]}
          />
        )
      }
    }
  
    return (
      <main>
        <header>
          <h1><a href="./">lib-user</a></h1>
          {userAuth ? (
            <button onClick={this.logout.bind(this)}>
              Logout
            </button>
          ) : (
            <button onClick={this.login.bind(this)}>
              Login
            </button>
          )}
        </header>
        <div>
          {content}
        </div>
      </main>
    )
  }
}

export default App

// Other key users components - urls (zooniverse.org/...):
// <li>favorites (public) - users/[login]/favorites</li>
// <li>collections (public) - users/[login]/collections</li>
// <li>comments (public) - users/[login]/comments</li>
// <li>groups (private) - users/[login]/groups</li>
// <li>projects (private) - users/[login]/projects</li>
