import { Modal, MovableModal } from '@zooniverse/react-components'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, ResponsiveContext } from 'grommet'
import { bool, func, string } from 'prop-types'

import getStatsDateString from '../../helpers/getStatsDateString'

function CustomDateRange({
  endDate,
  setEndDate,
  launchDate,
  setStartDate,
  setShowCalendar,
  showCalendar,
  startDate
}) {
  const { t } = useTranslation('screens')

  const today = new Date()
  const todayUTC = getStatsDateString(today)
  const size = useContext(ResponsiveContext)
  const CalendarModal = size === 'small' ? Modal : MovableModal

  function handleInputStartDate(event) {
    event.preventDefault()
    setStartDate(event.target.value)
  }

  function handleInputEndDate(event) {
    event.preventDefault()
    setEndDate(event.target.value)
  }

  /* We can't edit the timezone of these inputs. Native HTML date inputs are designed to operate strictly
  in the user's local timezone as defined by their browser or operating system settings. */
  return (
    <CalendarModal
      active={showCalendar}
      closeFn={() => setShowCalendar(false)}
      pad='medium'
      position='top'
      modal={false} // This just visually means there's no overlay of the page content behind it
      rndProps={{ cancel: '.element-that-ignores-drag-actions' }}
      title={t('ProjectStats.calendarTitle')}
    >
      <Box className='element-that-ignores-drag-actions' width={{ min: '300px' }} gap='medium'>
        <div>
          <label htmlFor='start-date-input'>{t('ProjectStats.startDate')}: </label>
          <input
            id='start-date-input'
            type='date'
            value={startDate}
            onChange={e => handleInputStartDate(e)}
            min={getStatsDateString(launchDate)}
            max={getStatsDateString(todayUTC)}
          />
        </div>

        <div>
          <label htmlFor='end-date-input'>{t('ProjectStats.endDate')}: </label>
          <input
            id='end-date-input'
            type='date'
            value={endDate}
            onChange={e => handleInputEndDate(e)}
            min={getStatsDateString(launchDate)}
            max={getStatsDateString(todayUTC)}
          />
        </div>
      </Box>
    </CalendarModal>
  )
}

export default CustomDateRange

CustomDateRange.propTypes = {
  endDate: string,
  setEndDate: func,
  launchDate: string,
  setStartDate: func,
  setShowCalendar: func,
  showCalendar: bool,
  startDate: string
}
