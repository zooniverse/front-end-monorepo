import { CollectionCard } from '@zooniverse/react-components'
import { arrayOf, object } from 'prop-types'
import styled from 'styled-components'

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  column-gap: 30px;
  row-gap: 30px;
`

function CollectionsList({ collections }) {
  return (
    <StyledList>
      {collections.map(collection => (
        <li key={collection.id}>
          <CollectionCard collection={collection} />
        </li>
      ))}
    </StyledList>
  )
}

CollectionsList.propTypes = {
  collections: arrayOf(object).isRequired
}

export default CollectionsList
