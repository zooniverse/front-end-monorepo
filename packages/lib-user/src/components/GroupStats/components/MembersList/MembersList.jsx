import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useTranslation } from '@translations/i18n'

import { Pagination } from '@components/shared'

import MemberListItem from './components/MemberListItem'

const DEFAULT_HANDLER = () => true
const DEFAULT_PAGINATION_PROPS = {
  numberItems: 1,
  onChange: DEFAULT_HANDLER,
  page: 1,
  step: 1
}

function MembersList({
  authUserId = '',
  handleDeleteMembership = DEFAULT_HANDLER,
  handleUpdateMembership = DEFAULT_HANDLER,
  memberships = [],
  paginationProps = DEFAULT_PAGINATION_PROPS,
  users = []
}) {
  const { t } = useTranslation()
  return (
    <Box
      margin={{ vertical: 'small' }}
    >
      <SpacedText
        color={{ dark: 'neutral-6', light: 'neutral-7' }}
        size='1rem'
        uppercase={false}
      >
        {t('GroupStats.MembersList.title')}
      </SpacedText>
      <SpacedText
        margin={{ top: 'xxsmall' }}
        size='0.8rem'
        uppercase={false}
      >
        {t('GroupStats.MembersList.warning')}
      </SpacedText>
      <Box
        as='ul'
        border={[{ color: 'light-5', size: '1px', style: 'solid' }]}
        height='small'
        margin={{ top: 'xsmall' }}
        overflow={{ vertical: 'auto' }}
        round='4px'
      >
        {memberships?.map(membership => {
          const user = users?.find(user => user.id === membership.links.user)
          const role = membership.roles[0]
          const disabled = authUserId === user?.id

          return (
            <MemberListItem
              key={membership.id}
              disabled={disabled}
              handleDelete={handleDeleteMembership}
              handleUpdate={handleUpdateMembership}
              membershipId={membership.id}
              role={role}
              user={user}
            />
          )
        })}
      </Box>
      {paginationProps.numberItems > paginationProps.step ? (
        <Pagination
          alignSelf='center'
          {...paginationProps}
        />
      ) : null}
    </Box>
  )
}

MembersList.propTypes = {
  authUserId: string,
  handleDeleteMembership: func,
  handleUpdateMembership: func,
  memberships: arrayOf(shape({
    id: string,
    roles: arrayOf(string)
  })),
  paginationProps: shape({
    numberItems: number,
    onChange: func,
    page: number,
    step: number
  }),
  users: arrayOf(shape({
    id: string
  }))
}

export default MembersList
