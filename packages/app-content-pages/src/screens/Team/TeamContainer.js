import counterpart from 'counterpart'
import { array, string } from 'prop-types'
import { useEffect, useState } from 'react'

import en from './locales/en'
import Team from './Team'

counterpart.registerTranslations('en', en)

const isBrowser = typeof window !== 'undefined'

function TeamContainer ({ teamData }) {
  teamData.forEach(team => {
    team.slug = team.name.toLowerCase().replaceAll(' ', '-')
  })
  const [activeFilter, setActiveFilter] = useState(null)

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveFilter(slug)
  }, [])

  const filters = createFilters(teamData, activeFilter, setActiveFilter)
  const filteredTeamData = createFilteredTeamData(teamData, activeFilter)

  return (
    <Team filters={filters} data={filteredTeamData} />
  )
}

TeamContainer.propTypes = {
  teamData: array
}

TeamContainer.defaultProps = {
  teamData: []
}

export default TeamContainer

function createFilters (teamData, activeFilter, setActiveFilter) {
  const showAllFilter = {
    active: !activeFilter,
    name: counterpart('Team.showAll'),
    slug: '',
    setActive: event => setActiveFilter('')
  }

  const teamFilters = teamData.map(team => ({
    active: activeFilter === team.slug,
    name: team.name,
    slug: team.name.toLowerCase().replaceAll(' ', '-'),
    setActive: event => setActiveFilter(team.slug)
  }))

  return [showAllFilter, ...teamFilters]
}

// Show the filtered team if a filter is active; show everything but the alumni
// if there's no active filter.
function createFilteredTeamData (teamData, activeFilter) {
  const filterFn = activeFilter
    ? team => team.slug === activeFilter
    : team => team.name !== 'Alumni'
  return teamData.filter(filterFn)
}
