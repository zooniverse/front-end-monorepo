import { Box, DropButton } from 'grommet'
import { SettingsOption } from 'grommet-icons'
import { useTranslation } from '@translations/i18n'

import DemoModeToggle from './components/DemoModeToggle'

function ExpertOptions (props) {
  const { t } = useTranslation('components')
  return (
    <DropButton
      a11yTitle={t('TaskArea.Tasks.ExpertOptions.label')}
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <Box pad='small'>
          <DemoModeToggle />
        </Box>
      }
      icon={<SettingsOption size='small' />}
      plain
      {...props}
    />
  )
}

export default ExpertOptions
