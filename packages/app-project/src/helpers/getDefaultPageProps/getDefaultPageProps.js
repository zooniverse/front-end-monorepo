import getCookie from '@helpers/getCookie'
import initStore from '@stores'
import { getSnapshot } from 'mobx-state-tree'

export default async function getDefaultPageProps({ params, query, req, res }) {

  // cookie is in the next.js context req object
  const mode = getCookie(req, 'mode') || null
  const dismissedAnnouncementBanner = getCookie(req, 'dismissedAnnouncementBanner') || null
  const store = initStore(true, {
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
  const props = {
    initialState: {
      project,
      ui
    }
  }

  return { props }
}
