import { Favorite } from 'grommet-icons'
import { bool, func } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'

const StyledFavorite = styled(Favorite)`
  // target the grommet icon's path element with a fill of "none"
  path[fill="none"] {
    fill: ${props => props.$isFavorite ? props.theme.global.colors.statusColors.error : 'none'};
  }
`

const DEFAULT_HANDLER = () => true

function FavoritesIconButton({
  checked = false,
  disabled = false,
  onClick = DEFAULT_HANDLER
}) {
  const [isFavorite, setIsFavorite] = useState(checked)

  useEffect(function updateIsFavorite() {
    setIsFavorite(checked)
  }, [checked])

  const { t } = useTranslation()

  const label = isFavorite ? 'FavouritesButton.remove' : 'FavouritesButton.add'

  function toggleFavorite() {
    setIsFavorite(!isFavorite)
    onClick()
  }

  return (
    <IconActionButton
      a11yTitle={t(label)}
      aria-checked={isFavorite}
      disabled={disabled}
      icon={<StyledFavorite $isFavorite={isFavorite} />}
      role='checkbox'
      onClick={toggleFavorite}
    />
  )
}

FavoritesIconButton.propTypes = {
  checked: bool,
  disabled: bool,
  onClick: func
}

export default FavoritesIconButton
