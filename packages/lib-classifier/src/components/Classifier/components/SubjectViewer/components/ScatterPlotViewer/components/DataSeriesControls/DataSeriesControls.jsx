import { Box, CheckBox } from 'grommet'

export default function DataSeriesControls ({
  fullData,
  indexesToHide = [],
  theme,
  toggleIndex = DEFAULT_HANDLER
}) {
  if (!fullData) return null

  function onCheckboxChange (event) {
    const index = parseInt(event?.currentTarget?.dataset?.index)
    if (!Number.isNaN(index)) toggleIndex(index)
  }

  return (
    <Box className='ScatterPlotViewer-DataSeriesControls'>
      {fullData?.map((dataSeries, index) => {

        const checked = !indexesToHide.includes(index)
        const label = dataSeries.seriesOptions?.label?.trim() || `series ${index+1}`

        return (
          <CheckBox
            key={`data-series-${index}`}
            checked={checked}
            label={label}
            name='scatterplot-data-series'
            onChange={onCheckboxChange}
            data-index={index}
          />
        )
      })}
    </Box>
  )
}