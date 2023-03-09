import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import { useSubjectJSON } from '@hooks'
import BarChartViewer from './BarChartViewer'
import locationValidator from '../../helpers/locationValidator'

const DEFAULT_HANDLER = () => true
const SUBJECT = {
  id: '',
  locations: []
}

export function BarChartViewerContainer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject = SUBJECT
}) {
  const { data: jsonData, viewer } = useSubjectJSON({ onError, onReady, subject })

  if (!subject.id) {
    return null
  }

  if (!jsonData) {
    return null
  }

  const {
    data,
    chartOptions: {
      margin,
      xAxisLabel,
      yAxisLabel
    }
  } = jsonData

  return (
    <BarChartViewer
      data={data}
      margin={margin}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
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
