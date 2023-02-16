import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import { createLocationCounts, withStores } from '@helpers'
import getViewer from './helpers/getViewer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject,
      loadingState: subjectQueueState
    },
    subjectViewer: {
      onSubjectReady,
      onError,
      loadingState: subjectReadyState,
      setLayout
    }
  } = classifierStore

  return {
    onError,
    onSubjectReady,
    setLayout,
    subject,
    subjectQueueState,
    subjectReadyState
  }
}

function SubjectViewer({
  onError,
  onSubjectReady,
  setLayout,
  subject,
  subjectQueueState = asyncStates.initialized,
  subjectReadyState
}) {
  const { t } = useTranslation('components')

  if (subject?.locations) {
    const locationCounts = createLocationCounts(subject)
    // This is a subject pattern for the flipbook, see more in Subject store's get Viewer() action
    if (locationCounts.total > 1 && locationCounts.total === locationCounts.images) {
      setLayout('multiFrame')
    }
  }

  switch (subjectQueueState) {
    case asyncStates.initialized: {
      return null
    }
    case asyncStates.loading: {
      return (<div>{t('SubjectViewer.loading')}</div>)
    }
    case asyncStates.error: {
      console.error('There was an error loading the subjects')
      return null
    }
    case asyncStates.success: {
      const Viewer = getViewer(subject?.viewer)

      if (Viewer) {
        return (
          <Viewer
            key={subject.id}
            subject={subject}
            loadingState={subjectReadyState}
            onError={onError}
            onReady={onSubjectReady}
            viewerConfiguration={subject?.viewerConfiguration}
          />
        )
      }

      return null
    }
  }
}

SubjectViewer.propTypes = {
  subjectQueueState: PropTypes.oneOf(asyncStates.values),
  subject: PropTypes.shape({
    viewer: PropTypes.string
  })
}

export default withStores(SubjectViewer, storeMapper)
export { SubjectViewer }
