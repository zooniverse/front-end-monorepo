import { CollectionCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, bool, object, string } from 'prop-types'
import styled from 'styled-components'

const StyledList = styled.ul`
  position: relative;
  column-gap: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  row-gap: 30px;
  width: 100%;
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

function CollectionsList({
  collections,
  isLoading = false,
  projectSlug
}) {
  return (
    <StyledList aria-busy={isLoading}>
      {isLoading ? <LoadingOverlay /> : null}
      {collections.map(collection => (
        <li key={collection.id}>
          <CollectionCard
            collection={collection}
            projectSlug={projectSlug}
          />
        </li>
      ))}
    </StyledList>
  )
}

CollectionsList.propTypes = {
  collections: arrayOf(object).isRequired,
  isLoading: bool,
  projectSlug: string.isRequired
}

export default CollectionsList
