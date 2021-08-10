import { Heading } from 'grommet'

export default function Index() {
  return (
    <div>
      <Heading><code>project</code> app</Heading>
      <p>This app handles all project-specific routes, i.e. all routes under <code>/projects/[owner]/[project-name]</code>.</p>
    </div>
  )
}
