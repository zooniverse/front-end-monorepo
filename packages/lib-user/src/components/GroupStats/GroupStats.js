'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial GroupStats local development.

import { arrayOf, number, object, shape, string } from 'prop-types'

import {
  deletePanoptesUserGroup,
  getBearerToken,
  updatePanoptesUserGroup
} from '@utils'

import DeleteGroup from './DeleteGroup'
import EditGroup from './EditGroup'

function GroupStats({
  authClient= {},
  data = {
    body: {
      user_groups: []
    },
    headers: {
      etag: ''
    }
  },
  groupId = '',
  groupStats
}) {
  async function getRequestHeaders() {
    const authorization = await getBearerToken(authClient)
    const requestHeaders = {
      authorization,
      etag: data.headers.etag
    }
    return requestHeaders
  }

  async function handleGroupDelete() {
    try {
      const requestHeaders = await getRequestHeaders()
      const deleteResponse = await deletePanoptesUserGroup({
        groupId,
        headers: requestHeaders
      })
      console.log('deleteResponse', deleteResponse)
      window.location.href =  '?users=[login]/groups'
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGroupUpdate(updates) {
    try {
      const requestHeaders = await getRequestHeaders()
      const updatedGroup = await updatePanoptesUserGroup({
        updates,
        headers: requestHeaders
      })
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const group = data?.body?.user_groups?.[0]

  return (
    <div>
      <h2>Hi group with ID {groupId}! 🙌</h2>
      <h3>Your group display_name is {group?.display_name}.</h3>
      <h4>Members: <pre>{group?.links.users.toString()}</pre></h4>
      <h4>Here are your group stats:</h4>
      <pre>{JSON.stringify(groupStats, null, 2)}</pre>
      <hr />
      <EditGroup
        group={group}
        handleGroupUpdate={handleGroupUpdate}
      />
      <br />
      <hr />
      <br />
      <DeleteGroup
        handleGroupDelete={handleGroupDelete}
      />
    </div>
  )
}

GroupStats.propTypes = {
  authClient: object,
  data: shape({
    body: shape({
      user_groups: arrayOf(shape({
        display_name: string,
        id: string,
        links: shape({
          users: arrayOf(string)
        })
      }))
    }),
    headers: shape({
      etag: string
    })
  }),
  groupId: string,
  groupStats: shape({
    body: shape({
      classifications: arrayOf(shape({
        count: number,
        workflow_id: number
      })),
      user_groups: arrayOf(shape({
        count: number,
        user_group_id: number
      }))
    })
  })
}

export default GroupStats
