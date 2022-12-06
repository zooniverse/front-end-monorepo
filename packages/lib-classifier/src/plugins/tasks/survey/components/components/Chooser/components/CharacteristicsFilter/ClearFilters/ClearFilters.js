import { Box } from 'grommet'
import { Clear } from 'grommet-icons'
import PropTypes from 'prop-types'
import { PlainButton, SpacedText } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

const defaultHandler = () => true
export default function ClearFilters ({
  handleFilter = defaultHandler,
  showingChoices = 0,
  totalChoices = 0
}) {
  const { t } = useTranslation('plugins')

  function onClick() {
    handleFilter()
  }

  return (
    <Box
      align='center'
      direction='row'
      fill='horizontal'
      gap='xxsmall'
      justify='center'
      pad={{ top: 'xsmall' }}
    >
      <SpacedText>
        {t('SurveyTask.CharacteristicsFilter.showing', { showing: showingChoices, total: totalChoices })}
      </SpacedText>
      <PlainButton
        disabled={showingChoices === totalChoices}
        icon={<Clear aria-hidden='true' />}
        onClick={onClick}
        text={t('SurveyTask.CharacteristicsFilter.clearFilters')}
      />
    </Box>
  )
}

ClearFilters.propTypes = {
  handleFilter: PropTypes.func,
  showingChoices: PropTypes.number,
  totalChoices: PropTypes.number
}
