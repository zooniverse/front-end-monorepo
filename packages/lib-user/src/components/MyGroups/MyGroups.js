import { Grid, ResponsiveContext } from 'grommet'
import { node } from 'prop-types'
import { useContext } from 'react'

function MyGroups({
  children
}) {
  const size = useContext(ResponsiveContext)
  const columnCount = size === 'small' ? 1 : 2

  return (
    <Grid
      as='ul'
      columns={{
        count: columnCount,
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
