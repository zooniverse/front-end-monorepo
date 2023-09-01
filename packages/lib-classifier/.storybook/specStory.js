import { composeStory } from '@storybook/react'
import preview from './preview.js'

export const SpecStory = (StoryComponent) => {
  return composeStory(StoryComponent, preview)
}

export default SpecStory
