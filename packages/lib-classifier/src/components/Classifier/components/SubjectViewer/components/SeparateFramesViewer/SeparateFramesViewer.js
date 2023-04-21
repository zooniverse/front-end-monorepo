import { observer } from 'mobx-react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import SeparateFrame from './components/SeparateFrame/SeparateFrame.js'
import ViewModeButton from './components/ViewModeButton/ViewModeButton.js'

function storeMapper(store) {
  const { separateFramesView, setSeparateFramesView } = store.subjectViewer
  const { limit_subject_height: limitSubjectHeight } =
    store.workflows?.active?.configuration

  return {
    limitSubjectHeight,
    separateFramesView,
    setSeparateFramesView
  }
}

const DEFAULT_HANDLER = () => true

function SeparateFramesViewer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { limitSubjectHeight } = useStores(storeMapper)

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <>
      <Box gap='small'>
        {subject.locations?.map(location => (
          <SeparateFrame
            frameUrl={Object.values(location)[0]}
            key={Object.values(location)[0]}
            limitSubjectHeight={limitSubjectHeight}
            onError={onError}
            onReady={onReady}
          />
        ))}
      </Box>
      <Box
        justify='center'
        pad='xsmall'
      >
        <ViewModeButton />
      </Box>
    </>
  )
}

export default observer(SeparateFramesViewer)

SeparateFramesViewer.propTypes = {
  /** @zooniverse/async-states */
  loadingState: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from SubjectViewer and dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`. */
  onReady: PropTypes.func,
  /** Required. Passed from mobx store via SubjectViewer. */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}
