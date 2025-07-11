import PropTypes from 'prop-types'
import HidePreviousMarksButton from './HidePreviousMarksButton'
import HidePreviousTranscriptionsButton from './HidePreviousTranscriptionsButton'

export default function HidePreviousMarksContainer (props) {
  const {
    type = 'drawing'
  } = props

  const HideMarksButton = type === 'transcription' ?
    HidePreviousTranscriptionsButton : HidePreviousMarksButton

  return <HideMarksButton {...props} />
}

HidePreviousMarksContainer.propTypes = {
  type: PropTypes.string
}
