import { Box, Stack } from 'grommet'
import { inject } from 'mobx-react'
import { Component } from 'react'

function storeMapper (stores) {
  const { isLoggedIn } = stores.store.user
  return { isLoggedIn }
}

function withRequireUser (WrappedComponent) {
  @inject(storeMapper)
  class RequireUser extends Component {
    render () {
      const { isLoggedIn, ...rest } = this.props
      return (
        <Stack>
          <WrappedComponent {...rest} />
          {!isLoggedIn && (
            <Box
              align='center'
              background='rgba(255,255,255,0.7)'
              fill
              justify='center'
            >
              <Box background='white' elevation='small' pad='medium'>
                {/* {counterpart('RequireUser.text')} */}
                Text
              </Box>
            </Box>
          )}
        </Stack>
      )
    }
  }

  RequireUser.defaultProps = {
    isLoggedIn: false
  }

  return RequireUser
}

export default withRequireUser
