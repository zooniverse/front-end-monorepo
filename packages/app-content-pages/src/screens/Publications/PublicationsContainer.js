import counterpart from 'counterpart'
import { array, string } from 'prop-types'
import { useState } from 'react'

import en from './locales/en'
import Publications from './Publications'

counterpart.registerTranslations('en', en)

function PublicationsContainer(props) {
  const { publicationsData } = props
  const [activeFilter, setActiveFilter] = useState(null)

  const filters = createFilters(publicationsData, activeFilter, setActiveFilter)
  const filteredPublicationsData = createFilteredPublicationsData(publicationsData, activeFilter)

  return (
    <Publications filters={filters} data={filteredPublicationsData} />
  )
}

PublicationsContainer.propTypes = {
  publicationsData: array
}

PublicationsContainer.defaultProps = {
  publicationsData: []
}

export default PublicationsContainer

function createFilters(publicationsData, activeFilter, setActiveFilter) {
  const showAllFilter = {
    active: activeFilter === null,
    name: counterpart('Publications.showAll'),
    setActive: () => setActiveFilter(null)
  }

  const categoryFilters = publicationsData.map(category => ({
    active: activeFilter === category.title,
    name: category.title,
    setActive: () => setActiveFilter(category.title)
  }))

  return [showAllFilter, ...categoryFilters]
}

// Show the filtered category if a filter is active; show everything if there's
// no active filter.
function createFilteredPublicationsData(publicationsData, activeFilter) {
  return activeFilter
    ? publicationsData.filter(category => category.title === activeFilter)
    : publicationsData
}
