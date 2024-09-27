import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './ProtoViewer.stories.js'

describe('Component > ProtoViewer', () => {
  const DefaultStory = composeStory(Default, Meta)

  before(() => {
    render(
      <DefaultStory />
    )
  })

  it('should load without errors', () => {
    expect(document.querySelector('h2')).to.be.ok()
  })
})
