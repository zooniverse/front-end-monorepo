import { arrayOf, object, shape, string } from 'prop-types'

import GroupCard from '../GroupCard'

function GroupCardList({
  authClient,
  authUserId,
  groups = []
}) {
  return (
    <>
      {groups.map(group => (
        <GroupCard
          key={group.id}
          authClient={authClient}
          authUserId={authUserId}
          displayName={group.display_name}
          id={group.id}
          role={group.roles[0]}
        />
      ))}
    </>
  )
}

GroupCardList.propTypes = {
  authClient: object,
  authUserId: string,
  groups: arrayOf(shape({
    display_name: string,
    id: string,
    roles: arrayOf(string)
  }))
}

export default GroupCardList
