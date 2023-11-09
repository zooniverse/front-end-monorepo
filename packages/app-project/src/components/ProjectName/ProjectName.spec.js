import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { ProjectName } from './ProjectName.stories.js'
import { ProjectNameMock } from './ProjectName.mock'

describe('Component > ProjectName', function () {
  before(function () {
    const ProjectNameStory = composeStory(ProjectName, Meta)
    render(<ProjectNameStory />)
  })

  it('should render the project name', function () {
    expect(screen.getByText(ProjectNameMock.projectName)).to.exist()
  })
})
