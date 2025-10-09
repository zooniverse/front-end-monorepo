import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, NoMetadata } from './SubjectMetadata.stories'

const DefaultStory = composeStory(Default, Meta)
const NoMetadataStory = composeStory(NoMetadata, Meta)

describe('Component > SubjectTalkPage > SubjectMetadata', function () {
  it('should show the metadata header', function () {
    render(<DefaultStory />)
    const header = screen.getByRole('heading', { name: 'Talk.Metadata.subjectMetadata' })
    expect(header).toBeDefined()
  })

  it('should show metadata entries when the section is expanded', async function () {
    render(<DefaultStory />)
    const header = screen.getByRole('heading', { name: 'Talk.Metadata.subjectMetadata' })

    const user = userEvent.setup()
    await user.click(header)

    const entry = screen.getByText('150.32715203')
    expect(entry).toBeDefined()
  })

  it('should show "no metadata" message when there is no metadata', async function () {
    render(<NoMetadataStory />)
    const header = screen.getByRole('heading', { name: 'Talk.Metadata.subjectMetadata' })

    const user = userEvent.setup()
    await user.click(header)

    const message = screen.getByText('Talk.Metadata.noMetadata')
    expect(message).toBeDefined()
  })

  it('should not show hidden metadata entries', async function () {
    render(<DefaultStory />)
    const header = screen.getByRole('heading', { name: 'Talk.Metadata.subjectMetadata' })

    const user = userEvent.setup()
    await user.click(header)

    const hiddenEntry = screen.queryByText('should_not_be_displayed')
    expect(hiddenEntry).toBeNull()
  })

  it('should show metadata values hidden for the Classifier, shown for Talk', async function () {
    render(<DefaultStory />)
    const header = screen.getByRole('heading', { name: 'Talk.Metadata.subjectMetadata' })

    const user = userEvent.setup()
    await user.click(header)

    const specialValue = screen.getByText('should_not_be_displayed in Classifier, should be displayed in Talk')
    expect(specialValue).toBeDefined()
  })

  it('should show a entry value with http as a link', async function () {
    render(<DefaultStory />)
    const header = screen.getByRole('heading', { name: 'Talk.Metadata.subjectMetadata' })

    const user = userEvent.setup()
    await user.click(header)

    const link = screen.getByRole('link', { name: 'https://desi.lbl.gov' })
    expect(link).toBeDefined()
  })
})
