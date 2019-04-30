import counterpart from 'counterpart'
import { Box, Stack } from 'grommet'
import { inject } from 'mobx-react'
import { func, shape, string } from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { isLoggedIn } = stores.store.user
  // return { isLoggedIn }
  return { isLoggedIn: false }
}

function withRequireUser (WrappedComponent) {
  @inject(storeMapper)
  class RequireUser extends React.Component {
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
                {counterpart('RequireUser.text')}
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
