import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import { FavouritesButton, withResponsiveContext } from '@zooniverse/react-components'
import Metadata from './components/Metadata'
import CollectionsButton from './components/CollectionsButton'
import HidePreviousMarksButton from './components/HidePreviousMarksButton'
import SHOWN_MARKS from '@helpers/shownMarks'

function storeMapper (stores) {
  const { active: subject, isThereMetadata } = stores.classifierStore.subjects
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  const [activeInteractionTask] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription') || {}
  const upp = stores.classifierStore.userProjectPreferences.active
  return {
    activeInteractionTask,
    isThereMetadata,
    subject,
    upp
  }
}

@inject(storeMapper)
@observer
class MetaTools extends React.Component {
  constructor () {
    super()

    this.addToCollection = this.addToCollection.bind(this)
  }

  addToCollection () {
    const { subject } = this.props
    subject.addToCollection()
  }

  // TODO: Add fallbacks for when Panoptes is not serializing the subject favorite info
  render () {
    const { activeInteractionTask, className, isThereMetadata, screenSize, subject, upp } = this.props
    const { shownMarks, marks, togglePreviousMarks, type } = activeInteractionTask || {}
    const gap = (screenSize === 'small') ? 'xsmall' : 'small'
    const margin = (screenSize === 'small') ? { top: 'small' } : 'none'

    return (
      <Box
        key={subject && subject.id}
        className={className}
        direction='row-responsive'
        gap={gap}
        margin={margin}
      >
        <Metadata isThereMetadata={isThereMetadata} metadata={subject && subject.metadata} />
        <FavouritesButton
          checked={subject && subject.favorite}
          disabled={!subject || !upp}
          onClick={subject && subject.toggleFavorite}
        />
        <CollectionsButton
          disabled={!subject || !upp}
          onClick={this.addToCollection}
        />
        {activeInteractionTask && (
          <HidePreviousMarksButton
            disabled={marks.length === 0}
            shownMarks={shownMarks}
            type={type}
            onClick={() => togglePreviousMarks()}
          />
        )}
      </Box>
    )
  }
}

MetaTools.defaultProps = {
  activeInteractionTask: {
    shownMarks: SHOWN_MARKS.ALL,
    togglePreviousMarks: () => {},
    type: ''
  },
  className: '',
  isThereMetadata: false,
  subject: null,
  upp: null
}

MetaTools.propTypes = {
  activeInteractionTask: PropTypes.shape({
    shownMarks: PropTypes.string,
    togglePreviousMarks: PropTypes.func,
    type: PropTypes.string
  }),
  className: PropTypes.string,
  isThereMetadata: PropTypes.bool,
  screenSize: PropTypes.string,
  subject: PropTypes.object,
  upp: PropTypes.object
}

export default withResponsiveContext(MetaTools)
export { MetaTools }
