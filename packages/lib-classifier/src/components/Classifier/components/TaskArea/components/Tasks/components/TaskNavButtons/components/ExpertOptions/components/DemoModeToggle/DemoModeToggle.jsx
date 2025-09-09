import { bool, func } from 'prop-types'
import { CheckBox } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

const DEFAULT_HANDLER = () => {}

export default function DemoModeToggle ({ demoMode = false, setDemoMode = DEFAULT_HANDLER }) {
  const { t } = useTranslation('components')
  return (
    <CheckBox
      checked={demoMode}
      label={<SpacedText>{t('TaskArea.Tasks.ExpertOptions.demoToggle')}</SpacedText>}
      onChange={event => setDemoMode(event.target.checked)}
      toggle
    />
  )
}

DemoModeToggle.propTypes = {
  demoMode: bool,
  setDemoMode: func
}
