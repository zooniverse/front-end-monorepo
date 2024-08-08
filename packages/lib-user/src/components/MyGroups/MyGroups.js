import { Grid } from 'grommet'
import { node } from 'prop-types'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  gap: 20px 40px;
  justify-items: center;
  grid-template-columns: 1fr 1fr;

  @media (width < 80rem) {
    grid-template-columns: 1fr;
  }
`

function MyGroups({
  children
}) {
  return (
    <StyledGrid
      forwardedAs='ul'
      pad='none'
    >
      {children}
    </StyledGrid>
  )
}

MyGroups.propTypes = {
  children: node
}

export default MyGroups
