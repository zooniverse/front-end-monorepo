export default function DataSeriesControls ({
  fullData,
  indexesToHide = [],
  toggleIndex = DEFAULT_HANDLER
}) {
  if (!fullData) return null

  function onCheckboxChange (event) {
    const index = parseInt(event?.currentTarget?.dataset?.index)
    if (!Number.isNaN(index)) toggleIndex(index)
  }

  return (
    <ul className='ScatterPlotViewer-DataSeriesControls'>
      {fullData?.map((dataSeries, index) => (
        <li key={`data-series-${index}`}>
          <input type='checkbox'
            data-index={index}
            checked={!indexesToHide.includes(index)}
            onChange={onCheckboxChange}
          />
          <label>{dataSeries.seriesOptions?.label?.trim() || `series ${index+1}`}</label>
        </li>
      ))}
    </ul>
  )
}