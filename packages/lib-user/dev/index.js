import { createRoot } from 'react-dom/client'

import { GroupStats, UserStats } from '../src/index.js'

const App = () => {
  return (
    <div>
      <h1>lib-user</h1>
      <GroupStats />
      <UserStats />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
