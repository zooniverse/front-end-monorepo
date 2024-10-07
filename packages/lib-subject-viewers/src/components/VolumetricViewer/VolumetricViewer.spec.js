import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './VolumetricViewer.stories.js'

describe('Component > VolumetricViewer', function () {
  const VolumetricViewer = composeStory(Default, Meta)

  before(function () {
    render(
      <VolumetricViewer />
    )
  })

  it('should load without errors', function () {
    expect(document).to.be.ok()
  })
})
