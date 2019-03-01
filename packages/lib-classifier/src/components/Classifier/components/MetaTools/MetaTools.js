import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import MetadataButton from './components/MetadataButton'
import MetadataModal from './components/MetadataModal'
import FavouritesButton from './components/FavouritesButton'
import CollectionsButton from './components/CollectionsButton'

function storeMapper(stores) {
  const { active: subject, isThereMetadata } = stores.classifierStore.subjects
  const { onToggleFavourite } = stores.classifierStore
  return {
    isThereMetadata,
    onToggleFavourite,
    subject
  }
}

@inject(storeMapper)
@observer
export default class MetaTools extends React.Component {
  constructor () {
    super()

    this.toggleFavourites = this.toggleFavourites.bind(this)
    this.toggleMetadataModal = this.toggleMetadataModal.bind(this)

    this.state = {
      showMetadataModal: false
    }
  }

  toggleMetadataModal () {
    this.setState((prevState) => { return { showMetadataModal: !prevState.showMetadataModal } })
  }

  toggleFavourites () {
    const { onToggleFavourite, subject } = this.props
    subject.toggleFavorite()
    onToggleFavourite(subject.id, subject.favorite)
  }

  render () {
    const { className, isThereMetadata, subject } = this.props
    // Grommet's Button determines disabled state by whether or not onClick is defined
    const onClick = (isThereMetadata) ? this.toggleMetadataModal : undefined
    return (
      <Box className={className} direction="row">
        {isThereMetadata &&
          <MetadataButton onClick={onClick} />}
        {isThereMetadata &&
          <MetadataModal
            active={this.state.showMetadataModal}
            closeFn={this.toggleMetadataModal}
            metadata={subject.metadata}
          />}
        <FavouritesButton
          checked={subject && subject.favorite}
          onClick={this.toggleFavourites}
        />
        <CollectionsButton />
      </Box>
    )
  }

}