import counterpart from 'counterpart'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'
import WithClientContext from './WithClientContext'
import WithLayer from './WithLayer'

counterpart.registerTranslations('en', en)

class Popup extends React.Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
  }

  login () {
    window.open(this.props.client.token.getUri(), '_self')
  }

  render () {
    return (
      <Box pad='medium' direction='column'>
        <div>
          {this.props.children}
        </div>
        <Box
          align='center'
          direction='row'
          justify='center'
          margin={{ top: 'medium' }}
        >
          <Button
            label={counterpart('Popup.loginButton')}
            onClick={this.login}
            primary
          />
        </Box>
      </Box>
    )
  }
}

Popup.propTypes = {
  client: PropTypes.shape({
    token: PropTypes.shape({
      getUri: PropTypes.func
    })
  })
}

export default WithClientContext(WithLayer(Popup))

export {
  Popup
}
