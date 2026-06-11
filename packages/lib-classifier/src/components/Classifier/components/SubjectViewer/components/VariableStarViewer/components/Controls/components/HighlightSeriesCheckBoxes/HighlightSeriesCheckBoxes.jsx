import PropTypes from 'prop-types'
import { Box, CheckBox } from 'grommet'
import Label from '../../../../../ScatterPlotViewer/components/Label'
import isDataSeriesHighlighted from '@viewers/helpers/isDataSeriesHighlighted'

const DEFAULT_HANDLER = () => false

function HighlightSeriesCheckBoxes (props) {
  const {
    data,
    highlightedSeries,
    setSeriesHighlight = DEFAULT_HANDLER,
  } = props

  return (
    <Box direction='column' pad='none'>
      {data.map((series, seriesIndex) => {
        const { seriesOptions } = series
        const { label } = seriesOptions
        const checked = isDataSeriesHighlighted({ highlightedSeries, seriesOptions })

        return (
          <CheckBox
            checked={checked}
            key={`${label}-${seriesIndex}`}
            label={
              <Label
                checked={checked}
                label={label}
                seriesIndex={seriesIndex}
                seriesOptions={seriesOptions}
                highlightedSeries={highlightedSeries}
              />
            }
            name='series-highlight'
            onChange={event => { setSeriesHighlight(event) }}
            type='checkbox'
            value={label}
          />
        )
      })}
    </Box>
  )
}

HighlightSeriesCheckBoxes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    seriesData: PropTypes.array,
    seriesOptions: PropTypes.object
  })).isRequired,
  highlightedSeries: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSeriesHighlight: PropTypes.func,
}

export default HighlightSeriesCheckBoxes
export { HighlightSeriesCheckBoxes }