import { createRoot } from 'react-dom/client'

import App from './components/App'

function getQueryParams() {
  if (window.location) {
    const url = new URL(window.location)
    const { searchParams } = url
    const queryParams = {}
    searchParams.forEach((value, key) => {
      queryParams[key] = value
    })
    return queryParams
  }

  return {}
}

function updateQueryParams(newQueryParams) {
  const queryParams = new URLSearchParams(window.location.search)

  for (const [key, value] of newQueryParams) {
    if (!value) {
      queryParams.delete(key)
    } else {
      queryParams.set(key, value)
    }
  }

  window.location.search = queryParams.toString()
}

const { end_date, groups, join_token, project_id, start_date, users } = getQueryParams()
const root = createRoot(document.getElementById('root'))
root.render(
  <App
    endDate={end_date}
    groups={groups}
    joinToken={join_token}
    projectId={project_id}
    startDate={start_date}
    updateQueryParams={updateQueryParams}
    users={users}
  />
)
