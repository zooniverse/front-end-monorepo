import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'

import en from './locales/en-US'
import enGB from './locales/en-GB'

counterpart.registerTranslations('en', en)
counterpart.registerTranslations('en-GB', enGB)

export const Favourite = styled(HeartIcon)`
  fill: ${props => props.filled ? props.theme.global.colors.statusColors.error : 'none'};
`

export default function FavouritesButton (props) {
  const { checked, disabled, onClick } = props
  const [ isFavourite, setIsFavourite ] = useState(checked)
  const label = isFavourite ? 'FavouritesButton.remove' : 'FavouritesButton.add'

  function toggleFavourite () {
    setIsFavourite(!isFavourite)
    onClick()
  }

  return (
    <MetaToolsButton
      aria-checked={isFavourite}
      disabled={disabled}
      icon={<Favourite color='dark-5' filled={isFavourite} size='1em' />}
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
