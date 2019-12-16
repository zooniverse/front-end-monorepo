import React from 'react'
import { Heading } from 'grommet'
import StandardLayout from '@shared/components/StandardLayout'

export default () => (
  <StandardLayout>
    <div>
      <Heading><code>project</code> app</Heading>
      <p>This app handles all project-specific routes, i.e. all routes under <code>/projects/[owner]/[project-name]</code>.</p>
    </div>
  </StandardLayout>
)
