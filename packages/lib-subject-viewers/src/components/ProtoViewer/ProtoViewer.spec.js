import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './ProtoViewer.stories.js'

describe('Component > AboutHeader', function () {
  const DefaultStory = composeStory(Default, Meta)

  before(function () {
    render(
      <DefaultStory />
    )
  })

  it('should load without errors', function () {
    expect(document.querySelector('h2')).to.be.ok()
  })
})
