import getCookie from '@helpers/getCookie'
import initStore from '@stores'
import { getSnapshot } from 'mobx-state-tree'

export default async function getDefaultPageProps({ params, query, req, res }) {

  // cookie is in the next.js context req object
  const mode = getCookie(req, 'mode') || null
  const dismissedAnnouncementBanner = getCookie(req, 'dismissedAnnouncementBanner') || null
  const store = initStore({
    ui: {
      dismissedAnnouncementBanner,
      mode
    }
  })

  if (params.owner && params.project) {
    const { owner, project } = params
    const projectSlug = `${owner}/${project}`
    const { env } = query
    await store.project.fetch(projectSlug, { env })
  }

  const { project, ui } = getSnapshot(store)
  const { headers, connection } = req
  const props = {
    host: generateHostUrl(headers, connection),
    initialState: {
      project,
      ui
    },
    isServer: true,
    query
  }

  return { props }
}

function generateHostUrl(headers, connection) {
  const protocol = connection.encrypted ? 'https' : 'http'
  return `${protocol}://${headers.host}`
}
