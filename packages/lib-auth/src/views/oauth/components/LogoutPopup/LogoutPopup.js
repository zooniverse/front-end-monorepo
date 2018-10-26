import counterpart from 'counterpart'
import React from 'react'

import en from './locales/en'
import Button from '../shared/Button'

counterpart.registerTranslations('en', en)

class LogoutPopup extends React.Component {
  constructor () {
    super()
    this.close = this.close.bind(this)
  }

  close () {
    this.props.closeFn()
  }

  render () {
    return (
      <div>
        {counterpart('LogoutPopup.message')}
        <Button
          label={counterpart('LogoutPopup.close')}
          onClick={this.close}
          primary={false}
        />
      </div>
    )
  }
}

export default LogoutPopup
