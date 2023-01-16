import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { FavouritesButton } from '@zooniverse/react-components'
import { useStores } from '@hooks'
import { observer } from 'mobx-react'

import Metadata from './components/Metadata'
import CollectionsButton from './components/CollectionsButton'
import HidePreviousMarksButton from './components/HidePreviousMarksButton'

function storeMapper(store) {
  const {
    subjects: { active: subject, isThereMetadata },
    userProjectPreferences: { active: upp },
    workflowSteps: { interactionTask }
  } = store

  return {
    interactionTask,
    isThereMetadata,
    subject,
    upp
  }
}

const MetaTools = () => {
  const {
    className = '',
    interactionTask = {},
    isThereMetadata = false,
    subject = null,
    upp = null
  } = useStores(storeMapper)

  const { shownMarks, marks, togglePreviousMarks, type } = interactionTask

  const addToCollection = () => {
    subject.addToCollection()
  }

  return (
    <Box
      key={subject && subject.id}
      className={className}
      direction='row-responsive'
      gap='small'
      margin={{ top: 'small' }}
    >
      <Metadata
        isThereMetadata={isThereMetadata}
        metadata={subject && subject.metadata}
      />
      <FavouritesButton
        checked={subject?.favorite}
        disabled={!subject || !upp}
        onClick={subject?.toggleFavorite}
      />
      <CollectionsButton
        disabled={!subject || !upp}
        onClick={addToCollection}
      />
      {Object.keys(interactionTask).length > 0 && (
        <HidePreviousMarksButton
          disabled={marks?.length === 0}
          shownMarks={shownMarks}
          type={type}
          onClick={state => togglePreviousMarks(state)}
        />
      )}
    </Box>
  )
}

MetaTools.propTypes = {
  className: PropTypes.string,
  interactionTask: PropTypes.shape({
    shownMarks: PropTypes.string,
    togglePreviousMarks: PropTypes.func,
    type: PropTypes.string
  }),
  isThereMetadata: PropTypes.bool,
  screenSize: PropTypes.string,
  subject: PropTypes.object,
  upp: PropTypes.object
}

export default observer(MetaTools)
