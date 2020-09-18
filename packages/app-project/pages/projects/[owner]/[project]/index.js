import { projects } from '@zooniverse/panoptes-js'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectHomePage'

async function getProjectWorkflows(project) {
  const workflows = await fetchWorkflowsHelper('en', project.links['active_workflows'], project.configuration['default_workflow'])
  return workflows
}

export async function getServerSideProps({ params, query, req, res }) {
  const { props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { project } = defaultProps.initialState
  const workflows = await getProjectWorkflows(project)
  const props = Object.assign({}, { workflows }, defaultProps)
  return ({ props })
}

