import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'

import en from './locales/en-US'
import enGB from './locales/en-GB'

counterpart.registerTranslations('en', en)
counterpart.registerTranslations('en-GB', enGB)

function FavouritesButton (props) {
  const { checked, disabled, onClick } = props
  const [ isFavourite, setIsFavourite ] = useState(checked)
  const label = isFavourite ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  const fill = isFavourite ? props.theme.global.colors.statusColors.error : 'none'

  function toggleFavourite () {
    setIsFavourite(!isFavourite)
    onClick()
  }

  return (
    <MetaToolsButton
      aria-checked={isFavourite}
      disabled={disabled}
      icon={<HeartIcon color='dark-5' fill={fill} size='1em' />}
      role='checkbox'
      text={counterpart(label)}
      onClick={toggleFavourite}
    />
  )
}

FavouritesButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

FavouritesButton.defaultProps = {
  checked: false,
  disabled: false,
  onClick: () => false
}

export default withTheme(FavouritesButton)
export { FavouritesButton }
