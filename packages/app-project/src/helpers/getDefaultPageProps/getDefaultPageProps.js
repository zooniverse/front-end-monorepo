import getCookie from '@helpers/getCookie'
import getStaticPageProps from '@helpers/getStaticPageProps'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

export default async function getDefaultPageProps({ params, query, req }) {

  // cookie is in the next.js context req object
  const mode = getCookie(req, 'mode') || null
  const dismissedAnnouncementBanner = getCookie(req, 'dismissedAnnouncementBanner') || null

  const { props: staticProps } = await getStaticPageProps({ params, query })
  const { project, notFound, title, workflowID, workflows } = staticProps
  const host = HOSTS[environment] || 'https://localhost:3000'
  /*
    snapshot for store hydration in the browser
  */
  const initialState = {
    project,
    ui: {
      dismissedAnnouncementBanner,
      mode
    }
  }

  const props = {
    host,
    initialState,
    query,
    workflows
  }

  if (title) {
    props.title = title
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  return { notFound, props }
}
