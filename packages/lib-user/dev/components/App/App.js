import oauth from 'panoptes-client/lib/oauth.js'
import { useEffect, useState } from 'react'

import { GroupStats, MyGroups, UserStats } from '@components/index.js'

function App ({
  groups = null,
  users = null
}) {
  const [loading, setLoading] = useState(false)
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    async function initAuthorization () {
      setLoading(true)

      try {
        const userAuth = await oauth.init('357ac7e0e17f6d9b05587477ca98fdb69d70181e674be8e20142e1df97a84d2d')
        setUserAuth(userAuth)
        setLoading(false)
        history.replaceState(null, document.title, location.pathname + location.search)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    initAuthorization()
  }, [])

  const login = () => oauth.signIn(window.location.origin)
  const logout = () => oauth.signOut().then(setUserAuth)

  let content = (
    <div>
      <h2>Key Components - urls (zooniverse.org/...)</h2>
      <ul>
        <li>homepage</li>
        <li>
          profile page (public) - users/[login]
          <ul>
            <li>
              <a href="./?users=[login]/stats">user stats page (private) - users/[login]/stats</a>
              <ul>
                <li>certificate - users/[login]/stats/certificate</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          groups list - TBD
          <ul>
            <li>
              <a href="./?groups=[user_group_id]">group stats page - groups/[id]</a>
              <ul>
                <li>contributors - groups/[id]/contributors</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )

  if (groups) {
    const subpaths = groups.split('/')
  
    if (subpaths[0] === '[user_group_id]') {
      content = <p>In the url query param <code>?groups=</code>, please replace <code>[user_group_id]</code> with a user group id.</p>
    } else if (subpaths[1] === 'contributors') {
      content = <p>Group contributors component goes here.</p>
    } else if (subpaths[0] === 'list') {
      content = <MyGroups authClient={oauth} />
    } else {
      const groupID = subpaths[0] || ''

      content = (
        <GroupStats
          authClient={oauth}
          groupID={groupID}
        />
      )
    }
  }

  if (users) {
    const subpaths = users.split('/')

    if (subpaths[0] === '[login]') {
      content = <p>In the url query param <code>?users=</code>, please replace <code>[login]</code> with a user login.</p>
    } else if (subpaths[1] === 'stats') {
      const login = subpaths[0] || ''

      content = (
        <UserStats
          authClient={oauth}
          login={login}
        />
      )
    }
  }

  return (
    <main>
      <header>
        <h1><a href="./">lib-user</a></h1>
        {userAuth ? (
          <button onClick={logout}>
            Logout
          </button>
        ) : (
          <button onClick={login}>
            Login
          </button>
        )}
      </header>
      {loading ? 
        <p>Loading...</p> : (
        <div>
          {content}
        </div>
      )}
    </main>
  )
}

export default App

// Other key users components - urls (zooniverse.org/...):
// <li>favorites (public) - users/[login]/favorites</li>
// <li>collections (public) - users/[login]/collections</li>
// <li>comments (public) - users/[login]/comments</li>
// <li>groups (private) - users/[login]/groups</li>
// <li>projects (private) - users/[login]/projects</li>
