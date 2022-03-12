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
  const { locale } = stores.classifierStore
  const { active: subject, isThereMetadata } = stores.classifierStore.subjects
  const { interactionTask } = stores.classifierStore.workflowSteps
  const upp = stores.classifierStore.userProjectPreferences.active
  return {
    interactionTask,
    isThereMetadata,
    locale,
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
    const {
      className,
      interactionTask,
      isThereMetadata,
      locale,
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
          checked={subject && subject.favorite}
          disabled={!subject || !upp}
          locale={locale}
          onClick={subject && subject.toggleFavorite}
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

MetaTools.wrappedComponent.defaultProps = {
  className: '',
  interactionTask: {},
  isThereMetadata: false,
  subject: null,
  upp: null
}

MetaTools.wrappedComponent.propTypes = {
  className: PropTypes.string,
  interactionTask: PropTypes.shape({
    shownMarks: PropTypes.string,
    togglePreviousMarks: PropTypes.func,
    type: PropTypes.string
  }),
  isThereMetadata: PropTypes.bool,
  locale: PropTypes.string,
  screenSize: PropTypes.string,
  subject: PropTypes.object,
  upp: PropTypes.object
}

export default withResponsiveContext(MetaTools)
export { MetaTools }
