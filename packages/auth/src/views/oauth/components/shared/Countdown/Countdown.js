import { Box, Clock } from 'grommet'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import React from 'react'

function storeMapper (stores) {
  return {
    expiresAt: stores.store.credentials.expiresAt
  }
}

@inject(storeMapper)
@observer
class Countdown extends React.Component {
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
      <Box direction='row' justify='center' margin={{ vertical: 'small' }}>
        <Clock type='digital' run={false} time={time} size='large' />
      </Box>
    )
  }
}

Countdown.propTypes = {
  expiresAt: PropTypes.number
}

Countdown.defaultProps = {
  expiresAt: Date.now()
}

export default Countdown
