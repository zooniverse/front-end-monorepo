import { PrimaryButton } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import { bool, func } from 'prop-types'
import { useTranslation } from '@translations/i18n'

import saveButtonTheme from './theme'

function SaveButton ({
  autoFocus = false,
  disabled = false,
  onClick
}) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.InteractionLayer.SaveButton.save')
  return (
    <PrimaryButton
      autoFocus={autoFocus}
      disabled={disabled}
      label={label}
      onClick={onClick}
    />
  )
}

SaveButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  onClick: func.isRequired
}

export default withThemeContext(SaveButton, saveButtonTheme)
export { SaveButton }
