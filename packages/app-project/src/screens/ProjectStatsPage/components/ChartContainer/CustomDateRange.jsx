import { Modal, MovableModal } from '@zooniverse/react-components'
import { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Button, ResponsiveContext } from 'grommet'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import getStatsDateString from '../../helpers/getStatsDateString'

const StyledCalendarButton = styled(Button)`
  background-color: ${props =>
    props.theme.dark
      ? props.theme.global.colors['dark-3']
      : props.theme.global.colors['neutral-6']};
  border-radius: 4px;
  color: ${props =>
    props.theme.dark ? props.theme.global.colors['light-3'] : props.theme.global.colors['dark-5']};
  min-width: 100px;
  text-transform: uppercase;
`

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

  const [inputStartDate, setInputStartDate] = useState(startDate)
  const [inputEndDate, setInputEndDate] = useState(endDate)

  const today = new Date()
  const todayUTC = getStatsDateString(today)
  const size = useContext(ResponsiveContext)
  const CalendarModal = size === 'small' ? Modal : MovableModal

  function handleInputStartDate(event) {
    event.preventDefault()
    setInputStartDate(event.target.value)
  }

  function handleInputEndDate(event) {
    event.preventDefault()
    setInputEndDate(event.target.value)
  }

  function handleCalendarSave() {
    setEndDate(inputEndDate)
    setStartDate(inputStartDate)
    setShowCalendar(false)
  }

  /* We can't edit the timezone of these inputs. Native HTML date inputs are designed to operate strictly
  in the user's local timezone as defined by their browser or operating system settings. */
  return (
    <CalendarModal
      active={showCalendar}
      closeFn={() => setShowCalendar(false)}
      pad='medium'
      position='top'
      rndProps={{ cancel: '.element-that-ignores-drag-actions' }}
      title={t('ProjectStats.calendarTitle')}
    >
      <Box className='element-that-ignores-drag-actions' width={{ min: '300px' }} gap='medium'>
        <div>
          <label htmlFor='start-date-input'>{t('ProjectStats.startDate')}: </label>
          <input
            id='start-date-input'
            type='date'
            value={inputStartDate}
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
            value={inputEndDate}
            onChange={e => handleInputEndDate(e)}
            min={getStatsDateString(launchDate)}
            max={getStatsDateString(todayUTC)}
          />
        </div>
        <StyledCalendarButton label={t('ProjectStats.calendarBtn')} onClick={handleCalendarSave} />
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
