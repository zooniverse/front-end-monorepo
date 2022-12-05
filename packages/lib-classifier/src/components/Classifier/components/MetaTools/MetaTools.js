import { Component } from 'react';
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { FavouritesButton, withResponsiveContext } from '@zooniverse/react-components'

import Metadata from './components/Metadata'
import CollectionsButton from './components/CollectionsButton'
import HidePreviousMarksButton from './components/HidePreviousMarksButton'
import SHOWN_MARKS from '@helpers/shownMarks'
import { withStores } from '@helpers'

function storeMapper(store) {
  const {
    subjects: {
      active: subject,
      isThereMetadata
    },
    userProjectPreferences: {
      active: upp
    },
    workflowSteps: {
      interactionTask
    }
  } = store

  return {
    interactionTask,
    isThereMetadata,
    subject,
    upp
  }
}

class MetaTools extends Component {
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
    const {
      className,
      interactionTask,
      isThereMetadata,
      screenSize,
      subject,
      upp
    } = this.props
    const { shownMarks, marks, togglePreviousMarks, type } = interactionTask
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
          checked={subject?.favorite}
          disabled={!subject || !upp}
          onClick={subject?.toggleFavorite}
        />
        <CollectionsButton
          disabled={!subject || !upp}
          onClick={this.addToCollection}
        />
        {Object.keys(interactionTask).length > 0 && (
          <HidePreviousMarksButton
            disabled={marks?.length === 0}
            shownMarks={shownMarks}
            type={type}
            onClick={(state) => togglePreviousMarks(state)}
          />
        )}
      </Box>
    )
  }
}

MetaTools.defaultProps = {
  className: '',
  interactionTask: {},
  isThereMetadata: false,
  subject: null,
  upp: null
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

export default withStores(withResponsiveContext(MetaTools), storeMapper)
export { MetaTools }
