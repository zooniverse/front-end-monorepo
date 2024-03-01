import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import SpacedText from '@zooniverse/react-components/SpacedText'

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

export default function Stats() {
  const { t } = useTranslation()
  return (
    <>
      <Box round='small' elevation='small'>
        <ClassificationsLabel>
          <SpacedText color='white' weight='bold' textAlign='center'>
            {t('AboutPage.ourMission.stats.one')}
          </SpacedText>
        </ClassificationsLabel>
      </Box>
      <Box round='small' elevation='small'>
        <VolunteersLabel>
          <SpacedText color='white' weight='bold' textAlign='center'>
            {t('AboutPage.ourMission.stats.two')}
          </SpacedText>
        </VolunteersLabel>
      </Box>
    </>
  )
}
