import counterpart from 'counterpart'
import absoluteUrl from 'next-absolute-url'
import { array, string } from 'prop-types'
import React, { useState } from 'react'
import request from 'superagent'

import en from './locales/en'
import Publications from './Publications'

counterpart.registerTranslations('en', en)

function PublicationsContainer(props) {
  const { error, publicationsData } = props
  const [activeFilter, setActiveFilter] = useState(null)

  const filters = createFilters(publicationsData, activeFilter, setActiveFilter)
  const filteredPublicationsData = createFilteredPublicationsData(publicationsData, activeFilter)

  if (error) {
    return (
      <div>{counterpart('Publications.error')}</div>
    )
  }

  return (
    <Publications filters={filters} data={filteredPublicationsData} />
  )
}

PublicationsContainer.getInitialProps = async ({ req }) => {
  const host = getHost(req)
  let error
  let publicationsData = []
  try {
    publicationsData = (await request.get(host + '/api/publications')).body
  } catch (err) {
    error = err.message
  }
  return {
    error,
    publicationsData
  }
}

PublicationsContainer.propTypes = {
  error: string,
  publicationsData: array,
}

PublicationsContainer.defaultProps = {
  publicationsData: []
}

export default PublicationsContainer

function getHost(req) {
  return process.env.ASSET_PREFIX || absoluteUrl(req).origin
}

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
