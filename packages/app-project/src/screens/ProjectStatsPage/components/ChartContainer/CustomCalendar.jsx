import { Modal, MovableModal } from '@zooniverse/react-components'
import { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Button, Calendar, ResponsiveContext } from 'grommet'
import styled from 'styled-components'
import { bool, func, string } from 'prop-types'

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

function CustomCalendar({
  defaultStartDate,
  setEndDate,
  launchDate,
  setStartDate,
  setShowCalendar,
  showCalendar
}) {
  const { t } = useTranslation('screens')

  const today = new Date()
  const todayUTC = getStatsDateString(today)
  const size = useContext(ResponsiveContext)
  const CalendarModal = size === 'small' ? Modal : MovableModal

  const [calendarStart, setCalendarStart] = useState(defaultStartDate)
  const [calendarEnd, setCalendarEnd] = useState(todayUTC)

  function handleCalendarChange(date) {
    if (!date?.length) {
      return
    }
    setCalendarEnd(date[0][1])
    setCalendarStart(date[0][0])
  }

  function handleCalendarSave() {
    setEndDate(calendarEnd)
    setStartDate(calendarStart)
    setShowCalendar(false)
  }
  return (
    <CalendarModal
      active={showCalendar}
      closeFn={() => setShowCalendar(false)}
      pad='none'
      position='top'
      rndProps={{ cancel: '.element-that-ignores-drag-actions' }}
      title={t('ProjectStats.calendarTitle')}
    >
      <Box
        align='center'
        className='element-that-ignores-drag-actions'
        fill
        pad={{
          bottom: 'small',
          horizontal: size === 'small' ? 'none' : 'small',
          top: 'none'
        }}
      >
        <Box>
          <Calendar
            bounds={[getStatsDateString(launchDate), todayUTC]}
            dates={[calendarStart, calendarEnd]}
            onSelect={handleCalendarChange}
            range='array'
          />
          <Box
            direction='row'
            fill
            justify='end'
            margin={{ top: 'xsmall' }}
            // pad={{ horizontal: size === 'small' ? 'small' : 'none' }}
          >
            <StyledCalendarButton
              label={t('ProjectStats.calendarBtn')}
              onClick={handleCalendarSave}
            />
          </Box>
        </Box>
      </Box>
    </CalendarModal>
  )
}

export default CustomCalendar

CustomCalendar.propTypes = {
  defaultStartDate: string,
  setEndDate: func,
  launchDate: string,
  setStartDate: func,
  setShowCalendar: func,
  showCalendar: bool
}
