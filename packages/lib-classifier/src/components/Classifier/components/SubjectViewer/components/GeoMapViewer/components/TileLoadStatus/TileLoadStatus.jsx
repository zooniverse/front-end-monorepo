import { Box, Button, Text } from 'grommet'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const StatusBox = styled(Box)`
  background: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  bottom: 40px;
  color: white;
  left: 50%;
  pointer-events: auto;
  position: absolute;
  transform: translateX(-50%);
  z-index: 1;
`

function TileLoadStatus ({
  failed = false,
  loading = false,
  onRetry
}) {
  const { t } = useTranslation('components')

  if (!failed && !loading) return null

  return (
    <StatusBox
      align='center'
      direction='row'
      gap='small'
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      role='status'
    >
      <Text size='small'>
        {failed
          ? t('SubjectViewer.GeoMapViewer.TileLoadStatus.failed')
          : t('SubjectViewer.GeoMapViewer.TileLoadStatus.loading')}
      </Text>
      {failed && (
        <Button
          label={t('SubjectViewer.GeoMapViewer.TileLoadStatus.retry')}
          onClick={onRetry}
          primary
          size='small'
        />
      )}
    </StatusBox>
  )
}

TileLoadStatus.propTypes = {
  failed: bool,
  loading: bool,
  onRetry: func.isRequired
}

export default TileLoadStatus
