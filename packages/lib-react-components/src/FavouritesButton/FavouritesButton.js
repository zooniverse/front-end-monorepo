import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'
import { useTranslation } from 'react-i18next'
import '../translations/i18n'

function FavouritesButton (props) {
  const { checked, disabled, onClick } = props
  const [isFavourite, setIsFavourite] = useState(checked)
  const label = isFavourite ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  const fill = isFavourite ? props.theme.global.colors.statusColors.error : 'none'

  function toggleFavourite () {
    setIsFavourite(!isFavourite)
    onClick()
  }

  const { t } = useTranslation()

  return (
    <MetaToolsButton
      aria-checked={isFavourite}
      disabled={disabled}
      icon={<HeartIcon color='dark-5' fill={fill} size='15px' />}
      role='checkbox'
      text={t(label)}
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
