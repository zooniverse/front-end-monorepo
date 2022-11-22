import { inject, observer } from 'mobx-react'
import { func, string } from 'prop-types'
import { Component } from 'react'

import ThemeModeToggle from './ThemeModeToggle'

function storeMapper (stores) {
  const { mode, toggleMode } = stores.store.ui
  return {
    mode,
    toggleMode
  }
}

class ThemeModeToggleContainer extends Component {
  render () {
    const { mode, toggleMode } = this.props
    return (
      <ThemeModeToggle
        mode={mode}
        onClick={toggleMode}
      />
    )
  }
}

ThemeModeToggleContainer.propTypes = {
  mode: string,
  toggleMode: func
}

ThemeModeToggleContainer.defaultProps = {
  mode: 'light'
}

export default inject(storeMapper)(observer(ThemeModeToggleContainer))
