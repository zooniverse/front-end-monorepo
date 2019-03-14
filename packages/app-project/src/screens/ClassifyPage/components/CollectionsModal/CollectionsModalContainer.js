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
    this.close = this.close.bind(this)
    this.createCollection = this.createCollection.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
    this.state = {
      active: false,
      newCollection: {
        display_name: '',
        private: false
      },
      selectedCollectionId: null
    }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  addToCollection (event) {
    event.preventDefault()
    const { selectedCollectionId } = this.state
    this.props.addSubjects(selectedCollectionId, [])
    this.close()
  }

  createCollection (event) {
    event.preventDefault()
    const { newCollection } = this.state
    this.props.createCollection(newCollection, [])
    this.close()
  }

  close () {
    this.setState({ active: false })
  }

  onSelect (event) {
    const selectedCollectionId = event.value.id
    this.setState({ selectedCollectionId })
  }

  updateCollection (collectionDetails) {
    this.setState((prevState) => {
      const newCollection = Object.assign({}, prevState.newCollection, collectionDetails)
      return { newCollection }
    })
  }

  render () {
    const { collections, searchCollections } = this.props
    const { active, newCollection, selectedCollectionId } = this.state

    return (
      <CollectionsModal
        active={active}
        closeFn={this.close}
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
          disabled={!newCollection.display_name}
          collection={newCollection}
          onChange={this.updateCollection}
          onSubmit={this.createCollection}
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
