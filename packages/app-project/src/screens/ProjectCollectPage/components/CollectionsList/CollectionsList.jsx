import { CollectionCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, bool, object } from 'prop-types'
import styled from 'styled-components'

const StyledList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  margin: 0 0 20px;
  list-style: none;
  column-gap: 30px;
  row-gap: 30px;
`

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.4;
`

function LoadingOverlay() {
  return (
    <StyledBox
      aria-hidden='true'
      background={{ light: 'neutral-6', dark: 'dark-3' }}
      data-testid='collections-loading-overlay'
      fill
    />
  )
}

function CollectionsList({ collections, isLoading = false }) {
  return (
    <StyledList aria-busy={isLoading}>
      {isLoading ? <LoadingOverlay /> : null}
      {collections.map(collection => (
        <li key={collection.id}>
          <CollectionCard collection={collection} />
        </li>
      ))}
    </StyledList>
  )
}

CollectionsList.propTypes = {
  collections: arrayOf(object).isRequired,
  isLoading: bool
}

export default CollectionsList
