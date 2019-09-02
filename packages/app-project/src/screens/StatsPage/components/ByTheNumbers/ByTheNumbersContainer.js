import { DateTime } from 'luxon'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ByTheNumbers from './ByTheNumbers'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    classifications: project['classifications_count'],
    completedSubjects: project['retired_subjects_count'],
    launchDate: project['launch_date'],
    volunteers: project['classifiers_count']
  }
}

@inject(storeMapper)
@observer
class ByTheNumbersContainer extends Component {
  getLaunchDate () {
    const { launchDate } = this.props

    // TODO: Use luxon's `.setLocale()` method for doing date translations. This
    // requires `full-icu` to be included, and I'm going to hold off on that
    // until https://github.com/nodejs/node/issues/19214 is merged so we have
    // access to Docker images including it; the docs call it a faff and we
    // don't have UI translations atm anyway.
    // See https://moment.github.io/luxon/docs/manual/formatting.html
    if (launchDate) {
      return DateTime.fromISO(launchDate)
        .toLocaleString(DateTime.DATE_FULL)
    } else {
      return null
    }
  }

  render () {
    const {
      classifications,
      completedSubjects,
      volunteers
    } = this.props

    const launchDate = this.getLaunchDate()

    return (
      <ByTheNumbers
        classifications={classifications}
        completedSubjects={completedSubjects}
        launchDate={launchDate}
        volunteers={volunteers}
      />
    )
  }
}

ByTheNumbersContainer.propTypes = {
  classifications: PropTypes.number,
  completedSubjects: PropTypes.number,
  launchDate: PropTypes.string,
  volunteers: PropTypes.number
}

ByTheNumbersContainer.defaultProps = {
  classifications: 0,
  completedSubjects: 0,
  launchDate: null,
  volunteers: 0
}

export default ByTheNumbersContainer
