import counterpart from 'counterpart'
import { array, string } from 'prop-types'
import React, { useState } from 'react'

import en from './locales/en'
import Team from './Team'

counterpart.registerTranslations('en', en)

function TeamContainer (props) {
  const { error, teamData } = props
  const [activeFilter, setActiveFilter] = useState(null)

  const filters = createFilters(teamData, activeFilter, setActiveFilter)
  const filteredTeamData = createFilteredTeamData(teamData, activeFilter)

  if (error) {
    return (
      <div>{counterpart('Team.error')}</div>
    )
  }

  return (
    <Team filters={filters} data={filteredTeamData} />
  )
}

TeamContainer.propTypes = {
  error: string,
  teamData: array,
}

TeamContainer.defaultProps = {
  teamData: []
}

export default TeamContainer

function createFilters (teamData, activeFilter, setActiveFilter) {
  const showAllFilter = {
    active: activeFilter === null,
    name: counterpart('Team.showAll'),
    setActive: () => setActiveFilter(null)
  }

  const teamFilters = teamData.map(team => ({
    active: activeFilter === team.name,
    name: team.name,
    setActive: () => setActiveFilter(team.name)
  }))

  return [showAllFilter, ...teamFilters]
}

// Show the filtered team if a filter is active; show everything but the alumni
// if there's no active filter.
function createFilteredTeamData (teamData, activeFilter) {
  const filterFn = activeFilter
    ? team => team.name === activeFilter
    : team => team.name !== 'Alumni'
  return teamData.filter(filterFn)
}
