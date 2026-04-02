import { arrayOf, func, shape } from 'prop-types'
import { Box } from 'grommet'
import { useTranslation } from '@translations/i18n'

import locationValidator from '../../helpers/locationValidator'

const DEFAULT_HANDLER = () => {}

function SingleAudioViewer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { t } = useTranslation('components')

  const audioLocation = subject ? subject.locations.find(l => l.type === 'audio') : null

  const handleCanPlay = () => {
    onReady()
  }

  const handleError = (e) => {
    onError(e)
  }

  if (!audioLocation) {
    return <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
  }

  return (
    <Box width='100%'>
      <audio
        controls
        controlsList='nodownload'
        onCanPlay={handleCanPlay}
        onError={handleError}
        preload='auto'
        src={audioLocation.url}
        style={{ width: '100%' }}
      />
    </Box>
  )
}

SingleAudioViewer.propTypes = {
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default SingleAudioViewer
