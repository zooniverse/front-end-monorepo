import ExternalWorkflow from './ExternalWorkflow'

export default {
  title: 'Project App / Screens / Classify / External Workflow',
  component: ExternalWorkflow,
  args: {
    description: 'This workflow runs on a **partner site**. You will classify there and your work still counts toward this project.\n\n[Learn more](https://www.zooniverse.org/about).',
    url: 'https://example.org/my-workflow'
  }
}

export function Default({ description, url }) {
  return <ExternalWorkflow description={description} url={url} />
}

export function WithoutDescription({ url }) {
  return <ExternalWorkflow url={url} />
}
