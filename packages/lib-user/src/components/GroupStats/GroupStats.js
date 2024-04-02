import { arrayOf, func, number, shape, string } from 'prop-types'

import DeleteGroup from './DeleteGroup'
import EditGroup from './EditGroup'

const DEFAULT_GROUP = {
  display_name: '',
  id: ''
}
const DEFAULT_HANDLER = () => true
const DEFAULT_STATS = {
  active_users: 0,
  project_contributions: [
    {
      count: 0,
      project_id: 0,
      session_time: 0
    }
  ],
  time_spent: 0,
  total_count: 0
}

function GroupStats({
  group = DEFAULT_GROUP,
  groupStats = DEFAULT_STATS,
  handleGroupDelete = DEFAULT_HANDLER,
  handleGroupUpdate = DEFAULT_HANDLER
}) {
  return (
    <div>
      <h2>Hi group with ID {group?.id}! 🙌</h2>
      <h3>Your group display_name is {group?.display_name}.</h3>
      <h4>Members: <pre>{group?.links?.users?.toString()}</pre></h4>
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
  group: shape({
    display_name: string,
    id: string
  }),
  groupStats: shape({
    active_users: number,
    project_contributions: arrayOf(shape({
      count: number,
      project_id: number,
      session_time: number
    })),
    time_spent: number,
    total_count: number
  }),
  handleGroupDelete: func,
  handleGroupUpdate: func
}

export default GroupStats
