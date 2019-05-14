import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const Favourite = styled(HeartIcon)`
  fill: ${props => props.filled ? props.theme.global.colors.statusColors.error : 'none'};
  width: 1em;
`

export default function FavouritesButton (props) {
  const { checked, className, disabled, onClick } = props
  const label = checked ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  return (
    <MetaToolsButton
      aria-checked={checked}
      className={className}
      disabled={disabled}
      icon={<Favourite className={className} color='dark-5' filled={checked ? 'true' : undefined} />}
      role='checkbox'
      text={counterpart(label)}
      onClick={onClick}
    />
  )
}

FavouritesButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

FavouritesButton.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  onClick: () => false
}
