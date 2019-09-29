import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import { array, number, shape, string } from 'prop-types'
import React, { Component } from 'react'

import DailyClassificationsChart from './DailyClassificationsChart'

function storeMapper (stores) {
  const { project, yourStats: { counts, thisWeek } } = stores.store
  return {
    counts,
    thisWeek,
    projectName: project['display_name']
  }
}

@inject(storeMapper)
@observer
class DailyClassificationsChartContainer extends Component {
  render () {
    const TODAY = new Date()
    const { counts, projectName, thisWeek } = this.props
    const stats = thisWeek.map(stat => {
      const day = new Date(stat.period)
      const locale = counterpart.getLocale()
      const count = (day.getDay() === TODAY.getDay()) ? counts.today : stat.count
      const longLabel = day.toLocaleDateString(locale, { weekday: 'long' })
      const alt = `${longLabel}: ${count}`
      const label = day.toLocaleDateString(locale, { weekday: 'narrow' })
      return Object.assign({}, stat, { alt, count, label, longLabel })
    })
    return (
      <DailyClassificationsChart
        stats={stats}
        projectName={projectName}
      />
    )
  }
}

DailyClassificationsChartContainer.propTypes = {
  counts: shape({
    today: number
  }),
  projectName: string.isRequired,
  thisWeek: array
}

DailyClassificationsChartContainer.defaultProps = {
  counts: {
    today: 0
  },
  thisWeek: []
}

export default DailyClassificationsChartContainer
