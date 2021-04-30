import getCookie from '@helpers/getCookie'
import getStaticPageProps from '@helpers/getStaticPageProps'

export default async function getDefaultPageProps({ params, query, req }) {

  // cookie is in the next.js context req object
  const mode = getCookie(req, 'mode') || null
  const dismissedAnnouncementBanner = getCookie(req, 'dismissedAnnouncementBanner') || null

  const { props: staticProps } = await getStaticPageProps({ params, query })
  const { project, notFound, title, workflowID, workflows } = staticProps
  const { headers, connection } = req
  const host = generateHostUrl(headers, connection)
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

function generateHostUrl(headers, connection) {
  const protocol = connection.encrypted ? 'https' : 'http'
  return `${protocol}://${headers.host}`
}
