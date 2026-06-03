import { Box, CheckBox } from 'grommet'

const DEFAULT_HANDLER = () => {}

export default function DataSeriesControls ({
  data,
  highlightedSeries,  // Either undefined, or an array of strings
  toggleHighlightedSeries = DEFAULT_HANDLER,
}) {
  if (!data) return null

  function onCheckboxChange (event) {
    toggleHighlightedSeries(event.currentTarget?.dataset.label)
  }

  return (
    <Box className='ScatterPlotViewer-DataSeriesControls'>
      {data?.map((dataSeries, index) => {

        const label = dataSeries.seriesOptions?.label
        const labelToDisplay = label?.trim() || `series ${index+1}`  // TODO: use translations
        
        // Checkbox is checked if highlightedSeries is undefined (which means
        // _everything_ is checked), or if label is included in the
        // highlightedSeries array. 
        const checked = !highlightedSeries || highlightedSeries.includes(label)

        return (
          <CheckBox
            key={`data-series-${index}`}
            checked={checked}
            label={labelToDisplay}
            name='scatterplot-data-series'
            onChange={onCheckboxChange}
            data-label={label}
          />
        )
      })}
    </Box>
  )
}