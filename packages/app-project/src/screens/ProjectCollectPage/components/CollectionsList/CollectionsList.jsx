import { CollectionCard } from '@zooniverse/react-components'
import { arrayOf, object } from 'prop-types'
import styled from 'styled-components'

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
`

function CollectionsList({ collections }) {
  return (
    <List>
      {collections.map(collection => (
        <li key={collection.id || collection.slug}>
          <CollectionCard collection={collection} />
        </li>
      ))}
    </List>
  )
}

CollectionsList.propTypes = {
  collections: arrayOf(object).isRequired
}

export default CollectionsList