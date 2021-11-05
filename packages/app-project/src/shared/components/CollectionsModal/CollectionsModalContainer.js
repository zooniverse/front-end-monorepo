import { inject, observer } from 'mobx-react'
import { array, func } from 'prop-types'
import { Component } from 'react'

import CollectionsModal from './CollectionsModal'
import SelectCollection from './components/SelectCollection'
import CreateCollection from './components/CreateCollection'

function storeMapper (stores) {
  const store = stores.store || {}
  const collectionsStore = store.user?.collections || {}
  const {
    addSubjects,
    collections,
    createCollection,
    searchCollections
  } = collectionsStore
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
      selectedCollection: undefined,
      subjectId: null
    }
  }

  addToCollection (event) {
    event.preventDefault()
    const { selectedCollection, subjectId } = this.state
    this.props.addSubjects(selectedCollection.id, [subjectId])
    this.close()
  }

  createCollection (event) {
    event.preventDefault()
    const { newCollection, subjectId } = this.state
    this.props.createCollection(newCollection, [subjectId])
    this.close()
  }

  open (subjectId) {
    this.setState({
      active: true,
      subjectId
    })
  }

  close () {
    const subjectId = null
    this.setState({
      active: false,
      subjectId
    })
  }

  onSelect (event) {
    const selectedCollection = event.value
    this.setState({ selectedCollection })
  }

  updateCollection (collectionDetails) {
    this.setState(prevState => {
      const newCollection = Object.assign(
        {},
        prevState.newCollection,
        collectionDetails
      )
      return { newCollection }
    })
  }

  render () {
    const { collections, searchCollections } = this.props
    const { active, newCollection, selectedCollection } = this.state

    return (
      <CollectionsModal active={active} closeFn={this.close}>
        <SelectCollection
          collections={collections}
          disabled={!selectedCollection}
          onSelect={this.onSelect}
          onSearch={searchCollections}
          onSubmit={this.addToCollection}
          selected={selectedCollection}
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
  collections: array.isRequired,
  searchCollections: func.isRequired
}

CollectionsModalContainer.defaultProps = {
  collections: [],
  searchCollections: Function.prototype
}

export default CollectionsModalContainer
