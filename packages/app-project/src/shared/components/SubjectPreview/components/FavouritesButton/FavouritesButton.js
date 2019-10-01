import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
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
  const label = checked ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  const filled = checked ? 'true' : undefined
  return (
    <MetaToolsButton
      aria-checked={checked}
      disabled={disabled}
      icon={<Favourite color='dark-5' filled={filled} size='1em' />}
      role='checkbox'
      text={counterpart(label)}
      onClick={onClick}
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
