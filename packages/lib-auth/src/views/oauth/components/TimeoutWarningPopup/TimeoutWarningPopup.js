import counterpart from 'counterpart'
import { Box, Clock } from 'grommet'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import React from 'react'

import en from './locales/en'
import WithPopup from '../shared/WithPopup'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  return {
    expiresAt: stores.store.credentials.expiresAt
  }
}

@inject(storeMapper)
@observer
class TimeoutWarningPopup extends React.Component {
  constructor () {
    super()
    this.setTime = this.setTime.bind(this)
    this.intervalId = -1
    this.state = {
      time: 'T99:99:99'
    }
  }

  componentDidMount () {
    this.setTime()
    this.intervalId = setInterval(this.setTime, 1000)
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  clearTimer () {
    clearInterval(this.intervalId)
  }

  setTime () {
    // TODO: fix this so if expiresAt is falsy, it doesn't break
    const timeLeft = DateTime.fromMillis(this.props.expiresAt).diffNow()

    if (timeLeft >= 0) {
      const [hours, minutes, seconds] = timeLeft.toFormat('hh mm ss').split(' ')
      const isoDuration = `PT${hours}H${minutes}M${seconds}S`
      return this.setState({ time: isoDuration })
    }

    this.clearTimer()
  }

  render () {
    const { time } = this.state
    return (
      <div>
        <div>
          {counterpart('TimeoutWarningPopup.message')}
        </div>
        <Box direction='row' justify='center'>
          <Clock type='digital' run={false} time={time} size='large' />
        </Box>
      </div>
    )
  }
}

TimeoutWarningPopup.propTypes = {
  expiresAt: PropTypes.number
}

TimeoutWarningPopup.defaultProps = {
  expiresAt: 0
}

export default TimeoutWarningPopup