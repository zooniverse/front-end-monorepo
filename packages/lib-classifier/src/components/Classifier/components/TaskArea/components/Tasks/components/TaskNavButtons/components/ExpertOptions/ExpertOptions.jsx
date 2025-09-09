import { Box, DropButton } from 'grommet'
import { SettingsOption } from 'grommet-icons'
import { useTranslation } from '@translations/i18n'

import DemoModeToggle from './components/DemoModeToggle'

/*
  This component is setup as a DropButton because other expert options existing in PFE like 'gold standard',
  but in FEM the only expert option is demo mode
*/
function ExpertOptions () {
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
    />
  )
}

export default ExpertOptions
