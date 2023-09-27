import oauth from 'panoptes-client/lib/oauth'
import { Component } from 'react'

import { GroupStats, UserStats } from '../../../src/index.js'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loading: false,
      user: null
    }
  }

  componentDidMount () {
    this.initAuthorization()
  }

  initAuthorization () {
    this.setState({ loading: true })

    // TODO: create new oauth staging app
    return oauth.init('7532a403edf16f31fb2a210b8a49f59553d45064e6c292679c3eac53631d73d1')
      .then((user) => {
        this.setState({ loading: false, user })
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
      .then(user => {
        this.setState({ user })
      })
  }

  render () {
    const { groups, users } = this.props

    if (groups) {
      return (
        <div>
          <h1>lib-user</h1>
          <GroupStats />
        </div>
      )
    }
  
    if (users) {
      return (
        <div>
          <h1>lib-user</h1>
          {this.state.user ? (
            <button onClick={this.logout.bind(this)}>
              Logout
            </button>
          ) : (
            <button onClick={this.login.bind(this)}>
              Login
            </button>
          )}
          <UserStats />
        </div>
      )
    }
  
    return (
      <div>
        <h1>lib-user</h1>
        <ul>
          <li>
            <a href="./?users=stats">user stats</a>
          </li>
          <li>
            <a href="./?groups=1234">group stats</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default App
