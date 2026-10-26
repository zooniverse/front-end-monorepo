import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, Heading, Text } from 'grommet'
import { oneOf, shape, string } from 'prop-types'
import { Trans } from 'next-i18next/pages'

import addQueryParams from '@helpers/addQueryParams'

function CollectionHeader({
  collection,
  collectionRole,
  projectDisplayName,
  projectSlug
}) {
  const roleBackground = collectionRole === 'owner' ? 'neutral-2' : 'accent-1'

  return (
    <Box height='100px' pad={{ top: '45px'}}>
      <Box
        align='center'
        direction='row'
        gap='small'
      >
        <Heading
          color={{ dark: 'neutral-6', light: 'dark-4' }}
          level={2}
          size='2rem'
        >
          {collection.display_name}
        </Heading>
        {collectionRole && (
          <Box
            align='center'
            background={roleBackground}
            height='18px'
            justify='center'
            round='xsmall'
            width='90px'
          >
            <SpacedText
              color='black'
              size='9px'
              weight='bold'
            >
              {collectionRole}
            </SpacedText>
          </Box>
        )}
      </Box>
      <Text
        color={{ dark: 'neutral-6', light: 'dark-5' }}
        margin={{ top: 'xsmall' }}
      >
        <Trans
          components={{
            projectLink: (
              <Anchor
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                href={addQueryParams(`/projects/${projectSlug}/collections`)}
                weight='500'
              />
            )
          }}
          i18nKey='Collection.linkedToProjectCollections'
          ns='screens'
          values={{ projectName: projectDisplayName }}
        />
      </Text>
    </Box>
  )
}

CollectionHeader.propTypes = {
  collection: shape({
    display_name: string.isRequired
  }).isRequired,
  collectionRole: oneOf(['owner', 'collaborator', 'contributor', 'viewer']),
  projectDisplayName: string.isRequired,
  projectSlug: string.isRequired
}

export default CollectionHeader
