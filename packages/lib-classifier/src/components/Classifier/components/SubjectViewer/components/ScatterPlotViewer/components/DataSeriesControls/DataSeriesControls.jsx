import { Box, CheckBox } from 'grommet'
import { withTheme } from 'styled-components'
import Label from '../Label'
import { useTranslation } from 'next-i18next'

const DEFAULT_HANDLER = () => {}

function DataSeriesControls ({
  data,
  highlightedSeries,  // Either undefined, or an array of strings
  theme: {
    global: {
      colors = {
        drawingTools: {}
      }
    }
  } = {
    global: {
      colors: {
        drawingTools: {}
      }
    }
  },
  toggleHighlightedSeries = DEFAULT_HANDLER,
}) {
  const { t } = useTranslation('components')

  if (!data) return null

  function onCheckboxChange (event) {
    toggleHighlightedSeries(event.currentTarget?.dataset.label)
  }

  return (
    <Box
      className='ScatterPlotViewer-DataSeriesControls'
      direction='row'
      gap='large'
      justify='center'
      wrap={true}
    >
      {data?.map((dataSeries, index) => {

        const label = dataSeries.seriesOptions?.label
        const labelToDisplay = label?.trim() || t('SubjectViewer.ScatterPlotViewer.DataSeriesControls.label', { id: index + 1 })
        
        // Checkbox is checked if highlightedSeries is undefined (which means
        // _everything_ is checked), or if label is included in the
        // highlightedSeries array. 
        const checked = !highlightedSeries || highlightedSeries.includes(label)

        return (
          <CheckBox
            key={`data-series-${index}`}
            checked={checked}
            label={
              <Label
                colors={colors}
                checked={checked}
                label={labelToDisplay}
                seriesIndex={index}
                seriesOptions={dataSeries.seriesOptions}
                highlightedSeries={highlightedSeries}
              />
            }
            name='scatterplot-data-series'
            onChange={onCheckboxChange}
            data-label={label}
          />
        )
      })}
    </Box>
  )
}

export default withTheme(DataSeriesControls)