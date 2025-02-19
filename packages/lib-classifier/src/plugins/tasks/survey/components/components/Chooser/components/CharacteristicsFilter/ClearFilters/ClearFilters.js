import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { PlainButton, SpacedText } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

const DEFAULT_HANDLER = () => true

export default function ClearFilters ({
  onClick = DEFAULT_HANDLER,
  showingChoices = 0,
  totalChoices = 0
}) {
  const { t } = useTranslation('plugins')

  return (
    <Box
      align='center'
      direction='row'
      fill='horizontal'
      gap='xxsmall'
      justify='between'
    >
      <SpacedText
        size='0.75rem'
      >
        {t('SurveyTask.CharacteristicsFilter.showing', { showing: showingChoices, total: totalChoices })}
      </SpacedText>
      <PlainButton
        color={{
          dark: 'neutral-6',
          light: 'dark-5'
        }}
        disabled={showingChoices === totalChoices}
        labelSize='0.75rem'
        onClick={onClick}
        text={t('SurveyTask.CharacteristicsFilter.clearFilters')}
      />
    </Box>
  )
}

ClearFilters.propTypes = {
  onClick: PropTypes.func,
  showingChoices: PropTypes.number,
  totalChoices: PropTypes.number
}
