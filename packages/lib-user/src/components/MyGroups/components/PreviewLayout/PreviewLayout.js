import { Loader, SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, Paragraph } from 'grommet'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import Link from 'next/link'
import { useTranslation, Trans } from '../../../../translations/i18n.js'

import { ContentBox } from '@components/shared'
import GroupCardContainer from '../GroupCard/GroupCardContainer.js'
import CreateButton from '../CreateButton'

const DEFAULT_HANDLER = () => true

export default function PreviewLayout({
  authUser,
  groups,
  loading = false,
  handleGroupModal = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()
  return (
    <ContentBox
      linkLabel={t('common.seeAll')}
      linkProps={{ as: Link, href: `/users/${authUser?.login}/groups` }}
      title={t('MyGroups.title')}
    >
      {loading && (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      )}
      {!loading && groups?.length ? (
        <Box
          as='ul'
          align='center'
          gap='xsmall'
          margin={{ bottom: 'medium' }}
          pad='none'
        >
          {groups.slice(0, 2).map(group => (
            <GroupCardContainer
              key={group.id}
              id={group.id}
              displayName={group.display_name}
              role={group.roles[0]}
            />
          ))}
        </Box>
      ) : (
        <Box fill justify='center' align='center'>
          <Paragraph margin={{ top: '0', bottom: '20px' }} textAlign='center'>
            <Trans i18nKey='MyGroups.noGroups' components={[ <br key='line-break' />]} />
          </Paragraph>
        </Box>
      )}
      <Box direction='row' justify='between'>
        <Anchor
          href='https://blog.zooniverse.org/2024/09/17/launch-news-community-building-pages'
          color={{
            dark: 'light-4',
            light: 'dark-5'
          }}
          label={
            <SpacedText size='1rem' uppercase={false}>
              {t('MyGroups.learnMore')}
            </SpacedText>
          }
        />
        <CreateButton onClick={handleGroupModal} />
      </Box>
    </ContentBox>
  )
}

PreviewLayout.propTypes = {
  authUser: shape({
    id: string.isRequired
  }),
  groups: arrayOf(
    shape({
      display_name: string,
      id: string,
      roles: arrayOf(string)
    })
  ),
  loading: bool,
  handleGroupModal: func
}
