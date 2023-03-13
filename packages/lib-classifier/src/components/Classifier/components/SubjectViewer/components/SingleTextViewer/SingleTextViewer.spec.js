import { expect } from 'chai'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import { composeStory } from '@storybook/testing-react'

import Meta, { Default } from './SingleTextViewer.stories'

describe('SingleTextViewerConnector', function () {
  const DefaultStory = composeStory(Default, Meta)
  
  describe('with a subject and success requesting text data', function () {
    it('should render the subject text', function () {
      render(
        <DefaultStory
          loadingState={asyncStates.success}
        />)
      expect(screen.getByLabelText('Subject 1234 text')).to.be.ok()
    })
  })

  describe('with an error requesting text data', function () {
    it('should render an error message', function () {
      render(
        <DefaultStory
          loadingState={asyncStates.error}
        />)
      expect(screen.getByText('Something went wrong.')).to.be.ok()
    })
  })
})
