import { Box, ResponsiveContext, Text } from 'grommet'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import SpacedText from '@zooniverse/react-components/SpacedText'
import AnimatedNumber from '@zooniverse/react-components/AnimatedNumber'

import { useTotalClassificationCount, useTotalVolunteerCount } from './hooks'

const ClassificationsLabel = styled(Box)`
  background: linear-gradient(
    to right,
    rgba(240, 178, 0, 0.4) 0%,
    rgba(240, 178, 0, 1) 25%,
    rgba(240, 178, 0, 1) 75%,
    rgba(240, 178, 0, 0.4) 100%
  );
`

const VolunteersLabel = styled(Box)`
  background: linear-gradient(
    to right,
    rgba(0, 93, 105, 0.4) 0%,
    rgba(0, 93, 105, 1) 25%,
    rgba(0, 93, 105, 1) 75%,
    rgba(0, 93, 105, 0.4) 100%
  );
`

const Stat = styled(Box)`
  overflow: hidden;

  &.classifications {
    background: rgba(240, 178, 0, 0.1); // matches ClassfiicationsLabel
    border: solid 1px ${props => props.theme.global.colors['neutral-2']};
  }

  &.volunteers {
    background: rgba(0, 93, 105, 0.1); // matches VolunteersLabel
    border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  }
`

/*
  We have to manually add some legacy (static) stats to the UI.
  These numbers are not included in the fetch response for
  total volunteers or classifications.
  https://github.com/zooniverse/Panoptes-Front-End/pull/7167
*/
const PREPANOPTES_COUNT = 25284786 // classifications
const OUROBOROS_USER_COUNT = 114576 // volunteers

export default function Stats() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const numberFontSize = size !== 'small' ? '5rem' : '2.5rem'

  const { data: classifications } = useTotalClassificationCount()

  const { data: volunteers } = useTotalVolunteerCount()

  const totalClassifications = classifications + PREPANOPTES_COUNT
  const totalVolunteers = volunteers + OUROBOROS_USER_COUNT

  return (
    <Box gap='medium'>
      <Stat className='classifications' round='8px' elevation='small'>
        <Text
          color={{ light: 'neutral-2' }}
          size={numberFontSize}
          textAlign='center'
        >
          {classifications && <AnimatedNumber value={totalClassifications} />}
        </Text>
        <ClassificationsLabel>
          <SpacedText color='white' weight='bold' textAlign='center'>
            {t('AboutPage.ourMission.stats.one')}
          </SpacedText>
        </ClassificationsLabel>
      </Stat>
      <Stat className='volunteers' round='8px' elevation='small'>
        <Text
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          size={numberFontSize}
          textAlign='center'
        >
          {volunteers && <AnimatedNumber value={totalVolunteers} />}
        </Text>
        <VolunteersLabel>
          <SpacedText color='white' weight='bold' textAlign='center'>
            {t('AboutPage.ourMission.stats.two')}
          </SpacedText>
        </VolunteersLabel>
      </Stat>
    </Box>
  )
}
