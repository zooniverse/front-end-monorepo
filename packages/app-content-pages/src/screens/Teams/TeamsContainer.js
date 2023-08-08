import { array } from 'prop-types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import Teams from './Teams'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

function TeamContainer ({ teamData = [] }) {
  const { t } = useTranslation('components')

  teamData?.forEach(team => {
    team.slug = team.name.toLowerCase().replaceAll(' ', '-')
  })
  const [activeFilter, setActiveFilter] = useState(null)

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveFilter(slug)
  }, [])

  const filters = createFilters(teamData, activeFilter, setActiveFilter, t)
  const filteredTeamData = createFilteredTeamData(teamData, activeFilter)

  return (
    <Teams filters={filters} data={filteredTeamData} />
  )
}

TeamContainer.propTypes = {
  teamData: array
}

export default TeamContainer


/** Helpler Function */

function createFilters (teamData, activeFilter, setActiveFilter, t) {
  const showAllFilter = {
    active: !activeFilter,
    name: t('Team.showAll'),
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

// Show the filtered team if a filter is active;
// show everything but the alumni if there's no active filter.
function createFilteredTeamData (teamData, activeFilter) {
  const filterFn = activeFilter
    ? team => team.slug === activeFilter
    : team => team.name !== 'Alumni'
  return teamData.filter(filterFn)
}
