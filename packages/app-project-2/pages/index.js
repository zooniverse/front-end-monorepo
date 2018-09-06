import React from 'react'
import { Heading } from 'grommet'

export default () => (
  <div>
    <Heading><code>project</code> app</Heading>
    <p>This app handles all project-specific routes, i.e. all routes under <code>/projects/[owner]/[slug]</code>.</p>
  </div>
)
