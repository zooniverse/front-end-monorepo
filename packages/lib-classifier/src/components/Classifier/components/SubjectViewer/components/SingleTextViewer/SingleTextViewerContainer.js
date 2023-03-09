import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import { useSubjectText } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import SingleTextViewer from './SingleTextViewer'

const defaultSubject = {
  id: '',
  locations: []
}

export default function SingleTextViewerContainer ({
  height = '',
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject = defaultSubject
}) {
  const { data, error, loading } = useSubjectText({
    subject,
    onReady,
    onError
})

  if (loadingState === asyncStates.error) {
    return <p>Something went wrong.</p>
  }

  if (loadingState !== asyncStates.initialized) {
    return (
      <SingleTextViewer
        content={data}
        height={height}
        subjectId={subject.id}
      />
    )
  }

  return null
}

SingleTextViewerContainer.propTypes = {
  height: PropTypes.string,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  }),
}
