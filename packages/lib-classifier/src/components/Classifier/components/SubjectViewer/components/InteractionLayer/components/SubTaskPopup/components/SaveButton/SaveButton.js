import { PrimaryButton, withThemeContext } from '@zooniverse/react-components'
import { bool, func } from 'prop-types'
import { useTranslation } from '@translations/i18n'

import saveButtonTheme from './theme'

function SaveButton (props) {
  const { autoFocus, disabled, onClick } = props
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

SaveButton.defaultProps = {
  autoFocus: false,
  disabled: false
}

SaveButton.propTypes = {
  autoFocus: bool,
  disabled: bool,
  onClick: func.isRequired
}

export default withThemeContext(SaveButton, saveButtonTheme)
export { SaveButton }
