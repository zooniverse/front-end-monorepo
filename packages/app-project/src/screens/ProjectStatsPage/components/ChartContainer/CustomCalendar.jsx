import { Modal, MovableModal } from '@zooniverse/react-components'
import { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Button, Calendar, ResponsiveContext, Select } from 'grommet'
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
  const { t, i18n } = useTranslation('screens')
  const locale = i18n.language === 'test' ? 'en' : i18n.language

  const size = useContext(ResponsiveContext)
  const CalendarModal = size === 'small' ? Modal : MovableModal

  const today = new Date()
  const todayUTC = getStatsDateString(today)

  /* Calendar Selected Dates States */
  const [calendarStart, setCalendarStart] = useState(defaultStartDate)
  const [calendarEnd, setCalendarEnd] = useState(todayUTC)

  function handleCalendarChange(date) {
    if (!date?.length) {
      return
    }
    setCalendarEnd(getStatsDateString(date[0][1]))
    setCalendarStart(getStatsDateString(date[0][0]))
  }

  function handleCalendarSave() {
    setEndDate(calendarEnd)
    setStartDate(calendarStart)
    setShowCalendar(false)
  }

  /* Calendar Month or Year External Dropdowns */
  const [reference, setReference] = useState(todayUTC) // reference is in ISO8601 format for Grommet Calendar
  console.log(reference)

  // Create an array of years in the specified range
  const launch = new Date(launchDate)
  const launchYear = +launch.toLocaleString(locale, { year: 'numeric' })
  const thisYear = +today.toLocaleString(locale, { year: 'numeric' })

  const years = Array.from({ length: thisYear - launchYear + 1 }, (_, index) => launchYear + index)

  // Create an array of months based on locale
  const months = Array.from({ length: 12 }, (_, i) => i)
  const monthsFormatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const localizedMonths = months.map(month => {
    return {
      value: month,
      label: monthsFormatter.format(new Date(thisYear, month, 1))
    }
  })

  // Determine what labels are selected in the dropdowns
  const dropdownYear = +reference.slice(0, 4)
  const dropdownMonth = localizedMonths.find(
    month => month.value === new Date(reference).getMonth()
  )

  function handleOnReference(date) {
    setReference(date)
  }

  function handleMonthSelect(option) {
    // use the last day of each month (keeping with Grommet norms for onReference)
    const newReference = new Date(dropdownYear, option.value + 1, 0).toISOString()
    setReference(newReference)
  }

  function handleYearSelect(option) {
    // use the last day of each month (keeping with Grommet norms for onReference)
    const newReference = new Date(option, dropdownMonth?.value + 1, 0).toISOString()
    setReference(newReference)
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
        <Select
          name='stats-month-select'
          // aria-label={t('ProjectStats.selectDateRange')}
          labelKey='label'
          onChange={({ option }) => handleMonthSelect(option)}
          options={localizedMonths}
          value={dropdownMonth?.label}
          size='medium'
          valueKey={{ key: 'label', reduce: true }}
        />
        <Select
          name='stats-year-select'
          // aria-label={t('ProjectStats.selectDateRange')}
          onChange={({ option }) => handleYearSelect(option)}
          options={years}
          value={dropdownYear}
          size='medium'
        />
        <Box>
          <Calendar
            activeDate={reference}
            animate={false}
            bounds={[getStatsDateString(launchDate), todayUTC]}
            // dates={[calendarStart, calendarEnd]}
            // range='array'
            reference={reference}
            onSelect={handleCalendarChange}
            onReference={date => handleOnReference(date)}
            showAdjacentDays={false}
          />
          <Box direction='row' fill justify='end' margin={{ top: 'xsmall' }}>
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
