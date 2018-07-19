import React from 'react'
import { Provider } from 'mobx-react'

import { createOAuthClient } from '../../../src'

class App extends React.Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.auth = createOAuthClient({
      clientId: '535759b966935c297be11913acee7a9ca17c025f9f15520e7504728e71110a27',
      env: 'staging',
      redirectUri: 'http://localhost:3000'
    })
  }

  componentDidMount () {
    this.auth.completeLogin()
  }

  login () {
    this.auth.startLogin()
  }

  logout () {
    this.auth.logout()
  }

  render () {
    return (
      <div>
        <button onClick={this.login}>
          Login
        </button>
        <button onClick={this.logout}>
          Logout
        </button>
        <div>
          <pre>{JSON.stringify(this.auth.getToken(), undefined, 2)}</pre>
        </div>
      </div>
    )
  }

}

export default App
