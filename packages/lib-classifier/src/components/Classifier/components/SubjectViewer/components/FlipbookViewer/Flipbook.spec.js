import React from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import * as stories from './FlipbookViewer.stories'
import { composeStories } from '@storybook/testing-react'

describe('Component > FlipbookViewer', function () {
  const { Default } = composeStories(stories)

  it('tests go here', function () {
  })
})
