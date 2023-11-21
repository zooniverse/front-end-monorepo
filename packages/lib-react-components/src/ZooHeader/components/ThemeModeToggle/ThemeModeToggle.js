import { Button } from 'grommet'
import { useTranslation } from '../../../translations/i18n'
import PropTypes from 'prop-types'
import { Sun, Moon } from 'grommet-icons'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  padding-right: 15px;

  &:hover {
    > svg {
      stroke: white;
    }
  }
`

export default function ThemeModeToggle({ themeMode, onThemeChange }) {
  const { t } = useTranslation()

  const label =
    themeMode === 'dark'
      ? t('ZooHeader.ThemeModeToggle.switchToLight')
      : t('ZooHeader.ThemeModeToggle.switchToDark')

  return (
    <StyledButton
      aria-label={label}
      icon={
        themeMode === 'dark' ? (
          <Moon color='#b2b2b2' size='14px' />
        ) : (
          <Sun color='#b2b2b2' size='14px' />
        )
      }
      onClick={onThemeChange}
      plain
    />
  )
}

ThemeModeToggle.propTypes = {
  themeMode: PropTypes.string,
  onThemeChange: PropTypes.func
}
