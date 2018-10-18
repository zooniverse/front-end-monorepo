import { Button, Grommet, Box } from 'grommet'
import queryString from 'query-string'
import React from 'react'

import { createOAuthClient } from '../../../src'

class App extends React.Component {
  constructor () {
    super()
    this.auth = createOAuthClient({
      clientId: '24ad5676d5d25c6aa850dc5d5f63ec8c03dbc7ae113b6442b8571fce6c5b974c',
      env: 'staging',
      redirectUri: 'http://localhost:3000'
    })
    this.state = {
      loading: false
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    const { access_token, expires_in } = queryString.parse(window.location.hash)
    if (access_token && expires_in) {
      this.setState({ loading: true })
      this.auth.completeLogin()
        .then(() => {
          this.setState({ loading: false })
          window.location.href = '/'
        })
    }
  }

  logout () {
    this.auth.logout()

    // We trigger a forced update to re-render the Auth status content
    this.forceUpdate()
  }

  renderApp () {
    return (
      <Box>
        <Box direction='row' justify='between' align='between' pad='small'>
          <div>OAuth Test app</div>
          {this.auth.getToken()
            ? <Button onClick={this.logout} label='Logout' />
            : <Button onClick={this.auth.startLogin} label='Login' />
          }
        </Box>
        <Box>
          <h2>Auth status:</h2>
          <pre style={{ whiteSpace: 'pre-line', wordBreak: 'break-all' }}>
            {JSON.stringify(this.auth.getToken(), null, 2)}
          </pre>
        </Box>
      </Box>
    )
  }

  renderLoading () {
    return (
      <div>Reticulating splines...</div>
    )
  }

  render () {
    return (
      <Grommet>
        {this.state.loading ? this.renderLoading() : this.renderApp()}
      </Grommet>
    )
  }
}

export default App
