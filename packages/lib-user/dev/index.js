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

const { groups, join_token, users } = getQueryParams()
const root = createRoot(document.getElementById('root'))
root.render(
  <App
    groups={groups}
    joinToken={join_token}
    users={users}
  />
)
