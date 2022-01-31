import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

import BarChartViewer from './BarChartViewer'
import locationValidator from '../../helpers/locationValidator'

const defaultSubject = {
  id: '',
  locations: []
}

function getSubjectUrl(subject) {
  // Find the first location that has a JSON MIME type.
  const jsonLocation = subject.locations.find(l => l['application/json']) || {}
  const url = Object.values(jsonLocation)[0]
  if (url) {
    return url
  } else {
    throw new Error('No JSON url found for this subject')
  }
}

async function requestData(subject) {
  const url = getSubjectUrl(subject)
  const response = await fetch(url)
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }
  const body = await response.json()
  return body
}

export function BarChartViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject = defaultSubject
}) {
  const viewer = useRef()
  const [JSONdata, setJSONdata] = useState({})

  async function onSubjectChange() {
    if (subject) {
      await handleSubject()
    }
  }

  useEffect(() => onSubjectChange(), [subject])

  async function handleSubject() {
    try {
      const rawData = await requestData(subject)
      if (rawData) onLoad(rawData)
    } catch (error) {
      onError(error)
    }
  }

  function onLoad(data) {
    const target = viewer.current
    setJSONdata(data)
    onReady(target)
  }

  const {
    data,
    chartOptions
  } = JSONdata

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
