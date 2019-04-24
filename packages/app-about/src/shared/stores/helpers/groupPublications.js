function groupPublications (ungroupedPublications) {
  return ungroupedPublications.reduce((acc, pub) => {
    const matchCategory = obj => obj.name === pub.category.name
    const matchProject = obj => obj.name === pub.project.name

    let categoryIndex = acc.findIndex(matchCategory)

    if (categoryIndex === -1) {
      acc.push({
        name: pub.category.name,
        projects: [],
        weight: pub.category.weight
      })
      categoryIndex = acc.length - 1
    }

    let projectIndex = acc[categoryIndex].projects.findIndex(matchProject)

    if (projectIndex === -1) {
      acc[categoryIndex].projects.push({
        name: pub.project.name || '',
        publications: [],
        slug: pub.project.slug || ''
      })
      projectIndex = acc[categoryIndex].projects.length - 1
    }

    acc[categoryIndex].projects[projectIndex].publications.push({
      citation: pub.citation,
      date: pub.date,
      url: pub.url
    })

    return acc
  }, [])
}

export default groupPublications
