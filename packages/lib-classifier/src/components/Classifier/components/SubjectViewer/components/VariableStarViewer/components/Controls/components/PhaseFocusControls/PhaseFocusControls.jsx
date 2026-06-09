import PropTypes from 'prop-types'
import { Box, RadioButton } from 'grommet'
import { useTranslation } from '@translations/i18n'

import Label from '../../../../../ScatterPlotViewer/components/Label'

const DEFAULT_HANDLER = () => false

function PhaseFocusControls(props) {
  const {
    data,
    highlightedSeries,
    phaseFocusedSeries,
    setSeriesPhaseFocus = DEFAULT_HANDLER,
  } = props

  const { t } = useTranslation('components')

  return (
    <Box direction='column' pad='none'>
      {data.map((series, seriesIndex) => {
        const { seriesOptions } = series
        const checked = phaseFocusedSeries === seriesIndex
        const label = seriesOptions?.label || t('SubjectViewer.VariableStarViewer.label', { id: seriesIndex + 1 })

        return (
          <RadioButton
            checked={checked}
            key={`${label}-${seriesIndex}`}
            label={
              <Label
                highlightedSeries={highlightedSeries}
                seriesIndex={seriesIndex}
                seriesOptions={seriesOptions}
                label={label}
                visible={true}
              />
            }
            name='series-phase-focus'
            onChange={event => { setSeriesPhaseFocus(event) }}
            type='radio'
            value={seriesIndex.toString()}
          />
        )
      })}
    </Box>
  )
}

PhaseFocusControls.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    seriesData: PropTypes.array,
    seriesOptions: PropTypes.object
  })).isRequired,
  phaseFocusedSeries: PropTypes.number.isRequired,
  setSeriesPhaseFocus: PropTypes.func,
}

export default PhaseFocusControls
export { PhaseFocusControls }
