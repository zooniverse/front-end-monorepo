import { projects } from '@zooniverse/panoptes-js'
import fetchWorkflowsHelper from '@helpers/fetchWorkflowsHelper'
import getDefaultPageProps from '@helpers/getDefaultPageProps'

export async function getServerSideProps({ params, query, req, res }) {
  const { props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { project } = defaultProps.initialState
  const { env } = query
  const language = project.primary_language
  const { active_workflows, default_workflow } = project.links
  const workflows = await fetchWorkflowsHelper(language, active_workflows, default_workflow, env)
  const props = Object.assign({}, { workflows }, defaultProps)
  return ({ props })
}