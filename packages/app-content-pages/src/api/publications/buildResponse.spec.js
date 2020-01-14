import buildResponse from './buildResponse'
import publications from './mocks/contentfulResponse.mock'
import projectAvatarsMap from './mocks/projectAvatarsMap.mock'

describe('API > Publications > buildResponse', function () {
  it('should exist', function () {
    expect(buildResponse).to.be.a('function')
  })

  it('should construct a response object from the list of publications and avatars', function () {
    const response = buildResponse(publications, projectAvatarsMap)
    expect(response).to.be.an('array')
  })
  
  it('should sort the response by category weight', function () {
    const response = buildResponse(publications, projectAvatarsMap)

    response.forEach((category, index) => {
      if (index === response.length - 1) {
        expect(category.weight).to.be.above(response[index - 1].weight)
      } else {
        expect(category.weight).to.be.below(response[index + 1].weight)
      }
    })
  })

  it('should sort each category\'s projects alphabetically', function () {
    const response = buildResponse(publications, projectAvatarsMap)

    response.forEach((category) => {
      const { projects } = category
      projects.forEach((project, index) => {
        const projectATitle = project.title.toLowerCase()
        const projectBTitle = (projects[index + 1]) ? projects[index + 1].title.toLowerCase() : ''
        const comparison = projectATitle.localeCompare(projectBTitle, { ignorePunctuation: true })

        if (projectBTitle) {
          expect(comparison).to.be.below(0)
        } else {
          expect(comparison).to.be.above(0)
        }
      })
    })
  })
})
