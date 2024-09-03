import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { SubtractCircle } from 'grommet-icons'
import { bool, func, string } from 'prop-types'

import { HeaderButton } from '@components/shared'

const DEFAULT_HANDLER = () => true

function DeactivatedGroup({
  deleteMembership = DEFAULT_HANDLER,
  deleteMembershipLoading = false,
  membershipId
}) {
  async function handleGroupMembershipLeave ({
    membershipId
  }) {
    await deleteMembership({ membershipId }, {
      revalidate: true
    })
  
    window.location.href = '/'
  }

  return (
    <Box
      align='center'
      direction='column'
      gap='medium'
    >
      <SpacedText uppercase={false}>
        This is a deactivated group.
        Please leave the group or contact the group administrator if you believe this is an error.
      </SpacedText>
      {deleteMembershipLoading ? (
        <Loader />
      ) : (
        <HeaderButton
          key='leave-group-button'
          icon={<SubtractCircle color='white' size='small' />}
          label='Leave Group'
          onClick={() => handleGroupMembershipLeave({
            membershipId,
          })}
        />
      )}
    </Box>
  )
}

DeactivatedGroup.propTypes = {
  deleteMembership: func,
  deleteMembershipLoading: bool,
  membershipId: string.isRequired
}

export default DeactivatedGroup
