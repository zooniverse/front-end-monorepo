import { array } from 'prop-types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import Publications from './Publications'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

function PublicationsContainer({ publicationsData = [] }) {
  const { t } = useTranslation('components')
  publicationsData?.forEach(category => {
    category.slug = category.title.toLowerCase().replaceAll(' ', '-')
  })
  const [activeFilter, setActiveFilter] = useState(null)

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveFilter(slug)
  }, [])

  const filters = createFilters(publicationsData, activeFilter, setActiveFilter, t)
  const filteredPublicationsData = createFilteredPublicationsData(publicationsData, activeFilter)

  return (
    <Publications filters={filters} data={filteredPublicationsData} />
  )
}

PublicationsContainer.propTypes = {
  publicationsData: array
}

export default PublicationsContainer


/** Helper Functions */

function createFilters(publicationsData, activeFilter, setActiveFilter, t) {
  const showAllFilter = {
    active: !activeFilter,
    name: t('Publications.showAll'),
    slug: '',
    setActive: event => setActiveFilter('')
  }

  const categoryFilters = publicationsData.map(category => ({
    active: activeFilter === category.slug,
    name: category.title,
    slug: category.title.toLowerCase().replaceAll(' ', '-'),
    setActive: event => setActiveFilter(category.slug)
  }))

  return [showAllFilter, ...categoryFilters]
}

// Show the filtered category if a filter is active;
// show everything if there's no active filter.
function createFilteredPublicationsData(publicationsData, activeFilter) {
  return activeFilter
    ? publicationsData.filter(category => category.slug === activeFilter)
    : publicationsData
}
