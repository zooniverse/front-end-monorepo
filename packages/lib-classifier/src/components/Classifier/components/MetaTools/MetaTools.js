import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import Metadata from './components/Metadata'
import FavouritesButton from './components/FavouritesButton'
import CollectionsButton from './components/CollectionsButton'

function storeMapper(stores) {
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
export default class MetaTools extends React.Component {
  constructor () {
    super()

    this.addToCollection = this.addToCollection.bind(this)
    this.toggleFavourites = this.toggleFavourites.bind(this)
  }

  addToCollection () {
    const { subject } = this.props
    subject.addToCollection()
  }

  toggleFavourites () {
    const { subject } = this.props
    subject.toggleFavorite()
  }

  render () {
    const { className, isThereMetadata, subject, upp } = this.props

    return (
      <Box align='start' className={className} direction="row-responsive" gap='small'>
        <Metadata isThereMetadata={isThereMetadata} metadata={subject && subject.metadata} />
        <FavouritesButton
          checked={subject && subject.favorite}
          disabled={!upp}
          onClick={this.toggleFavourites}
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
  subject: PropTypes.object,
  upp: PropTypes.object
}

