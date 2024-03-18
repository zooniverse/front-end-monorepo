import { arrayOf, func, shape, string } from 'prop-types'

import CreateGroup from './CreateGroup'

const DEFAULT_HANDLER = () => true

function MyGroups({
  groups = [],
  handleGroupCreate = DEFAULT_HANDLER
}) {
  return (
    <div>
      <h3>MyGroups</h3>
      <div>
        {groups.map((group) => {
          return (
            <div key={group.id}>
              <h4><a href={`./?groups=${group.id}`}>{group.display_name}</a></h4>
              <span>{group.roles}</span>
              <div>
                <span>Classifications X</span>
                {' | '}
                <span>Hours Y</span>
                {' | '}
                <span>Members Z</span>
                {' | '}
                <span>Projects W</span>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <CreateGroup
        handleGroupCreate={handleGroupCreate}
      />
    </div>
  )
}

MyGroups.propTypes = {
  groups: arrayOf(shape({
    display_name: string,
    id: string
  })),
  handleGroupCreate: func
}

export default MyGroups
