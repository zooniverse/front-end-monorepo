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
  const { active: workflow } = stores.classifierStore.workflows
  const upp = stores.classifierStore.userProjectPreferences.active
  return {
    isThereMetadata,
    subject,
    workflow,
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
    const { className, isThereMetadata, screenSize, subject, workflow, upp } = this.props
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
        {workflow?.canHidePreviousMarks && (
          <HidePreviousMarksButton
            onClick={() => console.log('Toggle Marks')}
          />
        )}
      </Box>
    )
  }
}

MetaTools.defaultProps = {
  className: '',
  isThereMetadata: false,
  subject: null,
  upp: null,
  workflow: {
    canHidePreviousMarks: false
  }
}

MetaTools.propTypes = {
  className: PropTypes.string,
  isThereMetadata: PropTypes.bool,
  screenSize: PropTypes.string,
  subject: PropTypes.object,
  upp: PropTypes.object,
  workflow: PropTypes.shape({
    canHidePreviousMarks: PropTypes.bool
  })
}

export default withResponsiveContext(MetaTools)
export { MetaTools }
