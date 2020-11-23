import React from 'react'
import { Box, DropButton } from 'grommet'
import { SettingsOption } from 'grommet-icons'
import counterpart from 'counterpart'
import en from './locales/en'
import DemoModeToggle from './components/DemoModeToggle'

counterpart.registerTranslations('en', en)

function ExpertOptions (props) {
  return (
    <DropButton
      a11yTitle={counterpart('ExpertOptions.label')}
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
  );
}

export default ExpertOptions