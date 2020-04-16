import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import { FavouritesButton, withResponsiveContext } from '@zooniverse/react-components'
import Metadata from './components/Metadata'
import CollectionsButton from './components/CollectionsButton'
import HidePreviousMarksButton from './components/HidePreviousMarksButton'

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
    const { hidePreviousMarks, marks, togglePreviousMarks } = activeInteractionTask || {}
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
            hidePreviousMarks={hidePreviousMarks}
            onClick={() => togglePreviousMarks()}
          />
        )}
      </Box>
    )
  }
}

MetaTools.defaultProps = {
  activeInteractionTask: {
    hidePreviousMarks: false,
    togglePreviousMarks: () => {}
  },
  className: '',
  isThereMetadata: false,
  subject: null,
  upp: null
}

MetaTools.propTypes = {
  activeInteractionTask: PropTypes.shape({
    hidePreviousMarks: PropTypes.bool,
    togglePreviousMarks: PropTypes.func
  }),
  className: PropTypes.string,
  isThereMetadata: PropTypes.bool,
  screenSize: PropTypes.string,
  subject: PropTypes.object,
  upp: PropTypes.object
}

export default withResponsiveContext(MetaTools)
export { MetaTools }
