import { panoptes } from '@zooniverse/panoptes-js'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import { logToSentry } from '@helpers/logger'

export default async function fetchProjectPages(project, env) {
  try {
    const { headers, host } = getServerSideAPIHost(env)
    // the endpoint is /project/{project.id}/pages but the returned array is project_pages.
    const response = await panoptes.get(`/projects/${project.id}/pages`, { env }, { ...headers }, host)
    const projectPages = response?.body?.project_pages || []
    /* Only the page titles and URL keys are needed
    to build the navigation menu */
    return projectPages.map(page =>{
      if (page.content?.length) {
        return ({
          id: page.id,
          title: page.title,
          url_key: page.url_key
        })
      }
    }).filter(Boolean)
  } catch (error) {
    logToSentry(error)
    return []
  }
}
