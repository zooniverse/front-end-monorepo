import { Box, Text } from 'grommet'
import { FormDown, FormUp } from 'grommet-icons'
import { bool } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const StyledText = styled(Text)`
  font-size: 0.75rem;
  width: max-content;
`

function InfoLabel({
  showInfo = false
}) {
  const { t } = useTranslation('plugins')

  return (
    <Box
      align='center'
      direction='row'
      gap='xsmall'
    >
      {showInfo ? (
        <>
          <StyledText>
            {t('SurveyTask.Choice.lessInfo')}
          </StyledText>
          <FormUp aria-hidden="true" />
        </>
      ) : (
        <>
          <StyledText>
            {t('SurveyTask.Choice.moreInfo')}
          </StyledText>
          <FormDown aria-hidden="true" />
        </>
      )}
    </Box>
  )
}

InfoLabel.propTypes = { 
  showInfo: bool
}

export default InfoLabel
