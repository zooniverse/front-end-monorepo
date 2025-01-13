import { SpacedText, ZooniverseLogo } from '@zooniverse/react-components'
import { Box, ResponsiveContext } from 'grommet'
import { number, string } from 'prop-types'
import { useContext } from 'react'
import { useTranslation } from '../../../translations/i18n.js'

import {
  Avatar,
  TitledStat
} from '@components/shared'

function ProfileHeader({
  avatar = '',
  classifications = undefined,
  contributors = undefined,
  displayName = '',
  hours = undefined,
  login = '',
  projects = undefined
}) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  return (
    <Box
      align='center'
      direction={size === 'small' ? 'column' : 'row'}
      gap='small'
      justify={size === 'small' ? 'center' : 'between'}
    >
      <Box
        direction='row'
        gap='small'
      >
        {avatar ?
          <Avatar
            src={avatar}
            alt={`${login} avatar`}
          />
          : <ZooniverseLogo id='GroupZooniverseLogo' size='50px' color='#00979d' />}
        <Box
          align={size === 'small' ? 'start' : 'center'}
          direction={size === 'small' ? 'column' : 'row'}
          justify='center'
          gap={size === 'small' ? 'none' : 'small'}
        >
          <SpacedText
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='large'
            weight='bold'
          >
            {displayName}
          </SpacedText>
          {login ?
            <SpacedText
              uppercase={false}
            >
              @{login}
            </SpacedText>
            : null}
        </Box>
      </Box>
      <Box
        align='center'
        direction='row'
        gap='small'
      >
        {classifications !== undefined ?
          <TitledStat
            title={t('common.classifications')}
            value={classifications}
          />
          : null}
        {hours !== undefined ?
          <TitledStat
            title={t('common.hours')}
            value={hours}
          />
          : null}
        {contributors !== undefined ?
          <TitledStat
            title={t('common.contributors')}
            value={contributors}
          />
          : null}
        {projects !== undefined ?
          <TitledStat
            title={t('common.projects')}
            value={projects}
          />
          : null}
      </Box>
    </Box>
  )
}

ProfileHeader.propTypes = {
  avatar: string,
  classifications: number,
  contributors: number,
  displayName: string,
  hours: number,
  login: string,
  projects: number
}

export default ProfileHeader
