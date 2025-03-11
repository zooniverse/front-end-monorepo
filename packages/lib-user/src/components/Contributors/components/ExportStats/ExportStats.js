import asyncStates from '@zooniverse/async-states'
import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box, Layer } from 'grommet'
import { number, string } from 'prop-types'

import { useTranslation } from '../../../../translations/i18n.js'

function ExportStats({ exportProgress, exportStatus }) {
  const { t } = useTranslation()
  
  if (exportStatus !== asyncStates.loading) return null

  const loadingExportMessage = t('Contributors.generating')

  return (
    <Layer>
      <Box
        align='center'
        gap='small'
        height='medium'
        justify='center'
        width='medium'
      >
        <SpacedText>
          {loadingExportMessage}
        </SpacedText>
        <Loader
          loadingMessage={loadingExportMessage}
        />
        <SpacedText>
          {`Progress: ${Math.round(exportProgress)}%`}
        </SpacedText>
      </Box>
    </Layer>
  )
}

ExportStats.propTypes = {
  exportProgress: number,
  exportStatus: string,
  loadingExportMessage: string
}

export default ExportStats
