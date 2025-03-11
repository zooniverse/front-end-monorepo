import asyncStates from '@zooniverse/async-states'
import { Loader } from '@zooniverse/react-components'
import { Box, Button, Layer, Text, Anchor } from 'grommet'
import { Alert, Download } from 'grommet-icons'
import { func, number, string, shape } from 'prop-types'

import { useTranslation } from '../../../../translations/i18n.js'

function ExportBox({ children }) {
  return (
    <Box
      align='center'
      gap='small'
      height='medium'
      justify='center'
      width='medium'
    >
      {children}
    </Box>
  )
}

const DEFAULT_DOWNLOAD_URL = {
  url: '',
  filename: ''
}
const DEFAULT_HANDLER = () => true

function ExportStats({
  csvSizeEstimate = '',
  downloadUrl = DEFAULT_DOWNLOAD_URL,
  errorMessage = '',
  exportProgress = 0,
  exportStatus = asyncStates.initialized,
  memberCount = 0,
  onClose = DEFAULT_HANDLER,
  onConfirm = DEFAULT_HANDLER,
  onRetry = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()
  const loadingExportMessage = t('Contributors.generating')

  // loading state
  if (exportStatus === asyncStates.loading) {
    return (
      <Layer>
        <ExportBox>
          <Text>
            {loadingExportMessage}
          </Text>
          <Loader loadingMessage={loadingExportMessage} />
          <Text>
            {`Progress: ${Math.round(exportProgress)}%`}
          </Text>
        </ExportBox>
      </Layer>
    )
  }

  // error state
  if (exportStatus === asyncStates.error) {
    return (
      <Layer>
        <ExportBox>
          <Box
            align='center'
            gap='small'
          >
            <Alert
              color='status-error'
              size='large'
            />
            <Text
              textAlign='center'
              weight='bold'
              color='status-error'
            >
              {'Export Error'}
            </Text>
            <Text textAlign='center'>
              {errorMessage || 'Failed to generate export.'}
            </Text>
          </Box>
          <Box
            direction='row'
            gap='medium'
            margin={{ top: 'medium' }}
          >
            <Button 
              label='Close'
              onClick={onClose}
            />
            <Button 
              label='Retry'
              onClick={onRetry}
              primary
            />
          </Box>
        </ExportBox>
      </Layer>
    )
  }

  // success state
  if (exportStatus === asyncStates.success) {
    return (
      <Layer>
        <ExportBox>
          <Text
            textAlign='center'
            weight='bold'
          >
            {'Export Complete'}
          </Text>
          <Box
            align='center'
            gap='small'
          >
            <Anchor
              href={downloadUrl.url}
              download={downloadUrl.filename}
              icon={<Download />}
              label={'Download CSV'}
              primary
              target='_blank'
            />
          </Box>
          <Button
            label={'Close'}
            onClick={onClose}
            margin={{ top: 'medium' }}
          />
        </ExportBox>
      </Layer>
    )
  }

  return (
    <Layer>
      <ExportBox>
        <Text textAlign='center'>
          {`Download CSV of groups stats for ${memberCount.toLocaleString()} members? Approximately ${csvSizeEstimate}.`}
        </Text>
        <Box
          direction='row'
          gap='medium'
          margin={{ top: 'medium' }}
        >
          <Button 
            label='Cancel'
            onClick={onClose}
          />
          <Button 
            label='Confirm'
            onClick={onConfirm}
            primary
          />
        </Box>
      </ExportBox>
    </Layer>
  )
}

ExportStats.propTypes = {
  csvSizeEstimate: string,
  downloadUrl: shape({
    url: string,
    filename: string
  }),
  errorMessage: string,
  exportProgress: number,
  exportStatus: string,
  memberCount: number,
  onClose: func,
  onConfirm: func,
  onRetry: func
}

export default ExportStats
