import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useRef } from 'react';

import { useJSONData } from '@helpers'
import BarChartViewer from './BarChartViewer'
import locationValidator from '../../helpers/locationValidator'

const defaultSubject = {
  id: '',
  locations: []
}

export function BarChartViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject = defaultSubject
}) {
  const viewer = useRef()
  const { data, chartOptions } = useJSONData(
    subject, 
    () => onReady(viewer?.current),
    (error) => onError(error)
  )

  if (!subject.id) {
    return null
  }

  if (!data && !chartOptions) {
    return null
  }

  return (
    <BarChartViewer
      data={data}
      margin={chartOptions.margin}
      xAxisLabel={chartOptions.xAxisLabel}
      yAxisLabel={chartOptions.yAxisLabel}
    />
  )
}

BarChartViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default observer(BarChartViewerContainer)
