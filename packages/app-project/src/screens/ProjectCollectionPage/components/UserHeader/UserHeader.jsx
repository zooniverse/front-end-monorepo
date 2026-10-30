import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { Trans, useTranslation } from 'next-i18next/pages'
import { shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'
import { usePanoptesUsers } from '@hooks'
import Avatar from '@shared/components/Avatar'

const StyledOwnerLink = styled(Anchor)`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  text-decoration: none;
`

const StyledCollectionsLink = styled(Anchor)`
  flex-shrink: 0;
  font-weight: 500;
`

function UserHeader({ collection, projectSlug }) {
  const { t } = useTranslation('screens')
  const size = useContext(ResponsiveContext)

  const ownerId = collection?.links?.owner?.id
  
  const { data: users, isLoading, error } = usePanoptesUsers(ownerId ? { id: ownerId } : null)
  
  const owner = users?.find(user => user.id === ownerId) || collection?.links?.owner

  if (!owner?.login) {
    return error || !isLoading ? (
      <Text>{t('Collection.ownerLoadError')}</Text>
    ) : null
  }

  return (
    <Box
      align='center'
      alignSelf={size === 'small' ? 'center' : undefined}
      direction='row'
      justify='between'
      gap='medium'
      height={{ min: '50px' }}
    >
      <StyledOwnerLink
        href={addQueryParams(`/projects/${projectSlug}/users/${owner.login}`)}
      >
        <Avatar
          alt=''
          src={owner.avatar_src || 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'}
        />
        <Box justify='center'>
          <Text
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='1rem'
            weight='600'
          >
            {owner.display_name}
          </Text>
          <Text
            color={{ dark: 'neutral-6', light: 'dark-5' }}
            size='xsmall'
            uppercase={false}
            weight='normal'
          >
            @{owner.login}
          </Text>
        </Box>
      </StyledOwnerLink>
      {size !== 'small' ? (
        <Trans
          components={{
            collectionsLink: (
              <StyledCollectionsLink
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                href={addQueryParams(`/collections/${owner.login}`)}
                size='1rem'
              />
            )
          }}
          i18nKey='Collection.seeAllOwnerCollections'
          ns='screens'
          values={{ displayName: owner.display_name }}
        />
      ) : null}
    </Box>
  )
}

UserHeader.propTypes = {
  collection: shape({
    links: shape({
      owner: shape({
        id: string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  projectSlug: string.isRequired
}

export default UserHeader
