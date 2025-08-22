import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { AboutProject } from './AboutProject.stories'
import { AboutProjectMock } from './AboutProject.mock.js'

describe('Component > AboutProject', function () {
  beforeEach(function () {
    const AboutProjectStory = composeStory(AboutProject, Meta)
    render(<AboutProjectStory />)
  })

  it('should show the project name by translation key', function () {
    expect(screen.getByText('Home.AboutProject.title')).to.exist()
  })

  it('should show the project description', function () {
    expect(screen.getByText(AboutProjectMock.project.introduction)).to.exist()
  })
})
