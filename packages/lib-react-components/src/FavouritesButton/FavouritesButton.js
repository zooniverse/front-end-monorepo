import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { withTheme } from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'
import { useTranslation } from 'react-i18next'
import '../translations/i18n'
import i18n from 'i18next'

function FavouritesButton ({
  checked,
  disabled,
  locale,
  onClick,
  theme
}) {
  const [isFavourite, setIsFavourite] = useState(checked)
  const label = isFavourite ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  const fill = isFavourite ? theme.global.colors.statusColors.error : 'none'

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

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
  locale: PropTypes.string,
  onClick: PropTypes.func
}

FavouritesButton.defaultProps = {
  checked: false,
  disabled: false,
  // locale: 'en',
  onClick: () => false
}

export default withTheme(FavouritesButton)
export { FavouritesButton }
