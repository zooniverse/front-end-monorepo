import { Button } from 'grommet'
import { useTranslation } from '../../../translations/i18n'
import { func, string } from 'prop-types'
import { Sun, Moon } from 'grommet-icons'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  > svg {
    width: 0.875rem;
    height: 0.875rem; // grommet-icons won't recognize rem units for size
  }

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
          <Moon color='#b2b2b2' />
        ) : (
          <Sun color='#b2b2b2' />
        )
      }
      margin={{ right: 'small' }}
      onClick={onThemeChange}
      plain
    />
  )
}

ThemeModeToggle.propTypes = {
  themeMode: string,
  onThemeChange: func
}
