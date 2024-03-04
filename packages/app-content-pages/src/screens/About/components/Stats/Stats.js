import { Box, ResponsiveContext, Text } from 'grommet'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import SpacedText from '@zooniverse/react-components/SpacedText'
import AnimtedNumber from '@zooniverse/react-components/AnimatedNumber'

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
  }

  &.volunteers {
    background: rgba(0, 93, 105, 0.1); // matches VolunteersLabel
  }
`

/*
  We have to manually add some legacy stats to the UI.
  These numbers are not included in the fetch response for
  total volunteers or classifications.
  https://github.com/zooniverse/Panoptes-Front-End/pull/4511
*/
const GZ123_COUNT = 98989226 // classifications
const OUROBOROS_COUNT = 142800311 // classifications
const OTHERS_COUNT = 8680290 // classifications
const OUROBOROS_USER_COUNT = 124921 // volunteers

export default function Stats() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const numberFont = size !== 'small' ? '5rem' : '2.5rem'

  const { data: classifications } = useTotalClassificationCount()

  const { data: volunteers } = useTotalVolunteerCount()

  const totalClassifications = classifications + GZ123_COUNT + OUROBOROS_COUNT + OTHERS_COUNT
  const totalVolunteers = volunteers + OUROBOROS_USER_COUNT

  return (
    <Box gap='medium'>
      <Stat className='classifications' round='small' elevation='small'>
        <Text color='neutral-2' size={numberFont} textAlign='center'>
          {classifications && <AnimtedNumber value={totalClassifications} />}
        </Text>
        <ClassificationsLabel>
          <SpacedText color='white' weight='bold' textAlign='center'>
            {t('AboutPage.ourMission.stats.one')}
          </SpacedText>
        </ClassificationsLabel>
      </Stat>
      <Stat className='volunteers' round='small' elevation='small'>
        <Text color='neutral-1' size={numberFont} textAlign='center'>
          {volunteers && <AnimtedNumber value={totalVolunteers} />}
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
