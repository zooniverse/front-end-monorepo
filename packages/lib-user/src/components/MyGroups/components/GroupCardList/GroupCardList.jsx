import { arrayOf, shape, string } from 'prop-types'

import GroupCardContainer from '../GroupCard/GroupCardContainer'

function GroupCardList({
  groups = []
}) {
  return (
    <>
      {groups.map(group => (
        <GroupCardContainer
          key={group.id}
          displayName={group.display_name}
          id={group.id}
          role={group.roles[0]}
        />
      ))}
    </>
  )
}

GroupCardList.propTypes = {
  groups: arrayOf(shape({
    display_name: string,
    id: string,
    roles: arrayOf(string)
  }))
}

export default GroupCardList
