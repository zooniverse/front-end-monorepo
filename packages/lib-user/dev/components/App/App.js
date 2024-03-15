import zooTheme from '@zooniverse/grommet-theme'
import { env } from '@zooniverse/panoptes-js'
import { Grommet } from 'grommet'
import oauth from 'panoptes-client/lib/oauth.js'
import { string } from 'prop-types'
import { useEffect, useState } from 'react'

import { GroupStats, MyGroups, UserStats } from '@components'

import { usePanoptesUser } from '@hooks'

function appId(env) {
  switch (env) {
    case 'production':
      return 'ad735ef9c05fd4e68878b938565d04805ec701f83d9e78c03f9b65ab2a5fcdf9'
    default:
      return '357ac7e0e17f6d9b05587477ca98fdb69d70181e674be8e20142e1df97a84d2d'
  }
}

function App({
  groups = null,
  users = null
}) {
  const [loading, setLoading] = useState(false)
  const [userAuth, setUserAuth] = useState(null)
  const [dark, setDarkTheme] = useState(false)

  const { data: user, error, isLoading: userLoading } = usePanoptesUser(oauth)

  useEffect(() => {
    async function initUserAuth() {
      setLoading(true)
  
      try {
        const userAuth = await oauth.init(appId(env))
        setUserAuth(userAuth)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    };
  
    window.addEventListener('load', initUserAuth);

    return () => {
      window.removeEventListener('load', initUserAuth);
    };
  }, [])

  const login = () => oauth?.signIn(window?.location?.origin)
  const logout = () => oauth?.signOut().then(setUserAuth)

  const userSubpath = user?.login ? user.login : '[login]'

  let content = (
    <div>
      <h2>url - Key Components</h2>
      <ul>
        <li>zooniverse.org - homepage</li>
        <ul>
          <li>
            /users/[login] - user profile page
            <ul>
              <li>
                <a href={`./?users=${userSubpath}/stats`}>/stats - user stats page</a>
                <ul>
                  <li>/certificate - Volunteer Certificate</li>
                </ul>
              </li>
              <li>
                <a href={`./?users=${userSubpath}/groups`}>/groups - my groups</a>
              </li>
            </ul>
          </li>
          <li>
            /groups
            <ul>
              <li>
                <a href="./?groups=[user_group_id]">/groups/[groupId] - group stats page</a>
                <ul>
                  <li>/contributors - Full Group Stats</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </ul>
    </div>
  )

  if (groups) {
    const subpaths = groups.split('/')
  
    if (subpaths[0] === '[user_group_id]') {
      content = <p>In the url query param <code>?groups=</code>, please replace <code>[user_group_id]</code> with a user group id.</p>
    } else if (subpaths[1] === 'contributors') {
      content = <p>Group contributors component goes here.</p>
    } else {
      const groupId = subpaths[0] || ''

      content = (
        <GroupStats
          authClient={oauth}
          groupId={groupId}
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
    } else if (subpaths[1] === 'groups') {
      content = <MyGroups authClient={oauth} />
    } else {
      content = <p>User profile page goes here.</p>
    }
  }

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
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
          <label>
            Dark Theme
            <input
              name='theme-toggle'
              onChange={() => setDarkTheme(!dark)}
              type="checkbox"
              value={!dark}
            >
            </input>
          </label>
        </header>
        {loading ? 
          <p>Loading...</p> : (
          <div>
            {content}
          </div>
        )}
      </main>
    </Grommet>
  )
}

App.propTypes = {
  groups: string,
  users: string
}

export default App

// Other key users components - urls (zooniverse.org/...):
// <li>favorites (public) - users/[login]/favorites</li>
// <li>collections (public) - users/[login]/collections</li>
// <li>comments (public) - users/[login]/comments</li>
// <li>projects (private) - users/[login]/projects</li>
