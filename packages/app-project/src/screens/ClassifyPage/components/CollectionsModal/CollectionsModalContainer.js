import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CollectionsModal from './CollectionsModal'
import SelectCollection from './components/SelectCollection'
import CreateCollection from './components/CreateCollection'

function storeMapper (stores) {
  const { addSubjects, collections, createCollection, searchCollections } = stores.store.collections
  return {
    addSubjects,
    collections,
    createCollection,
    searchCollections
  }
}

@inject(storeMapper)
@observer
class CollectionsModalContainer extends Component {
  constructor () {
    super()
    this.addToCollection = this.addToCollection.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.state = {
      active: false,
      selectedCollectionId: null
    }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  addToCollection () {
    const { selectedCollectionId } = this.state
    this.props.addSubjects(selectedCollectionId, [])
  }

  onSelect (event) {
    const selectedCollectionId = event.value.id
    this.setState({ selectedCollectionId })
  }

  render () {
    const { collections, createCollection, searchCollections } = this.props
    const { active, selectedCollectionId } = this.state

    return (
      <CollectionsModal
        active={active}
        closeFn={() => this.setState({ active: false })}
      >
        <SelectCollection
          collections={collections}
          disabled={!selectedCollectionId}
          onSelect={this.onSelect}
          onSearch={searchCollections}
          onSubmit={this.addToCollection}
          selected={selectedCollectionId}
        />
        <CreateCollection
          onSubmit={createCollection}
        />
      </CollectionsModal>
    )
  }
}

CollectionsModalContainer.propTypes = {
  subjectId: PropTypes.string.isRequired
}

CollectionsModalContainer.defaultProps = {
}

export default CollectionsModalContainer
