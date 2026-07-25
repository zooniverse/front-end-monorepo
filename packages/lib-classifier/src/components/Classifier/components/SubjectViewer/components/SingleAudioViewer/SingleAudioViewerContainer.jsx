import { arrayOf, func, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import SingleAudioViewer from './SingleAudioViewer'

function storeMapper(store) {
  const {
    subjectViewer: { setVideoSpeed, setVolume, videoSpeed, volume }
  } = store

  return {
    setAudioSpeed: setVideoSpeed,
    setVolume,
    audioSpeed: videoSpeed,
    volume
  }
}

const DEFAULT_HANDLER = () => {}

function SingleAudioViewerContainer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const {
    audioSpeed,
    setAudioSpeed,
    setVolume,
    volume
  } = useStores(storeMapper)

  return (
    <SingleAudioViewer
      audioSpeed={audioSpeed}
      onError={onError}
      onReady={onReady}
      setAudioSpeed={setAudioSpeed}
      setVolume={setVolume}
      subject={subject}
      volume={volume}
    />
  )
}

SingleAudioViewerContainer.propTypes = {
  loadingState: string,
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default observer(SingleAudioViewerContainer)
