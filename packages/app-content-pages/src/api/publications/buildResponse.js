// This function inverts the Contentful link hierarchy


export default function buildResponse(publications, projectAvatarsMap) {
  const publicationsObject = publications.reduce((acc, publication) => {
    // Draft items are returned in the Contentful response, but have no
    // fields, so we skip them.
    if (!publication.fields) {
      return
    }

    const publicationData = {
      title: publication.fields.title,
      url: publication.fields.url,
    }

    if (publication.fields.authors) {
      publicationData.authors = publication.fields.authors
    }

    if (publication.fields.year) {
      publicationData.year = publication.fields.year
    }

    publication.fields.projects.forEach(project => {
      // Draft items are returned in the Contentful response, but have no
      // fields, so we skip them.
      if (!project.fields) {
        return
      }

      const projectCard = projectAvatarsMap[project.fields.projectId]

      const projectData = {
        title: project.fields.title,
      }

      if (project.fields.projectId) {
        projectData.projectId = project.fields.projectId
      }

      if (projectCard && projectCard['avatar_src']) {
        projectData.avatarSrc = projectCard['avatar_src']
      }

      project.fields.categories.forEach(category => {
        // Draft items are returned in the Contentful response, but have no
        // fields, so we skip them.
        if (!category.fields) {
          return
        }

        const categoryData = {
          title: category.fields.title,
          weight: category.fields.weight,
        }

        if (!acc[categoryData.title]) {
          acc[categoryData.title] = {
            ...categoryData,
            projects: {}
          }
        }

        if (!acc[categoryData.title].projects[projectData.title]) {
          acc[categoryData.title].projects[projectData.title] = {
            ...projectData,
            publications: []
          }
        }

        acc[categoryData.title].projects[projectData.title].publications.push(publicationData)
      })
    })


    return acc
  }, {})

  // We used objects to build the list in order to avoid lots of array searches;
  // here we convert any objects back to arrays for ease of display.
  const publicationsArray = Object.values(publicationsObject)
    .map(category => ({
      ...category,
      projects: Object.values(category.projects)
    }))

  // We sort the categories by ascending weight
  publicationsArray.sort((a, b) => a.weight > b.weight)

  // We sort projects alphabetically by title
  publicationsArray.forEach(category =>
    category.projects.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase()
    )
  )

  return publicationsArray
}
