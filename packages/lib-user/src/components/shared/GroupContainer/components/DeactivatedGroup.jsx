import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { SubtractCircle } from 'grommet-icons'
import { bool, func, string } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { HeaderButton } from '@components/shared'
import { getHrefWithLocale } from '@utils'

const DEFAULT_HANDLER = () => true

function DeactivatedGroup({
  deleteMembership = DEFAULT_HANDLER,
  deleteMembershipLoading = false,
  membershipId
}) {
  const { i18n, t } = useTranslation()
  const locale = i18n.language
  async function handleGroupMembershipLeave ({
    membershipId
  }) {
    await deleteMembership({ membershipId }, {
      revalidate: true
    })

    window.location.href = getHrefWithLocale('/', locale)
  }

  return (
    <Box
      align='center'
      direction='column'
      gap='medium'
    >
      <SpacedText uppercase={false}>
        {t('GroupContainer.deactivated')}
      </SpacedText>
      {deleteMembershipLoading ? (
        <Loader />
      ) : (
        <HeaderButton
          key='leave-group-button'
          icon={<SubtractCircle color='white' size='small' />}
          label={t('GroupContainer.leaveGroup')}
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
