import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as stories from './LocaleSwitcher.stories'

describe('Component > LocaleSwitcher', function () {
  const { Default } = stories
  let languageMenuItems

  before(async function () {
    const user = userEvent.setup({ delay: 'none' })
    render(<Default {...Default.args} />)
    const languageButton = screen.getByRole('button', { name: 'ProjectHeader.LocaleSwitcher.label'})
    await user.click(languageButton)
    const languageMenu = screen.getByRole('menu')
    const languageMenuItem = label => within(languageMenu).getByRole('menuitem', { name: label })
    languageMenuItems = ['English', 'Français', 'Español'].map(languageMenuItem)
  })

  it('should show available languages in a menu', async function () {
    expect(languageMenuItems).to.have.lengthOf(3)
  })

  it('should link to the project in different languages', function () {
    const { project } = Default.args
    const projectLocales = project.configuration.languages
    projectLocales.forEach((locale, index) => {
      const href = `https://localhost/projects/${locale}/zooniverse/snapshot-serengeti/about/research`
      expect(languageMenuItems[index].href).to.equal(href)
    })
  })
})
