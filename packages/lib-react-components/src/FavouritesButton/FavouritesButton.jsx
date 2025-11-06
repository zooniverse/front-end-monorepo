import { bool, func } from 'prop-types'
import { useState } from 'react';
import { useTheme } from 'styled-components'
import MetaToolsButton from '../MetaToolsButton'
import HeartIcon from './HeartIcon'
import { useTranslation } from '../translations/i18n'

const DEFAULT_HANDLER = () => {}

function FavouritesButton ({ checked = false, disabled = false, onClick = DEFAULT_HANDLER }) {
  const [isFavourite, setIsFavourite] = useState(checked)
  const { global } = useTheme()
  const label = isFavourite ? 'FavouritesButton.remove' : 'FavouritesButton.add'
  const fill = isFavourite ? global.colors.statusColors.error : 'none'

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
  checked: bool,
  disabled: bool,
  onClick: func
}

export default FavouritesButton
