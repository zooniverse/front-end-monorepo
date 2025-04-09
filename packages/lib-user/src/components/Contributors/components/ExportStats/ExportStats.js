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
      pad='medium'
      width={{ min: 'medium' }}
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
  const loadingExportMessage = t('Contributors.ExportStats.downloading')

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
            {t('Contributors.ExportStats.progress', {
              progress: Math.round(exportProgress)
            })}
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
              {t('Contributors.ExportStats.error')}
            </Text>
            <Text textAlign='center'>
              {errorMessage || t('Contributors.ExportStats.errorMessage')}
            </Text>
          </Box>
          <Box
            direction='row'
            gap='medium'
            margin={{ top: 'medium' }}
          >
            <Button 
              label={t('Contributors.ExportStats.close')}
              onClick={onClose}
            />
            <Button 
              label={t('Contributors.ExportStats.retry')}
              onClick={onRetry}
              primary
            />
          </Box>
        </ExportBox>
      </Layer>
    )
  }

  // success state without filename
  if (exportStatus === asyncStates.success && !downloadUrl.filename) {
    return (
      <Layer>
        <ExportBox>
          <Text
            textAlign='center'
          >
            {t('Contributors.ExportStats.generating')}
          </Text>
          <Button
            label={t('Contributors.ExportStats.close')}
            onClick={onClose}
            margin={{ top: 'medium' }}
          />
        </ExportBox>
      </Layer>
    )
  }

  // success state with filename
  if (exportStatus === asyncStates.success && downloadUrl.filename) {
    return (
      <Layer>
        <ExportBox>
          <Text
            textAlign='center'
            weight='bold'
          >
            {t('Contributors.ExportStats.complete')}
          </Text>
          <Text textAlign='center'>
            {t('Contributors.ExportStats.download')}
          </Text>
          <Box
            align='center'
            gap='small'
          >
            <Anchor
              href={downloadUrl.url}
              download={downloadUrl.filename}
              icon={<Download />}
              label={
                <Text>
                  {downloadUrl.filename}
                </Text>
              }
              primary
              target='_blank'
            />
          </Box>
          <Button
            label={t('Contributors.ExportStats.close')}
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
          {t('Contributors.ExportStats.confirmMessage', {
            memberCount: memberCount.toLocaleString()
          })}
        </Text>
        <Text>
          {t('Contributors.ExportStats.fileSize', {
            fileSize: csvSizeEstimate
          })}
        </Text>
        <Box
          direction='row'
          gap='medium'
          margin={{ top: 'medium' }}
        >
          <Button 
            label={t('Contributors.ExportStats.cancel')}
            onClick={onClose}
          />
          <Button 
            label={t('Contributors.ExportStats.confirm')}
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
