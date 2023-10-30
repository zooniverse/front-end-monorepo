import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import Publications from './Publications'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

function PublicationsContainer({ publicationsData = [] }) {
  const { t } = useTranslation('components')

  // put this in Publications.js
  const [activeSection, setActiveSection] = useState(null)

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveSection(slug)
  }, [])

  const sections = createsections(publicationsData, activeSection, setActiveSection, t)

  return (
    <Publications sections={sections} data={publicationsData} />
  )
}

export default PublicationsContainer


function createsections(publicationsData, activeSection, setActiveSection, t) {

  const categorySections = publicationsData.map(category => ({
    active: activeSection === category.slug,
    name: category.title,
    slug: category.title.toLowerCase().replaceAll(' ', '-'),
    setActive: event => setActiveSection(category.slug)
  }))

  return [
    ...categorySections]
}
