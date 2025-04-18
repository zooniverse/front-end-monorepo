import zooTheme from '@zooniverse/grommet-theme'
import { AuthModal } from '@zooniverse/react-components'
import { Grommet } from 'grommet'
import auth from 'panoptes-client/lib/auth.js'
import { func, string } from 'prop-types'
import { useEffect, useState } from 'react'

import {
  Certificate,
  Contributors,
  GroupAllProjects,
  GroupStats,
  MyGroups,
  UserHome,
  UserStats,
  UserStatsAllProjects
} from '@components'
import { getDefaultDateRange, getStatsDateString } from '../../../src/utils'

const isBrowser = typeof window !== 'undefined'
const today = new Date()
const todayUTC = getStatsDateString(today)

if (isBrowser) {
  auth.checkCurrent()
}

const DEFAULT_DATE_RANGE = getDefaultDateRange()

function App({
  endDate = DEFAULT_DATE_RANGE.endDate,
  groups = null,
  joinToken = null,
  projectId = undefined,
  startDate = DEFAULT_DATE_RANGE.startDate,
  updateQueryParams = () => true,
  users = null
}) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [dark, setDarkTheme] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function checkUserSession() {
      setLoading(true)

      try {
        const user = await auth.checkCurrent()
        setUser(user)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    auth.listen('change', checkUserSession)

    return function () {
      auth.stopListening('change', checkUserSession)
    }
  }, [])

  const selectedDateRange = { endDate, startDate }

  function openSignInModal() {
    setActiveIndex(0)
  }

  function onSignOut() {
    auth.signOut()
  }

  function closeAuthModal() {
    setActiveIndex(-1)
  }

  function setSelectedDateRange({ endDate, startDate }) {
    if (endDate === todayUTC) {
      updateQueryParams([
        ['end_date', null],
        ['start_date', startDate]
      ])
    } else {
      updateQueryParams([
        ['end_date', endDate],
        ['start_date', startDate]
      ])
    }
  }

  function setSelectedProject(selectedProjectId) {
    if (selectedProjectId === 'AllProjects') {
      updateQueryParams([['project_id', null]])
    } else {
      updateQueryParams([['project_id', selectedProjectId]])
    }
  }

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
                  <li>
                    <a href={`./?users=${userSubpath}/stats/certificate`}>/certificate - Volunteer Certificate</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href={`./?users=${userSubpath}/groups`}>/groups - my groups</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="./?groups=[user_group_id]">/groups/[groupId] - group stats page</a>
            <ul>
              <li>
                <a href="./?groups=[user_group_id]/contributors">/contributors - full group stats page</a>
              </li>
            </ul>
          </li>
        </ul>
      </ul>
      {user?.id ? <UserHome authUser={user} /> : null}
    </div>
  )

  if (groups) {
    const subpaths = groups.split('/')
    const groupId = subpaths[0] || ''

    if (subpaths[0] === '[user_group_id]') {
      content = <p>In the url query param <code>?groups=</code>, please replace <code>[user_group_id]</code> with a user group id.</p>
    } else if (subpaths[1] === 'contributors') {
      content = (
        <Contributors
          authUser={user}
          groupId={groupId}
          joinToken={joinToken}
        />
      )
    } else if (subpaths[1] === 'projects') {
      content = (
        <GroupAllProjects
          authUser={user}
          groupId={groupId}
          joinToken={joinToken}/>
      )
    } else {
      content = (
        <GroupStats
          authUser={user}
          groupId={groupId}
          joinToken={joinToken}
          selectedDateRange={selectedDateRange}
          selectedProject={projectId}
          setSelectedDateRange={setSelectedDateRange}
          setSelectedProject={setSelectedProject}
        />
      )
    }
  }

  if (users) {
    const subpaths = users.split('/')
    const login = subpaths[0] || ''

    if (login === '[login]') {
      content = <p>In the url query param <code>?users=</code>, please replace <code>[login]</code> with a user login.</p>
    } else if (subpaths[1] === 'stats') {
      if (subpaths[2] === 'certificate') {
        content = (
          <Certificate
            authUser={user}
            login={login}
            selectedDateRange={selectedDateRange}
            selectedProject={projectId}
          />
        )
      } else {
        content = (
          <UserStats
            authUser={user}
            login={login}
            selectedDateRange={selectedDateRange}
            selectedProject={projectId}
            setSelectedDateRange={setSelectedDateRange}
            setSelectedProject={setSelectedProject}
          />
        )
      }
    } else if (subpaths[1] === 'groups') {
      content = (
        <MyGroups
          authUser={user}
          login={login}
        />
      )
    } else if (subpaths[1] === 'projects') {
      content = (
        <UserStatsAllProjects
          authUser={user}
          login={login}
        />
      )
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
      <div>
        <AuthModal
          activeIndex={activeIndex}
          closeModal={closeAuthModal}
          onActive={setActiveIndex}
        />
        <header className='dev-app-header'>
          <p>
            <a href='/'>lib-user - dev app</a>
          </p>
          {user?.id ? (
            <>
              <span>{user?.login}</span>
              <button onClick={onSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={openSignInModal}>Sign In</button>
            </>
          )}
          <div>
            <label htmlFor='dark-theme-toggle'>Dark Theme</label>
            <input
              id='dark-theme-toggle'
              type='checkbox'
              checked={dark}
              onChange={() => setDarkTheme(!dark)}
            />
          </div>
        </header>
        {loading ?
          <p>Loading...</p> : (
          <div>
            {content}
          </div>
        )}
      </div>
    </Grommet>
  )
}

App.propTypes = {
  endDate: string,
  groups: string,
  joinToken: string,
  projectId: string,
  startDate: string,
  updateQueryParams: func,
  users: string
}

export default App

// Other key users components - urls (zooniverse.org/...):
// <li>favorites (public) - users/[login]/favorites</li>
// <li>collections (public) - users/[login]/collections</li>
// <li>comments (public) - users/[login]/comments</li>
// <li>projects (private) - users/[login]/projects</li>
