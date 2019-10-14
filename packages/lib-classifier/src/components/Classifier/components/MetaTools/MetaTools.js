import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import { FavouritesButton, withResponsiveContext } from '@zooniverse/react-components'
import Metadata from './components/Metadata'
import CollectionsButton from './components/CollectionsButton'

function storeMapper (stores) {
  const { active: subject, isThereMetadata } = stores.classifierStore.subjects
  const upp = stores.classifierStore.userProjectPreferences.active
  return {
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
    const { className, isThereMetadata, screenSize, subject, upp } = this.props
    const gap = (screenSize === 'small') ? 'xsmall' : 'small'
    const margin = (screenSize === 'small') ? { top: 'small' } : 'none'
    return (
      <Box className={className} direction='row-responsive' gap={gap} margin={margin}>
        <Metadata isThereMetadata={isThereMetadata} metadata={subject && subject.metadata} />
        <FavouritesButton
          checked={subject && subject.favorite}
          disabled={!upp}
          onClick={subject && subject.toggleFavorite}
        />
        <CollectionsButton
          disabled={!upp}
          onClick={this.addToCollection}
        />
      </Box>
    )
  }
}

MetaTools.defaultProps = {
  className: '',
  isThereMetadata: false,
  subject: null,
  upp: null
}

MetaTools.propTypes = {
  className: PropTypes.string,
  isThereMetadata: PropTypes.bool,
  screenSize: PropTypes.string,
  subject: PropTypes.object,
  upp: PropTypes.object
}

export default withResponsiveContext(MetaTools)
export { MetaTools }
