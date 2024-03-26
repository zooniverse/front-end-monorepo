import { Grid } from 'grommet'
import { node } from 'prop-types'

function MyGroups({
  children
}) {
  return (
    <Grid
      as='ul'
      columns={{
        count: 2,
        size: 'auto'
      }}
      gap={{ row: '20px', column: '40px' }}
      pad='none'
    >
      {children}
    </Grid>
  )
}

MyGroups.propTypes = {
  children: node
}

export default MyGroups
