import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledHeartIcon = styled(HeartIcon)`
  fill: ${props => props.filled ? props.theme.global.colors.statusColors.error : 'none'};
`

export function Favourite (props) {
  const { className, checked } = props
  const filled = checked ? 'true' : undefined
  return (
    <StyledHeartIcon
      className={className}
      color='dark-5'
      filled={filled}
      size='1em'
      {...props}
    />
  )
}

export default function FavouritesButton (props) {
  const { checked, disabled, onClick } = props
  const label = checked ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  return (
    <MetaToolsButton
      aria-checked={checked}
      disabled={disabled}
      icon={<Favourite checked={checked} />}
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
