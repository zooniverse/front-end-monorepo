import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { Grommet } from 'grommet'
import { zooTheme } from '@zooniverse/grommet-theme'
import Meta, { ThemeModeToggle } from './ThemeModeToggle.stories.js'

describe('Component > ThemeModeToggle', function () {
  beforeEach(function () {
    const ThemeModeToggleStory = composeStory(ThemeModeToggle, Meta)
    render(
      <Grommet theme={zooTheme}>
        <ThemeModeToggleStory />
      </Grommet>
    )
  })

  it('should render the switch text', function () {
    expect(screen.getByText('ThemeModeToggle.switchToDark')).to.be.ok()
  })

  it('should have an accessible lable', function () {
    expect(screen.getByLabelText('ThemeModeToggle.switchToDark')).to.be.ok()
  })
})
