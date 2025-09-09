import { SpacedHeading } from '@zooniverse/react-components'
import { Box } from 'grommet'
import Link from 'next/link'
import { number, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'

import { TitledStat } from '@components/shared'

const StyledListItem = styled.li`
  border-radius: 8px;
  list-style: none;
  width: clamp(385px, 100%, 564px);

  &:hover, &:focus-within {
    box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.25);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover, &:focus {
    text-decoration: none;
    outline: none;
    box-shadow: none;
  }
`

const StyledRole = styled(Box)`
  font-size: 9px;
  letter-spacing: 0.9px;
  display: flex;
  align-items: center;
  width: 90px;
  line-height: normal;
  padding: 5px 0;
  text-transform: uppercase;
  font-weight: bold;
  ${props =>
    css`
      color: ${props.theme.global.colors.black};
    `}
`

function GroupCard({
  classifications = 0,
  contributors = 0, // members
  displayName = '',
  hours = 0,
  id = '',
  projects = 0,
  role = ''
}) {
  const { t } = useTranslation()
  return (
    <StyledListItem>
      <StyledLink
        href={`/groups/${id}`}
      >
        <Box
          pad='20px'
        >
          <Box
            align='center'
            direction='row'
            gap='small'
          >
            <SpacedHeading
              color={{ light: 'neutral-1', dark: 'accent-1' }}
              size='1rem'
            >
              {displayName}
            </SpacedHeading>
            <StyledRole
              round='xsmall'
              background={role === 'group_admin' ? 'neutral-2' : 'accent-1'}
            >
              {role === 'group_admin' ? t('MyGroups.GroupCard.admin') : t('MyGroups.GroupCard.member')}
            </StyledRole>
          </Box>
          <Box
            direction='row'
            justify='between'
          >
            <TitledStat
              title={t('common.classifications')}
              value={classifications}
            />
            <TitledStat
              title={t('common.hours')}
              value={hours}
            />
            <TitledStat
              title={t('common.contributors')}
              value={contributors}
            />
            <TitledStat
              title={t('common.projects')}
              value={projects}
            />
          </Box>
        </Box>
      </StyledLink>
    </StyledListItem>
  )
}

GroupCard.propTypes = {
  classifications: number,
  contributors: number,
  displayName: string,
  hours: number,
  id: string,
  projects: number,
  role: string
}

export default GroupCard
