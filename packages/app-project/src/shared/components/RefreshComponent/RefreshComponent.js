import React from 'react'
import { Grid, Heading } from 'grommet'

function RefreshComponent () {
  if (process.env.NODE_ENV === 'production') {
    if (process.browser) {
      window.location.reload()
    }
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return (
      <Grid gap='medium' margin='medium'>
        <Heading>
          This page isn't built yet!
      </Heading>
        <div>
          You're in development mode (<code>NODE_ENV !== 'production'</code>), so you're seeing this message. In production, this component will trigger a full-page refresh, allowing the route to be picked up by PFE.
      </div>
      </Grid>
    )
  }
}

export default RefreshComponent
