import { Button, Grommet, Box, Text } from 'grommet'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

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
      loading: true,
      user: null
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    this.auth.initialize()
      .then((user) => {
        this.setState({ loading: false, user })
        if (location.hash) history.replaceState(null, document.title, location.pathname + location.search)
      })
      .catch((error) => {
        console.error(error)
        this.setState({ loading: false })
      })
  }

  logout () {
    this.auth.logout()
      .then(this.setState({ user: null }))
  }

  renderApp () {
    return (
      <Box>
        <Box direction='row' justify='between' pad='small'>
          <div>OAuth Test app</div>
          {this.state.user
            ? <Button onClick={this.logout} label='Logout' />
            : <Button onClick={this.auth.startLogin} label='Login' />
          }
        </Box>
        <Box>
          <h2>Auth status:</h2>
          <pre style={{ whiteSpace: 'pre-line', wordBreak: 'break-all' }}>
            {this.state.user && this.auth.getToken()
              ? <Text>Token exists</Text>
              : <Text>No token</Text>}
          </pre>
          <hr />
          {this.state.user
            ? <Text>User: {this.state.user.display_name}</Text>
            : <Text>No user</Text>}
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
      <Grommet theme={zooTheme}>
        {this.state.loading ? this.renderLoading() : this.renderApp()}
      </Grommet>
    )
  }
}

export default App
